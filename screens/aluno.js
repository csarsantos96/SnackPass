import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

// Função de validação de CPF
const isValidCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
};

const handleSubmit = () => {
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
    console.log("Nível de Ensino Selecionado:", selectedLevel);
};


const AlunoScreen = () => {
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [matricula, setMatricula] = useState('');

    const [selectedLevel, setSelectedLevel] = useState(null);

    const handleCheckboxChange = (level) => {
        setSelectedLevel(level);
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
        console.log("Nível de Ensino Selecionado:", selectedLevel);
    };

    return (
        <ScrollView contentContainerStyle={styles.screenContainer}>
            <Text style={styles.title}>Formulário do Aluno</Text>
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

            <Text style={styles.checkboxLabel}>Nível de Ensino:</Text>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    title='Ensino Infantil'
                    checked={selectedLevel === 'infantil'}
                    onPress={() => handleCheckboxChange('infantil')}
                />
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    title='Ensino Fundamental I'
                    checked={selectedLevel === 'fundamentalI'}
                    onPress={() => handleCheckboxChange('fundamentalI')}
                />
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    title='Ensino Fundamental II'
                    checked={selectedLevel === 'fundamentalII'}
                    onPress={() => handleCheckboxChange('fundamentalII')}
                />
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    title='Ensino Médio'
                    checked={selectedLevel === 'medio'}
                    onPress={() => handleCheckboxChange('medio')}
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

export default AlunoScreen;
