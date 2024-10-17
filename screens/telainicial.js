import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../context/CartContext';


const products = [
  { id: 1, name: 'Café', price: 'R$ 3,00', category: 'Bebidas', image: require('../assets/Cafe.png') },
  { id: 2, name: 'Refrigerante', price: 'R$ 4,50', category: 'Bebidas', image: require('../assets/Cafe.png') },
  { id: 3, name: 'Bolo', price: 'R$ 6,00', category: 'Comidas', image: require('../assets/Cafe.png') },
  { id: 4, name: 'Suco', price: 'R$ 3,00', category: 'Bebidas', image: require('../assets/Cafe.png') },
  { id: 5, name: 'Tip-top', price: 'R$ 4,50', category: 'Bebidas', image: require('../assets/Cafe.png') },
  { id: 6, name: 'Salgado', price: 'R$ 6,00', category: 'Comidas', image: require('../assets/Cafe.png') },
  { id: 7, name: 'Suco e salgado', price: 'R$ 8,00', category: 'Combos', image: require('../assets/Cafe.png') },
  { id: 8, name: 'Refrigerante e salgado', price: 'R$ 8,50', category: 'Combos', image: require('../assets/Cafe.png') },
  { id: 9, name: 'Salgado e Bolo', price: 'R$ 6,00', category: 'Combos', image: require('../assets/Cafe.png') },
  { id: 10, name: 'Suco e Refrigerante', price: 'R$ 8,00', category: 'Combos', image: require('../assets/Cafe.png') },
  { id: 11, name: 'Refrigerante e Salgado', price: 'R$ 8,50', category: 'Combos', image: require('../assets/Cafe.png') },
  { id: 12, name: 'Salgado e Bolo', price: 'R$ 6,00', category: 'Combos', image: require('../assets/Cafe.png') },
];

const TelaInicial = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { cartItems, addToCart } = useCart();

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Estado para a página ativa da NavBar
  const [activePage, setActivePage] = useState('TelaInicial');

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Bem-vindo à Tela Inicial!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Carrinho')} style={styles.cartButton}>
          <FontAwesome name="shopping-cart" size={24} color="#FFFFFF" />
          <Text style={styles.cartText}> Carrinho ({totalItemsInCart})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          <TouchableOpacity onPress={() => setSelectedCategory('Todos')} style={styles.filterButton}>
            <Text style={styles.filterText}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedCategory('Combos')} style={styles.filterButton}>
            <Text style={styles.filterText}>Combos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedCategory('Comidas')} style={styles.filterButton}>
            <Text style={styles.filterText}>Comidas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedCategory('Bebidas')} style={styles.filterButton}>
            <Text style={styles.filterText}>Bebidas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedCategory('Outros')} style={styles.filterButton}>
            <Text style={styles.filterText}>Outros</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.bottomSection}>
        <FlatList
          data={filteredProducts}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.productBox}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.addToCartRow}>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => handleAddToCart(item)} 
                  >
                    <FontAwesome name="plus" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ marginTop: 10,  }}
        />
      </View>

      {/* Nav Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => {
            setActivePage('TelaInicial');
            navigation.navigate('TelaInicial');
          }}
        >
          <View style={styles.navItemContainer}>
            <FontAwesome6 name="house" size={20} color={activePage === 'TelaInicial' ? '#A80000' : '#A2A2A2'} />
          </View>
          {activePage === 'TelaInicial' && <View style={styles.elipse} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => {
            setActivePage('Carrinho');
            navigation.navigate('Carrinho');
          }}
        >
          <View style={styles.navItemContainer}>
            <FontAwesome name="shopping-cart" size={30} color={activePage === 'Carrinho' ? '#A80000' : '#A2A2A2'} />
          </View>
          {activePage === 'Carrinho' && <View style={styles.elipse} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => {
            setActivePage('Pagamento'); // Altera a página ativa para Pagamento
            navigation.navigate('Pagamento'); // Navega para a tela de Pagamento
          }}
        >
          <View style={styles.navItemContainer}>
            <FontAwesome name="credit-card" size={24} color={activePage === 'Pagamento' ? '#A80000' : '#A2A2A2'} style={styles.cardIcon} />
          </View>
          {activePage === 'Pagamento' && <View style={styles.elipse} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => {
            setActivePage('Notificações');
            navigation.navigate('Notificações');
          }}
        >
          <View style={styles.navItemContainer}>
            <Ionicons name="ticket" size={30} color={activePage === 'Notificações' ? '#A80000' : '#A2A2A2'} />
          </View>
          {activePage === 'Notificações' && <View style={styles.elipse} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.5,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cartText: {
    color: '#FFFFFF',
    marginLeft: 5,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    height: 60,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 0,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E9E4DE',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  filterText: {
    color: '#050505',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 1,
  },
  productBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginRight:10,
    marginLeft:10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 1,
    padding: 10,
    width: '45%',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  productDetails: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000066',
  },
  addToCartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#000066',
    padding: 5,
    borderRadius: 5,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 60,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    position: 'relative',
    width: 60, 
    marginBottom: 10,
  },
  navText: {
    fontSize: 12,
    color: '#A2A2A2',
  },
  elipse: {
    position: 'absolute',
    bottom: -10,
    width: 20,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#A80000',
    left: '50%',
    marginLeft: -10,
  },
});

export default TelaInicial;