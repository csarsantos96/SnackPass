import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { API_URL } from './config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para navegar diretamente à tela inicial sem autenticação
  const handleAccessWithoutLogin = () => {
    navigation.navigate('TelaInicial', { nome: 'Cesar Santos', userType: 'aluno' });
  };

  // Função original de autenticação do login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://54.221.122.186:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      const data = await response.json();
      console.log('Resposta da API:', data); // Mostra a resposta no console

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao realizar login');
      }

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('TelaInicial', { nome: data.nome, userType: data.tipo });

    } catch (error) {
      console.error('Erro ao realizar login:', error);
      Alert.alert('Erro', error.message);
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
        />
        <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Botão para entrar sem autenticação */}
        <TouchableOpacity onPress={handleAccessWithoutLogin} style={styles.visitorButton}>
          <Text style={styles.visitorButtonText}>Entrar como visitante</Text>
        </TouchableOpacity>

        {/*
                Para acesso sem autenticação, você pode comentar ou remover
                a chamada da função handleLogin acima, permitindo que
                a função handleAccessWithoutLogin seja usada para entrar diretamente.
            */}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9',
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
  button: {
    backgroundColor: '#000066',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  visitorButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  visitorButtonText: {
    color: '#000066',
  },
});

export default LoginScreen;
