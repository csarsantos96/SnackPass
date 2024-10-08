import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

// Função de validação de CPF
const isValidCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false; // Verifica se o CPF tem 11 dígitos ou se é uma sequência de números iguais
    }

    let soma = 0;
    let resto;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    // Validação do segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
};

const FuncionarioScreen = () => {
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [matricula, setMatricula] = useState('');

    const [selectedService, setSelectedService] = useState(null);

    const handleCheckboxChange = (service) => {
        setSelectedService(service);
    };

    const handleSubmit = () => {
        // Validação do CPF antes de processar o envio
        if (!isValidCPF(cpf)) {
            alert('CPF inválido. Por favor, verifique os dados.');
            return;
        }

        console.log("Nome Completo:", fullName);
        console.log("Data de Nascimento:", birthDate);
        console.log("Telefone:", phone);
        console.log("Email:", email);
        console.log("CPF:", cpf);
        console.log("Matrícula:", matricula);
        console.log("Serviço Selecionado:", selectedService);
    };

    return (
        <ScrollView contentContainerStyle={styles.screenContainer}>
            <Text style={styles.title}>Formulário do Funcionário</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Data de Nascimento (DD/MM/AAAA)"
                value={birthDate}
                onChangeText={setBirthDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
            />
            <TextInput
                style={styles.input}
                placeholder="Matrícula"
                value={matricula}
                onChangeText={setMatricula}
            />

            <Text style={styles.checkboxLabel}>Serviço:</Text>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    title='Serviços Gerais'
                    checked={selectedService === 'servicosGerais'}
                    onPress={() => handleCheckboxChange('servicosGerais')}
                />
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    title='Auxiliar Administrativo'
                    checked={selectedService === 'auxiliarAdministrativo'}
                    onPress={() => handleCheckboxChange('auxiliarAdministrativo')}
                />
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    title='Coordenação Pedagógica'
                    checked={selectedService === 'coordenacaoPedagogica'}
                    onPress={() => handleCheckboxChange('coordenacaoPedagogica')}
                />
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    title='Diretoria Pedagógica'
                    checked={selectedService === 'diretoriaPedagogica'}
                    onPress={() => handleCheckboxChange('diretoriaPedagogica')}
                />
            </View>

            <Button title="Enviar" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        marginVertical: 10,
        fontWeight: 'bold',
    },
});

export default FuncionarioScreen;
