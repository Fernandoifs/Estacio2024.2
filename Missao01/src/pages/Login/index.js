import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './styles';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import icons from '../../constants/icons';
import globalStyle from '../../styles/styles.global';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lembrarLogin, setLembrarLogin] = useState(false);

  useEffect(() => {
    const lembrarLogin = async () => {
      try {
        const saveEmail = await AsyncStorage.getItem('@usuario:email');
        const savePassword = await AsyncStorage.getItem('@usuario:password');
        if (saveEmail && savePassword) {
          setEmail(saveEmail);
          setPassword(savePassword);
          setLembrarLogin(true);
        }
      } catch (error) {
        console.error('Erro ao carregar credenciais salvas:', error);
      }
    };
    lembrarLogin();
  }, []);

  const handleLogin = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@Usuario:credenciais');
      const dadosCompletos = storedData ? JSON.parse(storedData) : null;

      if (dadosCompletos && dadosCompletos.email === email && dadosCompletos.password === password) {
        if (lembrarLogin) {
          await AsyncStorage.setItem('@usuario:email', email);
          await AsyncStorage.setItem('@usuario:password', password);
        } else {
          await AsyncStorage.removeItem('@usuario:email');
          await AsyncStorage.removeItem('@usuario:password');
        }

        navigation.navigate('Fornecedores');
      } else {
        Alert.alert('Aviso', 'Email ou senha inválida!');
      }
    } catch (error) {
      console.error('Erro ao verificar as credenciais:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao verificar as credenciais.');
    }
  };

  const handleForgot = () => {
    navigation.navigate('Esqueci minha Senha');
  };

  const handleCriar = () => {
    navigation.navigate('Criar Conta');
  };

  return (
    <View style={[globalStyle.container, {paddingTop: 80}]}>
      <View style={styles.viewImage}>
        <Image
          style={styles.logo}
          source={icons.logo}
        />
        <Text style={styles.titulo}>Gestão e Controle de Fornecedores</Text>
      </View>

      <TextBox placeholder='Email' onChangeText={(texto) => setEmail(texto)} value={email} />
      <TextBox placeholder='Senha' onChangeText={(texto) => setPassword(texto)} isPassword={true} value={password} />

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={lembrarLogin}
          onValueChange={setLembrarLogin}
        />
        <Text>Lembrar de mim</Text>
      </View>

      <TouchableOpacity onPress={handleForgot}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <View>
        <Button text="Entrar" onPress={handleLogin} />
      </View>

      <View style={styles.signupContainer}>
        <Text>Não tem conta?</Text>
        <TouchableOpacity onPress={handleCriar}>
          <Text style={styles.signupText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
