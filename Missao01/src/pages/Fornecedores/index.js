import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Button from '../../components/Button';
import globalStyle from '../../styles/styles.global';

function Fornecedores({ navigation }) {
  const [fornecedores, setFornecedores] = useState([]);
  const [nome, setNome] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const fetchFornecedores = async () => {
        try {
          const fornecedoresSalvos = await AsyncStorage.getItem('@Fornecedores:listaFornecedores');
          if (fornecedoresSalvos) {
            setFornecedores(JSON.parse(fornecedoresSalvos));
          }
        } catch (error) {
          console.error('Erro ao carregar fornecedores:', error);
        }
      };
      fetchFornecedores();
    }, [])
  );

  const excluirFornecedor = async (index) => {
    Alert.alert(
      'Excluir Fornecedor',
      'Você tem certeza que deseja excluir este fornecedor?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const novosFornecedores = fornecedores.filter((_, i) => i !== index);
              await AsyncStorage.setItem('@Fornecedores:listaFornecedores', JSON.stringify(novosFornecedores));
              setFornecedores(novosFornecedores);
              Alert.alert('Sucesso', 'Fornecedor excluído com sucesso.');
            } catch (error) {
              console.error('Erro ao excluir fornecedor:', error);
            }
          },
        },
      ]
    );
  };

  const editarFornecedor = (index) => {
    const fornecedor = fornecedores[index];
    navigation.navigate('Cadastro de Fornecedores', { fornecedor, index });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Image
        style={styles.imageItem}
        source={item.imagem ? { uri: item.imagem } : require('../../assets/forn.png')}
      />
      <View >
        <View style={styles.dadosItem}>
          <Text style={styles.nomeItem}>{item.nome}</Text>
          <Text>CNPJ: {item.CNPJ}</Text>
        </View>
        <View style={styles.buttonsItem}>
          <TouchableOpacity style={styles.editButton} onPress={() => editarFornecedor(index)} >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => excluirFornecedor(index)} >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
  const buscaUser = async () => {
    //busca os dados cadastrados e converte para json e splita para pegar o nome
    try {
      const dadosUser = await AsyncStorage.getItem('@Usuario:credenciais');
      const user = JSON.parse(dadosUser)
      setNome(user.nome || '');

    } catch (error) {
      console.error('Erro ao buscar o nome do usuário:', error);
    }
  }

  useEffect(() => {
    buscaUser();
  }, []);
  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.titulo}>{`Bem-vindo ${nome}!`}</Text>

      <FlatList
        data={fornecedores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum fornecedor cadastrado.</Text>}
      />
      <View style={styles.alterButton}>
        <Button text="Incluir" onPress={() => navigation.navigate('Cadastro de Fornecedores')} />
      </View>
    </View>
  );
}

export default Fornecedores;
