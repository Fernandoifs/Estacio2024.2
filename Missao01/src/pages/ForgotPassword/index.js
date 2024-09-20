import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';
import globalStyle from '../../styles/styles.global';

function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleResetPassword = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, insira seu email e a nova senha.');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem('@Usuario:credenciais');
      const dadosCompletos = storedData ? JSON.parse(storedData) : null;

      if (dadosCompletos && dadosCompletos.email === email) {
        // Atualizar a senha no AsyncStorage
        dadosCompletos.password = password;
        await AsyncStorage.setItem('@Usuario:credenciais', JSON.stringify(dadosCompletos));
        Alert.alert('Sucesso', 'Sua senha foi redefinida com sucesso.');
        
        // Navegar de volta para a tela de login após a redefinição
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', 'Email não encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao verificar o email.');
    }
  };

  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.titulo}>Redefinir Senha</Text>
      
      <TextBox
        placeholder="Digite seu email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextBox
        placeholder="Digite a nova senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <View>
        <Button text="Redefinir Senha" onPress={handleResetPassword} />
      </View>
    </View>
  );
}

export default ForgotPassword;
