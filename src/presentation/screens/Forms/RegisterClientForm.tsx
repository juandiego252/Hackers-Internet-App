import { ScrollView, Text, View } from 'react-native'
import { colors } from '../../../config/theme/theme'
import * as Yup from 'yup'
import { TitleViewComponent } from '../../components/ui/TitleViewComponent'
import { Formik } from 'formik'
import { InputTextComponent } from '../../components/ui/InputTextComponent'
import { submitClient } from '../../../services/clientServices'
import { CardInputComponent } from '../../components/ui/CardInputComponent'
import { ButtomComponent } from '../../components/ui/ButtomComponent'
import Toast from 'react-native-toast-message'
import { useState } from 'react'
import { TitleComponent } from '../../components/ui/TitleComponent'
import { useNavigation } from '@react-navigation/native'

const validationSchema = Yup.object().shape({
    correo: Yup.string()
        .email('Correo electrónico no válido')
        .required('Debe proporcionar un correo electrónico'),
    nombre: Yup.string().required('Debe proporcionar el nombre del cliente'),
    telefono: Yup.string().required('El numero de telefono es obligatorio').length(10, 'Numero de telefono no valido')
})


interface FormValues {
    correo: string;
    nombre: string;
    telefono: string;
}

const initialValues: FormValues = {
    correo: "",
    nombre: "",
    telefono: "",

}


export const RegisterClientForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const handleSubmit = async (values: FormValues) => {
        setIsLoading(true);
        try {
            await submitClient(values);
            Toast.show({
                type: 'success',
                text1: 'Registro Exitoso ! ✔',
                text2: 'Cliente Registrado con Exito',
                visibilityTime: 6000,
                position: 'top'
            })
            console.log('Datos enviados correctamente')
        } catch (error) {
            console.error('Error al enviar los clientes', error)
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <ScrollView>
            <View style={{ flex: 1, marginTop: 30 }} >
                <TitleComponent title='Registrar Usuarios' />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ marginTop: 10 }}>
                            <CardInputComponent>
                                <InputTextComponent
                                    label='Correo Electronico'
                                    placeHolder='Correo Electronico'
                                    keyboardtype='email-address'
                                    values={values.correo}
                                    onChangeText={handleChange('correo')}
                                    onBlur={handleBlur('correo')}
                                    error={touched.correo && errors.correo ? errors.correo : ''}

                                />
                            </CardInputComponent>
                            <CardInputComponent>
                                <InputTextComponent
                                    label='Nombre'
                                    placeHolder='Nombre del cliente'
                                    values={values.nombre}
                                    onChangeText={handleChange('nombre')}
                                    onBlur={handleBlur('nombre')}
                                    error={touched.nombre && errors.nombre ? errors.nombre : ''}
                                />
                            </CardInputComponent>
                            <CardInputComponent>
                                <InputTextComponent
                                    label='Telefono'
                                    placeHolder='Telefono celular'
                                    values={values.telefono}
                                    keyboardtype='number-pad'
                                    onChangeText={handleChange('telefono')}
                                    onBlur={handleBlur('telefono')}
                                    error={touched.telefono && errors.telefono ? errors.telefono : ''}
                                />
                            </CardInputComponent>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <ButtomComponent
                                    style={{ backgroundColor: colors.primary, width: 150, alignSelf: 'center', marginTop: 15 }}
                                    IconName='checkmark'
                                    text='GUARDAR'
                                    onPress={handleSubmit}
                                    isLoading={isLoading}
                                />
                                <View style={{ padding: 3 }} />
                                <ButtomComponent
                                    style={{ backgroundColor: '#BF0000', width: 150, alignSelf: 'center', marginTop: 15 }}
                                    IconName='close'
                                    colorIcon={'white'}
                                    text='CANCELAR'
                                    onPress={() => navigation.goBack()}
                                />
                            </View>
                        </View>
                    )}

                </Formik>
            </View>

        </ScrollView>
    )
}
