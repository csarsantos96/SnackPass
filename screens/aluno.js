import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const AlunoScreen = () => {
  const navigation = useNavigation();
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
    console.log("Nome Completo:", fullName);
    console.log("Data de Nascimento:", birthDate);
    console.log("Telefone:", phone);
    console.log("Email:", email);
    console.log("CPF:", cpf);
    console.log("Matrícula:", matricula);
    console.log("Nível de Ensino Selecionado:", selectedLevel);
    
    // Navegar para a tela inicial
    navigation.navigate('TelaInicial');
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.title}>Formulário do Aluno</Text>
      <TextInput style={styles.input} placeholder="Nome Completo" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Data de Nascimento (DD/MM/AAAA)" value={birthDate} onChangeText={setBirthDate} />
      <TextInput style={styles.input} placeholder="Telefone" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} />
      <TextInput style={styles.input} placeholder="Matrícula" value={matricula} onChangeText={setMatricula} />

      <Text style={styles.checkboxLabel}>Nível de Ensino:</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox title='Ensino Infantil' checked={selectedLevel === 'infantil'} onPress={() => handleCheckboxChange('infantil')} />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox title='Ensino Fundamental I' checked={selectedLevel === 'fundamentalI'} onPress={() => handleCheckboxChange('fundamentalI')} />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox title='Ensino Fundamental II' checked={selectedLevel === 'fundamentalII'} onPress={() => handleCheckboxChange('fundamentalII')} />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox title='Ensino Médio' checked={selectedLevel === 'medio'} onPress={() => handleCheckboxChange('medio')} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFF8F1',
    flexGrow: 1,
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
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13.86,
    paddingHorizontal: 17.33,
    width: '80%',
    height: 50,
    backgroundColor: '#000066',
    borderRadius: 13.86,
    marginBottom: 20,
    alignSelf: 'center', // Centraliza o botão
  },
  buttonText: {
    fontFamily: 'Sora',
    fontWeight: '600',
    fontSize: 15,
    color: '#FFFFFF',
  },
});

export default AlunoScreen;
