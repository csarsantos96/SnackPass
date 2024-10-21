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

    // Validar o formato do email
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        // Validação de senha
        if (password !== confirmPassword) {
            Alert.alert('Error', 'As senhas não conferem. Por favor, verifique.');
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

        console.log("Nome Completo:", fullName);
        console.log("Data de Nascimento:", birthDate);
        console.log("Telefone:", phone);
        console.log("Email:", email);
        console.log("CPF:", cpf);

        if (isStudent) {
            console.log("Matrícula:", matricula);
            console.log("Nível de Ensino Selecionado:", selectedLevel);
        } else {
            console.log("Serviço Selecionado:", selectedService);
        }

        navigation.navigate('TelaInicial');
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
                        <CheckBox title='Serviços Gerais' checked={selectedService === 'servicosGerais'} onPress={() => handleCheckboxChange('servicosGerais', 'service')} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox title='Auxiliar Administrativo' checked={selectedService === 'auxiliarAdministrativo'} onPress={() => handleCheckboxChange('auxiliarAdministrativo', 'service')} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox title='Coordenação Pedagógica' checked={selectedService === 'coordenacaoPedagogica'} onPress={() => handleCheckboxChange('coordenacaoPedagogica', 'service')} />
                    </View>
                </>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Enviar</Text>
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
        borderBottomColor: '#000',
    },
    switchText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    activeText: {
        color: '#000',
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
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default CadastroScreen;
