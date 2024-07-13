import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { LoginPage } from './presentation/screens/login/LoginPage';
import { PaperProvider } from 'react-native-paper';
import { RegisterEquipmentForm } from './presentation/screens/Forms/RegisterEquipmentForm';
import { RegisterClientForm } from './presentation/screens/Forms/RegisterClientForm';
import Toast from 'react-native-toast-message';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Cambia el estado de isLoggedIn a true
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsLoggedIn(false); // Cambia el estado de isLoggedIn a false
  };
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  )
}
