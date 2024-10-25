import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

const CadastroScreen = () => {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [matricula, setMatricula] = useState('');
    const [password, setPassword] = useState(''); // Estado para a senha
    const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar a senha
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [isStudent, setIsStudent] = useState(true); // Estado para alternar entre Aluno e Funcionário
    const [loading, setLoading] = useState(false); // Estado para o carregamento

    const handleCheckboxChange = (value, type) => {
        if (type === 'student') {
            setSelectedLevel(value);
        } else {
            setSelectedService(value);
        }
    };

    // Validar CPF
    const isValidCpf = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove qualquer coisa que não seja dígito
        if (cpf.length !== 11) return false;

        let sum = 0, remainder;
        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    };

    const criarConta = async () => {
        console.log('Enviando dados para a API:', {
            email: email,
            senha: password,
            tipo: isStudent ? 'aluno' : 'funcionario',
            nome: fullName,
            data_nascimento: birthDate,
            telefone: phone,
            cpf: cpf,
            matricula: isStudent ? matricula : undefined
        });
        try {
            const response = await fetch('http://192.168.1.5:5000/criar-conta', { // Substitua pelo seu IP
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: password,
                    tipo: isStudent ? 'aluno' : 'funcionario',
                    nome: fullName,
                    data_nascimento: birthDate,
                    telefone: phone,
                    cpf: cpf,
                    matricula: isStudent ? matricula : undefined
                }),
            });

            const data = await response.json();
            console.log('Resposta da API:', data); // Log da resposta da API
            if (response.ok) {
                Alert.alert('Sucesso', 'Conta criada com sucesso!');
                navigation.navigate('TelaInicial');
            } else {
                Alert.alert('Erro', data.message);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            Alert.alert('Erro', 'Erro na requisição.');
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        if (!fullName || !phone) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não conferem. Por favor, verifique.');
            return;
        }

        // Validação de CPF
        if (!isValidCpf(cpf)) {
            Alert.alert('Erro', 'CPF inválido. Por favor, insira um CPF válido.');
            return;
        }

        // Validação de email
        if (!isValidEmail(email)) {
            Alert.alert('Erro', 'Email inválido. Por favor, insira um email válido.');
            return;
        }

        setLoading(true); // Inicia o carregamento

        try {
            await criarConta(); // Chama a função para criar a conta
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    const [fontsLoaded] = useFonts({
        'Sora': require('../assets/fonts/Sora-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView contentContainerStyle={styles.screenContainer}>
            <Text style={styles.title}>Formulário de Cadastro</Text>

            {/* Escolha entre Aluno ou Funcionário */}
            <View style={styles.switchContainer}>
                <TouchableOpacity onPress={() => setIsStudent(true)} style={[styles.switchButton, isStudent && styles.activeButton]}>
                    <Text style={[styles.switchText, isStudent && styles.activeText]}>Aluno</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsStudent(false)} style={[styles.switchButton, !isStudent && styles.activeButton]}>
                    <Text style={[styles.switchText, !isStudent && styles.activeText]}>Funcionário</Text>
                </TouchableOpacity>
            </View>

            {/* Campos comuns */}
            <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInputMask
                type={'datetime'}
                options={{
                    format: 'DD/MM/YYYY'
                }}
                style={styles.input}
                placeholder="Data de Nascimento (DD/MM/AAAA)"
                value={birthDate}
                onChangeText={setBirthDate}
                keyboardType="numeric"
            />
            <TextInputMask
                type={'cel-phone'}
                options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                }}
                style={styles.input}
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInputMask
                type={'cpf'}
                style={styles.input}
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
            />

            {/* Exibir campo de matrícula apenas para alunos */}
            {isStudent && (
                <TextInputMask
                    type={'custom'}
                    options={{
                        mask: '9999999'
                    }}
                    style={styles.input}
                    placeholder="Matrícula"
                    value={matricula}
                    onChangeText={setMatricula}
                />
            )}

            {/* Campos de senha e confirmação */}
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true} // Esconde a senha
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true} // Esconde a senha
            />

            {/* Exibir campos específicos com base na escolha */}
            {isStudent ? (
                <>
                    <Text style={styles.checkboxLabel}>Nível de Ensino:</Text>
                    <View style={styles.checkboxContainer}>
                        <CheckBox title='Ensino Infantil' checked={selectedLevel === 'infantil'} onPress={() => handleCheckboxChange('infantil', 'student')} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox title='Ensino Fundamental I' checked={selectedLevel === 'fundamentalI'} onPress={() => handleCheckboxChange('fundamentalI', 'student')} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox title='Ensino Fundamental II' checked={selectedLevel === 'fundamentalII'} onPress={() => handleCheckboxChange('fundamentalII', 'student')} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox title='Ensino Médio' checked={selectedLevel === 'medio'} onPress={() => handleCheckboxChange('medio', 'student')} />
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.checkboxLabel}>Serviço:</Text>
                    <View style={styles.checkboxContainer}>
                        <CheckBox title='Direção e Coordenação Pedagógica' checked={selectedService === 'coordenacao'} onPress={() => handleCheckboxChange('coordenacao', 'employee')} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox title='Administrativo' checked={selectedService === 'recepcao'} onPress={() => handleCheckboxChange('recepcao', 'employee')} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox title='Serviços Gerais' checked={selectedService === 'servicosGerais'} onPress={() => handleCheckboxChange('servicosGerais', 'employee')} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox title='Professor' checked={selectedService === 'professor'} onPress={() => handleCheckboxChange('professor', 'employee')} />
                    </View>
                </>
            )}

            {/* Botão de enviar */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Enviando...' : 'Enviar'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    switchButton: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    activeButton: {
        borderBottomColor: '#000066',
    },
    switchText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    activeText: {
        color: '#000066',
    },
    checkboxLabel: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#000066',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },

});

export default CadastroScreen;