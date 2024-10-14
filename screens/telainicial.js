import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TelaInicial = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    
    console.log("Navegar para outra tela");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Tela Inicial!</Text>
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Ir para outra tela</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000066',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TelaInicial;
