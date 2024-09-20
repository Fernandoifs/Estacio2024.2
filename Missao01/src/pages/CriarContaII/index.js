import React, { useState } from 'react';
import styles from './styles'
import { View, ScrollView, Alert } from 'react-native';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyle from '../../styles/styles.global';

function CriarContaII({ route, navigation }) {
  const { usuario } = route.params;
  const [endereco, setEndereco] = useState('');
  const [compl, setCompl] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUF] = useState('');
  const [cep, setCep] = useState('');

  const handlerCriarConta = async () => {
    const dadosCompletos = { ...usuario, endereco, compl, bairro, cidade, UF, cep };
    try {
      await AsyncStorage.setItem('@Usuario:credenciais', JSON.stringify(dadosCompletos));
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar a conta.')
    }
  }
  return (
    <ScrollView>
      <View style={globalStyle.container}>

        <View style={styles.formGroup}>

          <View style={styles.formHorizontal}>
            <View style={styles.form70}>
              <TextBox label='Endereço' onChangeText={(texto) => setEndereco(texto)} value={endereco} />
            </View >
            <View style={styles.form30}>
              <TextBox label='Compl.' onChangeText={(texto) => setCompl(texto)} value={compl} />
            </View >
          </View >

          <View style={styles.form}>
            <TextBox label='Bairro' onChangeText={(texto) => setBairro(texto)} value={bairro} />
          </View >

          <View style={styles.formHorizontal}>
            <View style={styles.form70}>
              <TextBox label='Cidade' onChangeText={(texto) => setCidade(texto)} value={cidade} />
            </View >
            <View style={styles.form30}>
              <TextBox label='UF' onChangeText={(texto) => setUF(texto)} value={UF} />
            </View>
          </View >

          <View style={styles.form}>
            <TextBox label='CEP' onChangeText={(texto) => setCep(texto)} value={cep} />
          </View >

        </View>
        <Button text='Criar minha conta' onPress={handlerCriarConta} />

      </View>
    </ScrollView>
  )
}
export default CriarContaII;
