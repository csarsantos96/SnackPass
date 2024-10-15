import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
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

const TelaInicial = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Bem-vindo à Tela Inicial!</Text>
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
                  <TouchableOpacity style={styles.addButton}>
                    <FontAwesome name="plus" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ marginTop: 10 }}
        />
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
  filters: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    paddingVertical: 5, 
    height: 50, 
    marginTop: 0, 
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    margin: 8,
    width: 156,
    height: 220,
    backgroundColor: '#E9E4DE',
    borderRadius: 16,
  },
  productImage: {
    width: 140,
    height: 128,
    backgroundColor: '#A40000',
    borderRadius: 12,
  },
  productDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 140,
    height: 64,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#242424',
  },
  addToCartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 140,
    height: 32,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#050505',
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: '#000066',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TelaInicial;
