import React from 'react'
import { Linking, View } from 'react-native'
import { colors } from '../../../config/theme/theme'
import { CardComponent } from '../../components/ui/CardComponent'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { PHONE_NUMBER } from '@env'
import { TitleComponent } from '../../components/ui/TitleComponent'
import { ModalComponent } from '../../components/ui/ModalComponent'


const handleNotify = () => {
    const whatsappUrl = `https://wa.me/593${PHONE_NUMBER}`;
    Linking.openURL(whatsappUrl).catch(err => console.error('No se puede cargar la pagina', err))
}
const handleGmail = () => {
    const email = "juandiegojd252@gmail.com";
    const subject = "Consulta";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    Linking.openURL(mailtoUrl).catch(err => console.error("Couldn't load email client", err));
};
const handleMaps = () => {
    const address = "Francisco Robles OE10-187 y, Quito 170203";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(mapsUrl).catch(err => console.error("Couldn't load maps", err));
};


export const ContactClientScreen = () => {
    return (
        <View style={{ flex: 1, marginTop: 30 }}>
            <TitleComponent title='Regresar' />
            <View style={{ alignSelf: 'center' }}>
                <CardComponent style={{ marginTop: 20, height: 350 }}>
                    <Button
                        icon={() => <Icon name="logo-whatsapp" color={colors.secondary} size={25} />}
                        mode="contained"
                        buttonColor={colors.primary}
                        style={{ width: 150, height: 42, alignSelf: 'center', marginTop: 60 }}
                        onPress={handleNotify}
                    >
                        Contactar
                    </Button>
                    <Button
                        icon={() => <Icon name="map" color={colors.secondary} size={25} />}
                        mode="contained"
                        buttonColor={colors.primary}
                        style={{ width: 150, height: 42, alignSelf: 'center', marginTop: 40 }}
                        onPress={handleMaps}
                    >
                        Ubicacion
                    </Button>
                    <Button
                        icon={() => <Icon name="logo-google" color={colors.secondary} size={25} />}
                        mode="contained"
                        buttonColor={colors.primary}
                        style={{ width: 150, height: 42, alignSelf: 'center', marginTop: 40 }}
                        onPress={handleGmail}
                    >
                        Gmail
                    </Button>
                    {/* <Button
                        icon={() => <Icon name="card" color={colors.secondary} size={25} />}
                        mode="contained"
                        buttonColor={colors.primary}
                        style={{ width: 150, height: 42, alignSelf: 'center', marginTop: 40 }}
                        onPress={() => <ModalComponent texto='Pagos' visible={false} />}
                    >
                        Pagos
                    </Button> */}
                </CardComponent>
            </View>
        </View>
    )
}
