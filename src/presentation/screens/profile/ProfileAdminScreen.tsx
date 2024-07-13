import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { CardComponent } from '../../components/ui/CardComponent';
import { InputTextComponent } from '../../components/ui/InputTextComponent';
import { ButtomComponent } from '../../components/ui/ButtomComponent';
import { colors } from '../../../config/theme/theme';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { editAdminProfile } from '../../../services/adminServices';
import Toast from 'react-native-toast-message';
import { TitleComponent } from '../../components/ui/TitleComponent';
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  correo: Yup.string().email('Correo electrónico no válido').required('Es necesario un correo electrónico'),
  nombre: Yup.string().required('Debes introducir un nombre'),
  telefono: Yup.string().required('Debes introducir un teléfono móvil'),
  password: Yup.string().required('Ingresa la nueva contraseña'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('Debes confirmar la nueva contraseña'),
  current_password: Yup.string()
    .required('Debes introducir la contraseña actual')
    .test('check-current-password', 'La contraseña actual es incorrecta', function (value) {
      return value === initialValues.password;
    }),
});

interface FormValues {
  correo: string;
  nombre: string;
  telefono: string;
  password: string;
  confirm_password: string;
  current_password: string;
}

const initialValues: FormValues = {
  correo: "heyer.tinoco@epn.edu.ec",
  nombre: "Heyer Tinoco",
  telefono: "0987547665",
  password: "admin123",
  confirm_password: "",
  current_password: "",
};

export const ProfileAdminScreen = () => {
  const navigation = useNavigation();
  const [profileData, setprofileData] = useState<FormValues>(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      await editAdminProfile(1, values);
      setprofileData(values);
      Toast.show({
        type: 'success',
        text1: 'Editado Exitoso! ✔',
        text2: 'Perfil editado exitosamente!',
        visibilityTime: 6000,
        position: 'top'
      })
    } catch (error) {
      console.log('Error al editar el perfil del admin' + error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <TitleComponent title='Editar Perfil' />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Formik
          initialValues={profileData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <CardComponent style={styles.card}>
                <InputTextComponent
                  label='Nombre'
                  placeHolder='Nombre'
                  onChangeText={handleChange('nombre')}
                  onBlur={handleBlur('nombre')}
                  values={values.nombre}
                />
                {touched.nombre && errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
              </CardComponent>
              <CardComponent style={styles.card}>
                <InputTextComponent
                  label='Correo'
                  placeHolder='Correo Electrónico'
                  onChangeText={handleChange('correo')}
                  onBlur={handleBlur('correo')}
                  values={values.correo}
                />
                {touched.correo && errors.correo && <Text style={styles.errorText}>{errors.correo}</Text>}
              </CardComponent>
              <CardComponent style={styles.card}>
                <InputTextComponent
                  label='Telefono'
                  placeHolder='Teléfono móvil'
                  onChangeText={handleChange('telefono')}
                  onBlur={handleBlur('telefono')}
                  values={values.telefono}
                  keyboardtype='number-pad'
                />
                {touched.telefono && errors.telefono && <Text style={styles.errorText}>{errors.telefono}</Text>}
              </CardComponent>
              <CardComponent style={styles.card}>
                <InputTextComponent
                  label='Nueva Contraseña'
                  placeHolder='Contraseña'
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  values={values.password}
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </CardComponent>
              <CardComponent style={styles.card}>
                <InputTextComponent
                  label='Confirmar Contraseña'
                  placeHolder='Confirmar Contraseña'
                  secureTextEntry={true}
                  onChangeText={handleChange('confirm_password')}
                  onBlur={handleBlur('confirm_password')}
                  values={values.confirm_password}
                />
                {touched.confirm_password && errors.confirm_password && <Text style={styles.errorText}>{errors.confirm_password}</Text>}
              </CardComponent>
              <Text style={styles.instructionText}>Para guardar los cambios debes proporcionar la contraseña actual</Text>
              <CardComponent style={styles.card}>
                <InputTextComponent
                  label='Contraseña Actual'
                  placeHolder='Contraseña Actual'
                  secureTextEntry={true}
                  onChangeText={handleChange('current_password')}
                  onBlur={handleBlur('current_password')}
                  values={values.current_password}
                />
                {touched.current_password && errors.current_password && <Text style={styles.errorText}>{errors.current_password}</Text>}
              </CardComponent>
              <View style={styles.buttonContainer}>
                <ButtomComponent
                  style={[styles.button, { backgroundColor: colors.primary }]}
                  IconName='checkmark'
                  text='GUARDAR'
                  onPress={handleSubmit}
                  isLoading={isLoading}
                />
                <View style={{ padding: 5 }} />
                <ButtomComponent
                  style={[styles.button, { backgroundColor: '#BF0000' }]}
                  IconName='close'
                  colorIcon='white'
                  text='CANCELAR'
                  onPress={() => navigation.goBack()}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    height: 100,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  instructionText: {
    color: 'black',
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 20,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    width: 150,
    alignSelf: 'center',
  },
});
