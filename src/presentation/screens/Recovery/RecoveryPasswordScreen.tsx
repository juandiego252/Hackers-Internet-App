import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { colors, globalStyles } from '../../../config/theme/theme';
import { CardComponent } from '../../components/ui/CardComponent';
import { InputTextComponent } from '../../components/ui/InputTextComponent';
import { ButtomComponent } from '../../components/ui/ButtomComponent';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { recoveryPasswordAdmin } from '../../../services/adminServices';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
    correo: Yup.string().email('Correo electrónico no válido').required('Debes ingresar un correo electrónico')
});

interface FormValues {
    correo: string;
}

const initialValues: FormValues = {
    correo: "",
}


export const RecoveryPasswordScreen = () => {
    const [isLoading, setisLoading] = useState(false);
    const handleLogin = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
        setisLoading(true);
        try {
            const response = await recoveryPasswordAdmin(values.correo);
            Toast.show({
                type: 'success',
                text1: 'Correo Enviado !',
                text2: 'Revisa tu correo electronico 😀',
                visibilityTime: 6000,
                position: 'top'
            })
            actions.resetForm();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'El correo no esta registrado',
                visibilityTime: 6000,
                position: 'top'
            });
        } finally {
            setisLoading(false);
        }
    }
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ alignSelf: 'center' }}>
                <Image source={require('../../assets/LogoHackersInternet.jpg')} style={{ height: 180, width: 250, marginTop: 20 }} />
            </View>
            <View style={{ marginTop: 50 }}>
                <View style={{ alignSelf: 'center' }}>
                    <Text style={{ fontSize: 25, color: 'black', fontWeight: '600' }}>¡Obtenga una nueva contraseña!</Text>
                </View>
                <CardComponent style={{ height: 200 }}>
                    <Text style={{ color: 'black', alignSelf: 'center' }}>Ingrese su correo electrónico</Text>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <>
                                <InputTextComponent
                                    label='Correo Electrónico'
                                    placeHolder='email'
                                    values={values.correo}
                                    onChangeText={handleChange('correo')}
                                    onBlur={handleBlur('correo')}
                                    keyboardtype='email-address'
                                />
                                {touched.correo && errors.correo && <Text style={{ color: "red" }}>{errors.correo}</Text>}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <ButtomComponent
                                        IconName='checkmark-circle'
                                        text='Enviar'
                                        buttonColor={colors.primary}
                                        style={{ width: 130, backgroundColor: colors.primary }} onPress={handleSubmit}
                                        isLoading={isLoading}
                                        colorIsloading={'white'}

                                    />
                                    <View style={{ padding: 3 }} />
                                    <ButtomComponent IconName='close-circle' text='Cancelar' buttonColor={colors.primary} style={{ width: 130 }} onPress={() => navigation.goBack()} />
                                </View>
                            </>
                        )}
                    </Formik>
                </CardComponent>
            </View>
        </View>
    );
}
