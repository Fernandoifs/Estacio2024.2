import { StatusBar } from 'react-native';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import Fornecedores from '../pages/Fornecedores';
import CriarConta from '../pages/CriarConta';
import CriarContaII from '../pages/CriarContaII';
import ForgotPassword from '../pages/ForgotPassword';
import CriarFornecedor from '../pages/CriarFornecedor';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor='#38A69D' barStyle={'light-content'} />
            <Stack.Navigator initialRouteName="Inicio">
                <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Fornecedores" component={Fornecedores} options={{ title: "" }} />
                <Stack.Screen name="Criar Conta" component={CriarConta} options={{ title: "" }} />
                <Stack.Screen name="Endereço" component={CriarContaII} options={{ title: "" }} />
                <Stack.Screen name="Esqueci minha Senha" component={ForgotPassword} options={{ title: "" }} />
                <Stack.Screen name="Cadastro de Fornecedores" component={CriarFornecedor} options={{ title: "" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}