import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

const Validacao = ({ navigation, route }) => {
  const { produtos } = route.params || {};
  console.log(produtos); // Verifique os dados recebidos

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.imagem }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.nome || 'Nome não disponível'}</Text>
        <Text style={styles.productPrice}>R$ {item.price ? item.price.toFixed(2) : '0.00'}</Text>
      </View>
      <TouchableOpacity 
        style={styles.arrowButton} 
        onPress={() => navigation.navigate('Ticket')}
      >
        <Ionicons name="arrow-forward" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tela de Validação</Text>
      
      <FlatList 
        data={produtos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} 
      />

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
            <FontAwesome name="shopping-cart" size={30} color={'#A2A2A2'} />
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
            <Ionicons name="ticket" size={30} color={'#A80000'} />
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
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    
  },
  productPrice: {
    fontSize: 14,
    color: '#6A6A6A',
  },
  arrowButton: {
    padding: 10,
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

export default Validacao;
