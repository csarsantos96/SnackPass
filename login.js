import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const Login = ({ navigation }) => {
  const [isSelected, setSelection] = useState(false); 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      
      <View style={styles.rememberMeContainer}>
        <CheckBox
          title="Lembrar-me"
          checked={isSelected}
          onPress={() => setSelection(!isSelected)}
          containerStyle={styles.checkboxContainer} 
          textStyle={styles.checkboxText} 
        />
        <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenha')}>
          <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaInicial')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF8F1',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxContainer: {
    backgroundColor: 'transparent', 
    borderWidth: 0, 
    alignSelf: 'flex-start', 
  },
  checkboxText: {
    color: '#000000', 
    fontWeight: 'bold',
    color:'#000066' , 
  },
  forgotPasswordText: {
    color: '#000066',
    textDecorationLine: 'underline',
    marginRight: 20,
  },
  button: {
    backgroundColor: '#000066',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default Login;
