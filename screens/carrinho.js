import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../context/CartContext';

const Carrinho = ({ navigation }) => {
  const { cartItems, removeFromCart, incrementProduct, decrementProduct } = useCart(); 

  const removerProduto = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja remover este item do carrinho?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          onPress: () => {
            removeFromCart(id); 
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.produtoContainer}>
      <Text style={styles.produtoNome}>{item.name}</Text>
      <Text style={styles.produtoPreco}>{item.price}</Text>
      <View style={styles.quantidadeContainer}>
        <TouchableOpacity style={styles.quantidadeButton} onPress={() => decrementProduct(item.id)}>
          <Text style={styles.quantidadeButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantidadeText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantidadeButton} onPress={() => incrementProduct(item.id)}>
          <Text style={styles.quantidadeButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.removerButton} onPress={() => removerProduto(item.id)}>
        <Text style={styles.removerButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seu Carrinho</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {cartItems.length === 0 && <Text style={styles.emptyText}>Carrinho vazio!</Text>}
      
      {/* Nav Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('TelaInicial')}
        >
          <View style={styles.navItemContainer}>
            <FontAwesome6 name="house" size={20} color={'#A2A2A2'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Carrinho')}
        >
          <View style={styles.navItemContainer}>
            <FontAwesome name="shopping-cart" size={30} color={'#A80000'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Pagamento')}
        >
          <View style={styles.navItemContainer}>
            <FontAwesome name="credit-card" size={24} color={'#A2A2A2'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Validação')}
        >
          <View style={styles.navItemContainer}>
            <Ionicons name="ticket" size={30} color={'#A2A2A2'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  produtoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  produtoNome: {
    fontSize: 18,
  },
  produtoPreco: {
    fontSize: 18,
    color: '#000066',
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantidadeButton: {
    backgroundColor: '#E9E4DE',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantidadeButtonText: {
    fontSize: 18,
  },
  quantidadeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removerButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    padding: 5,
  },
  removerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 75,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 5,
  }, 
  
  navItem: {
    alignItems: 'center',
    position: 'relative',
    width: 60, 
    marginBottom: 10,
  },
});

export default Carrinho;
