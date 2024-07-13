import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { RegisterClientForm } from '../screens/Forms/RegisterClientForm';
import { RegisterEquipmentForm } from '../screens/Forms/RegisterEquipmentForm';
import { EquipmentAdminScreen } from '../screens/Equipment/EquipmentAdminScreen';
import { ProfileAdminScreen } from '../screens/profile/ProfileAdminScreen';
import { EquipmentStateScreen } from '../screens/Equipment/EquipmentStateScreen';
import { EquipmentFindScreen } from '../screens/Equipment/EquipmentFindScreen';
import { EquipmentHistoryScreen } from '../screens/Equipment/EquipmentHistoryScreen';
import { EquipmentNotificationScreen } from '../screens/Equipment/EquipmentNotificationScreen';
import { Logout } from '../screens/logout/Logout';
import { LoginPage } from '../screens/login/LoginPage';
import { HomeScreenClient } from '../screens/home/HomeScreenClient';
import { ContactClientScreen } from '../screens/Contact/ContactClientScreen';
import { EquipmentStateClientScreen } from '../screens/Equipment/EquipmentStateClientScreen';
import { HomeScreenAdmin } from '../screens/home/HomeScreenAdmin';
import { RecoveryPasswordScreen } from '../screens/Recovery/RecoveryPasswordScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='LoginPage' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="HomeScreenAdmin" component={HomeScreenAdmin} />
            <Stack.Screen name="HomeScreenClient" component={HomeScreenClient} />
            <Stack.Screen name="ProfileAdminScreen" component={ProfileAdminScreen} />
            <Stack.Screen name="RegisterEquipmentForm" component={RegisterEquipmentForm} />
            <Stack.Screen name="EquipmentAdminScreen" component={EquipmentAdminScreen} />
            <Stack.Screen name="RegisterClientForm" component={RegisterClientForm} />
            <Stack.Screen name="EquipmentStateScreen" component={EquipmentStateScreen} />
            <Stack.Screen name="EquipmentFindScreen" component={EquipmentFindScreen} />
            <Stack.Screen name="EquipmentHistoryScreen" component={EquipmentHistoryScreen} />
            <Stack.Screen name="EquipmentNotificationScreen" component={EquipmentNotificationScreen} />
            <Stack.Screen name="ContactClientScreen" component={ContactClientScreen} />
            <Stack.Screen name="EquipmentStateClientScreen" component={EquipmentStateClientScreen} />
            <Stack.Screen name="RecoveryPasswordScreen" component={RecoveryPasswordScreen} />
            {/* <Stack.Screen name="Logout" component={Logout} /> */}
        </Stack.Navigator>
    )
}
