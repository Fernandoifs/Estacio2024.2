import React, { useState } from 'react';
import styles from './styles'
import { View, Alert,Text } from 'react-native';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import globalStyle from '../../styles/styles.global';

function CriarConta({ navigation }) {
  const [nome, setNome] = useState('');
  const [CPF, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleIr = () => {
    if (password !== passwordConfirm) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return; 
    }

    const usuario = { nome, CPF, email, password };
    navigation.navigate('Endereço', {usuario})
  }
  return (
    <ScrollView>
      <View style={globalStyle.container}>
      <Text style={globalStyle.titulo}>Criar Conta</Text>
        <View style={styles.formGroup}>
          <View style={styles.form}>
            <TextBox label='Nome Completo' onChangeText={(texto) => setNome(texto)} value={nome} />
          </View >

          <View style={styles.form}>
            <TextBox label='CPF' onChangeText={(texto) => setCPF(texto)} value={CPF} />
          </View >

          <View style={styles.form}>
            <TextBox label='Email' onChangeText={(texto) => setEmail(texto)} value={email} />
          </View >

          <View style={styles.form}>
            <TextBox label='Escolha uma senha' isPassword={true} onChangeText={(texto) => setPassword(texto)} value={password} />
          </View>

          <View style={styles.form}>
            <TextBox label='Confirme a senha' isPassword={true} onChangeText={(texto) => setPasswordConfirm(texto)} value={passwordConfirm} />
          </View>
        </View>
        <View>
          <Button text='Proxima Etapa' onPress={handleIr} />
        </View>


      </View>
    </ScrollView>
  )
}
export default CriarConta;
