import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../config/theme/theme'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Typewriter from 'react-native-typewriter';
import { CardComponent } from '../../components/ui/CardComponent';
import { useClientStore } from '../../../store/clientStore';

const DeviceWidth = Dimensions.get('window').width


const gridItems = [
  { id: '1', backgroundColor: colors.primary, iconName: 'desktop', label: 'Estado Equipos', screen: 'EquipmentStateClientScreen' },
  { id: '2', backgroundColor: colors.primary, iconName: 'search', label: 'Buscar Equipo', screen: 'EquipmentFindScreen' },
  { id: '3', backgroundColor: colors.primary, iconName: 'navigate', label: 'contactar', screen: 'ContactClientScreen' },
  { id: '4', backgroundColor: colors.primary, iconName: 'log-out', label: 'Salir', screen: 'Logout' },
];

export const HomeScreenClient = () => {
  const navigation = useNavigation<any>();
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginPage' }],
    });
  };
  const clientData = useClientStore(state => state.clientData);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ alignSelf: 'center' }}>
        <Image source={require('../../assets/BackgroundImage.jpg')} style={{ marginLeft: 50, height: 430, width: 430, backgroundColor: 'white' }} />
        <CardComponent style={{ position: 'absolute', marginTop: 140, width: 350, height: 120 }}>
          <Text style={{ color: colors.primary, fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}>Hacker 's Internet 🦊</Text>
          <Typewriter
            typing={1}
            maxDelay={50}
            minDelay={30}
            delayMap={[]}
            style={{ marginTop: 5, fontSize: 20, color: colors.primary, alignSelf: 'center' }}
          >{`Bienvenido ${clientData?.nombre}  😀`}</Typewriter>
          <Typewriter
            typing={1}
            maxDelay={50}
            minDelay={30}
            delayMap={[]}
            style={{ marginTop: 1, fontSize: 20, color: colors.primary, alignSelf: 'center' }}
          >es un gusto tenerte de vuelta! </Typewriter>
        </CardComponent>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.cardBackground, marginTop: 30 }}>
        <View style={{ alignSelf: 'flex-start' }}>
          <Text style={{ height: 35, color: 'black', fontWeight: 'bold', marginLeft: 25, fontSize: 20, marginTop: -40 }}>¿Qué quieres hacer?</Text>
        </View>
        <FlatList
          data={gridItems}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'center' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: DeviceWidth * 0.4,
                height: DeviceWidth * 0.3,
                marginHorizontal: 8,
                marginVertical: 7,
                margin: 1,
                padding: 10,
                backgroundColor: colors.cardBackground,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10
                },
                shadowOpacity: 0.24,
                shadowRadius: 7,
                elevation: 9,
                marginBottom:30
              }}
              onPress={item.screen === 'Logout' ? handleLogout : () => navigation.navigate(item.screen)}
            >
              <Icon name={item.iconName} size={30} color={colors.primary} />
              <Text style={{ color: '#050505', marginTop: 5 }}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}
