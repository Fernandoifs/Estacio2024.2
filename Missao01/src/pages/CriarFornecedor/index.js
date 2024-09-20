import React, { useState, useEffect } from 'react';
import { View, Image, Alert, TouchableOpacity, PermissionsAndroid } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';
import icons from '../../constants/icons';
import globalStyle from '../../styles/styles.global';

export default function CadastroFornecedor({ route, navigation }) {
  const [nome, setNome] = useState('');
  const [CNPJ, setCNPJ] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [imagem, setImagem] = useState(null);

  const { fornecedor, index } = route.params || {};
  useEffect(() => {
    if (fornecedor) {
      setNome(fornecedor.nome);
      setCNPJ(fornecedor.CNPJ);
      setEndereco(fornecedor.endereco);
      setContato(fornecedor.contato);
      setImagem(fornecedor.imagem);
    }
  }, [fornecedor]);

  const solicitarPermissoes = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permissão para acessar a galeria',
          message: 'O aplicativo precisa acessar a galeria para selecionar uma imagem.',
          buttonNeutral: 'Perguntar depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao solicitar permissão.');
      return false;
    }
  };

  const selecionarImagem = async () => {
    const temPermissao = await solicitarPermissoes();

    if (temPermissao) {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
        },
        (response) => {
          if (response.didCancel) {
            console.log('Usuário cancelou a seleção da imagem.');
          } else if (response.errorCode) {
            console.log('Erro ao selecionar imagem:', response.errorMessage);
          } else {
            setImagem(response.assets[0].uri);
          }
        }
      );
    } else {
      Alert.alert('Permissão Negada', 'Não foi possível acessar a galeria.');
    }
  };

  const salvarFornecedor = async () => {
    if (nome === '' || CNPJ === '' || endereco === '' || contato === '') {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const novoFornecedor = {
      nome,
      CNPJ,
      endereco,
      contato,
      imagem,
    };

    try {
      const fornecedoresSalvos = await AsyncStorage.getItem('@Fornecedores:listaFornecedores');
      let fornecedores = fornecedoresSalvos ? JSON.parse(fornecedoresSalvos) : [];

      if (fornecedor) {
        fornecedores[index] = novoFornecedor;
      } else {
        fornecedores.push(novoFornecedor);
      }

      await AsyncStorage.setItem('@Fornecedores:listaFornecedores', JSON.stringify(fornecedores));

      setNome('');
      setCNPJ('');
      setEndereco('');
      setContato('');
      setImagem(null);

      Alert.alert('Sucesso', 'Fornecedor salvo com sucesso!', [
        {
          text: 'OK',
          onPress: () => setTimeout(() => {navigation.navigate('Fornecedores') }, 200)
        },
      ]);
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o fornecedor.');
    }
  };


  return (
    <View style={globalStyle.container}>
      <TouchableOpacity onPress={selecionarImagem}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.image} />
        ) : (
          <Image source={icons.upload} style={styles.placeholderImage} resizeMode="contain" />
        )}
      </TouchableOpacity>

      <TextBox
        placeholder="Nome do Fornecedor"
        value={nome}
        onChangeText={setNome}
      />
      <TextBox
        placeholder="CNPJ"
        value={CNPJ}
        onChangeText={setCNPJ}
      />
      <TextBox
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextBox
        placeholder="Contato"
        value={contato}
        onChangeText={setContato}
      />
      <Button text="Salvar Fornecedor" onPress={salvarFornecedor} />
    </View>
  );
}
