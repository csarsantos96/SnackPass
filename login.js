import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import { API_URL } from './config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Verifica o estado de login na inicialização
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        navigation.navigate('TelaInicial'); // Redireciona para a tela inicial se o usuário já estiver logado
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
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
      console.log('Resposta da API:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao realizar login');
      }

      Alert.alert('Sucesso', 'Login realizado com sucesso!');

      // Salva o estado de login se "Lembrar-me" estiver marcado
      if (rememberMe) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
      }
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

        {/* Lembrar-me e Esqueceu a senha */}
        <View style={styles.rememberForgotContainer}>
          <CheckBox
              title="Lembrar-me"
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              containerStyle={styles.checkbox}
          />
          <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenha')}>
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
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
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  forgotPassword: {
    color: '#000066',
    textDecorationLine: 'underline',
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
});

export default LoginScreen;
