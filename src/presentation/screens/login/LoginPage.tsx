import { Image, Text, View } from "react-native"
import { colors, globalStyles } from "../../../config/theme/theme"
import { ButtomComponentLogin } from "../../components/ui/ButtomComponentLogin"
import { InputTextComponent } from "../../components/ui/InputTextComponent"
import { Button } from "react-native-paper"
import * as Yup from 'yup'
import { useState } from "react"
import { Formik, FormikHelpers } from "formik"
import { loginAdmin, loginClient } from "../../../services/loginServices"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import { useClientStore } from "../../../store/clientStore"


const ValidationSchema = Yup.object().shape({
    correo: Yup.string().email('Correo electronico no valido').required('Correo electronico requerido'),
    password: Yup.string().required('Contraseña requerida'),
});

interface FormValues {
    correo: string;
    password: string;
}

const initialValues: FormValues = {
    correo: "",
    password: "",
}

// interface LoginPageProps {
//     onLoginSuccess: () => void; // Prop para manejar el inicio de sesión exitoso
// }

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<any>();
    const attemptLogin = async (correo: string, password: string) => {
        try {
            const adminResponse = await loginAdmin(correo, password);
            if (adminResponse.userType === 'admin') {
                return { success: true, userType: 'admin' };
            }
        } catch (errorAdmin) {
            // Si no es admin, intentamos con cliente
        }

        try {
            const clientResponse = await loginClient(correo, password);
            if (clientResponse.userType === 'client') {
                useClientStore.getState().setClientData(clientResponse);
                return { success: true, userType: 'client' };
            }
        } catch (errorClient) {
            // Si no es cliente, llegamos aquí
        }

        // Si llegamos aquí, las credenciales son incorrectas
        return { success: false };
    };
    const handleLogin = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        setIsLoading(true);
        try {
            await ValidationSchema.validate(values, { abortEarly: false });

            const loginResult = await attemptLogin(values.correo, values.password);

            if (loginResult.success) {
                formikHelpers.resetForm();
                if (loginResult.userType === 'admin') {
                    navigation.navigate('HomeScreenAdmin');
                } else {
                    navigation.navigate('HomeScreenClient');
                }
                Toast.show({
                    type: 'success',
                    text1: 'Bienvenido! 😀',
                    text2: 'Inicio de sesión exitoso',
                    visibilityTime: 3000,
                    position: 'top'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Credenciales Incorrectas',
                    text2: 'Revisa tus credenciales 😔',
                    visibilityTime: 2000,
                    position: 'top'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error 😔',
                text2: 'Revisa tus credenciales',
                visibilityTime: 5000,
                position: 'top'
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={[globalStyles.mainContainer, { marginTop: 200 }]}>
                <View style={{ backgroundColor: colors.background }}>
                    <Image source={require('../../assets/LogoHackersInternet.jpg')} style={globalStyles.logo} />
                </View>
                <View>
                    <Text style={{
                        fontFamily: 'sans-serif',
                        color: 'black',
                        fontSize: 30,
                        marginTop: -130
                    }}>HACKER 'S INTERNET</Text>
                </View>
                <Text style={[globalStyles.subtitle, { marginTop: -90 }]}>BIENVENIDO!</Text>
                <View style={{ marginBottom: 30 }} />
                <Formik
                    initialValues={{ correo: "", password: "" }}
                    validationSchema={ValidationSchema}
                    onSubmit={handleLogin}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <InputTextComponent
                                label="Email"
                                placeHolder="E-Mail"
                                keyboardtype="email-address"
                                secureTextEntry={false}
                                style={{ width: 310 }}
                                onChangeText={handleChange('correo')}
                                onBlur={handleBlur('correo')}
                                values={values.correo} />
                            {touched.correo && errors.correo && <Text style={{ color: "red" }}>{errors.correo}</Text>}
                            <View style={{ marginBottom: 10 }} />

                            <InputTextComponent
                                label="Contraseña"
                                placeHolder="Contraseña"
                                secureTextEntry={true}
                                style={{ width: 310 }}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                values={values.password} />
                            {touched.password && errors.password && <Text style={{ color: "red" }}>{errors.password}</Text>}
                            <View style={{ marginBottom: 20 }} />
                            <ButtomComponentLogin text="INICIAR SESION" mode="contained" onPress={handleSubmit} isLoading={isLoading} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ color: 'black' }}>¿Problemas para Iniciar? </Text>
                                <View style={{ borderBottomWidth: 1, width: 130, borderBottomColor: colors.secondary }}>
                                    <Button
                                        mode="text"
                                        onPress={() => navigation.navigate('RecoveryPasswordScreen')}
                                        textColor={colors.secondary}

                                    >
                                        Recuperar Clave
                                    </Button>
                                </View>
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </View>
    )
}
