import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useCart } from '../context/CartContext';

import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { API_URL } from '../config';

// Mapeamento das imagens dos produtos
const imageMapping = {
  'Coxinha de Frango': require('../assets/coxinha.png'),
  'Pastel de Frango': require('../assets/pastel_frango.png'),
  'Pastel de Carne': require('../assets/pastel_carne.png'),
  'Pastel de Queijo': require('../assets/pastel_queijo.png'),
  'Hambúrguer': require('../assets/hamburguer.png'),
  'KitKat': require('../assets/kitkat.png'),
  'Halls Menta': require('../assets/halls.png'),
  'Bolo de Chocolate': require('../assets/bolo.png'),
  'Bolinho': require('../assets/bolinho.png'),
  'Café com leite': require('../assets/Cafe.png'),
  'Bombom': require('../assets/bombom.png'),
  'Snickers': require('../assets/snickres.png'),
  'Coca Cola': require('../assets/coca.png'),
  'Coca Cola Zero': require('../assets/coca-zero.png'),
  'Fanta Uva': require('../assets/fanta-uva.png'),
  'Fanta Laranja': require('../assets/fanta-laranja.png'),
  'Pepsi': require('../assets/pepsi.png'),
  'Pepsi Black': require('../assets/pepsi-black.png'),
  'Toddynho': require('../assets/toddynho.png'),
  'Tip Top': require('../assets/tip-top.png'),
  'Mentos': require('../assets/mentos.png'),
  'Picolé refrescante': require('../assets/picole.png'),
  'Picolé cremoso': require('../assets/picole.png'),
  'Picolé ao leite': require('../assets/picole.png'),
  'Patel Aberto': require('../assets/pastel-aberto.png'),
  'Água Mineral Minerale': require('../assets/agua.png'),
  'Pão com manteiga': require('../assets/pao.png'),
  'Suco de Laranja': require('../assets/suco-laranja.png'),
  'Suco de Acerola': require('../assets/suco-acerola.png'),
  'Suco de Maracujá': require('../assets/suco-maracuja.png'),
  'Guaraná Antartica': require('../assets/guarana.png'),
  'Gatorade': require('../assets/gatorade.png'),
  // Adicione mais mapeamentos de imagens conforme necessário
};

const TelaInicial = ({ navigation, route }) => {
  const { nome, userType } = route.params || { nome: 'Usuário', userType: 'aluno' }; // Pega nome e userType dos parâmetros, define padrão se não existir
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { cartItems, addToCart } = useCart();
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [activePage, setActivePage] = useState('TelaInicial');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/produtos`);
        console.log('Dados recebidos da API:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'Todos'
      ? products
      : products.filter(product => product.id_categoria === selectedCategory);

  const handleAddToCart = (item) => {
    let price;

    if (userType === 'aluno' && item.preco_aluno !== null) {
      price = parseFloat(item.preco_aluno);
      console.log(`Preço para aluno aplicado: ${price} - Produto: ${item.nome}`);
    } else if (userType === 'funcionario' && item.preco_funcionario !== null) {
      price = parseFloat(item.preco_funcionario);
      console.log(`Preço para funcionário aplicado: ${price} - Produto: ${item.nome}`);
    } else if (item.preco_base !== null) {
      price = parseFloat(item.preco_base);
      console.log(`Preço base aplicado: ${price} - Produto: ${item.nome}`);
    } else {
      console.error('Produto adicionado sem preço:', item);
      Alert.alert('Erro', 'Este produto não possui um preço definido.');
      return;
    }

    const productToAdd = {
      ...item,
      price,
      name: item.nome,
      image: imageMapping[item.nome] || require('../assets/default.png')  // Adiciona a imagem ao item
    };

    addToCart(productToAdd);
    Alert.alert('Sucesso', `${item.nome} foi adicionado ao seu carrinho.`);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      Alert.alert('Logout', 'Você saiu com sucesso.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <ImageBackground source={require('../assets/fundo.jpg')} style={styles.topSection}/>
          <Text style={styles.title}>Bem-vindo(a), {nome}!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Carrinho')} style={styles.cartButton}>
            <FontAwesome name="shopping-cart" size={24} color="#FFFFFF" />
            <Text style={styles.cartText}> Carrinho ({totalItemsInCart})</Text>
          </TouchableOpacity>
          {/* Botão de Logout */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
            {['Todos', 'Salgados', 'Bebidas', 'Doces', "Sorvetes"].map((category) => (
                <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={[styles.filterButton, { backgroundColor: selectedCategory === category ? '#000066' : '#DEDEDE' }]}
                >
                  <Text style={[styles.filterText, { color: selectedCategory === category ? '#FFFFFF' : '#050505' }]}>
                    {category}
                  </Text>
                </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSection}>
          <FlatList
              data={filteredProducts}
              numColumns={2}
              renderItem={({ item }) => (
                  <View style={styles.productBox}>
                    <Image source={imageMapping[item.nome] || require('../assets/default.png')} style={styles.productImage} />
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{item.nome}</Text>
                      <View style={styles.addToCartRow}>
                        <Text style={styles.productPrice}>
                          R$ {(
                            (userType === 'aluno' && item.preco_aluno != null ? parseFloat(item.preco_aluno) :
                                    userType === 'funcionario' && item.preco_funcionario != null ? parseFloat(item.preco_funcionario) :
                                        item.preco_base != null ? parseFloat(item.preco_base) : 0
                            ).toFixed(2).replace('.', ',')
                        )}
                        </Text>
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
              contentContainerStyle={{ marginTop: 10, alignItems: 'center' }}
          />
        </View>

        {/* Barra de Navegação */}
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
                setActivePage('Pagamento');
                navigation.navigate('Pagamento');
              }}
          >
            <View style={styles.navItemContainer}>
              <FontAwesome name="credit-card" size={24} color={activePage === 'Pagamento' ? '#A80000' : '#A2A2A2'} />
            </View>
            {activePage === 'Pagamento' && <View style={styles.elipse} />}
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.navItem}
              onPress={() => {
                setActivePage('Validação');
                navigation.navigate('Validação');
              }}
          >
            <View style={styles.navItemContainer}>
              <Ionicons name="ticket" size={30} color={activePage === 'Validação' ? '#A80000' : '#A2A2A2'} />
            </View>
            {activePage === 'Validação' && <View style={styles.elipse} />}
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  topSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: 200,// Ajusta o tamanho da imagem de fundo
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
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#A80000',
    padding: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    height: 60,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#DEDEDE',
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
    paddingBottom: 1,
  },
  productBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 8,
    backgroundColor: '#E9E4DE',
    borderRadius: 8,
    padding: 10,
    width: '45%',
    height: 200,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  productDetails: {
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#242424',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00005C',
  },
  addToCartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#000066',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: 40,
    height: 35,
    alignItems: 'center',
  },
  navBar: {
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
  navItemContainer: {
    alignItems: 'center',
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
