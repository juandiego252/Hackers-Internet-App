import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../config/theme/theme";
import { TitleViewComponent } from "../../components/ui/TitleViewComponent";
import { InputTextComponent } from "../../components/ui/InputTextComponent";
import * as Yup from 'yup';
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { submitEquipment } from "../../../services/equipmentServices";
import { CardInputComponent } from "../../components/ui/CardInputComponent";
import { ButtomComponent } from "../../components/ui/ButtomComponent";
import Toast from "react-native-toast-message";
import { Picker } from '@react-native-picker/picker';
import { TitleComponent } from "../../components/ui/TitleComponent";
import { useNavigation } from "@react-navigation/native";

interface Cliente {
    id: number;
    nombre: string;
}

interface FormValues {
    marca: string;
    modelo: string;
    estado: string;
    cliente_nombre: string;
    observaciones: string;
    tipo: string;
}

interface EquipmentData extends FormValues {
    id_cliente: number;
}

const validationSchema = Yup.object().shape({
    marca: Yup.string().required('Marca es obligatorio'),
    modelo: Yup.string().required('Modelo es obligatorio'),
    estado: Yup.string().required('Estado es Obligatorio'),
    cliente_nombre: Yup.string().required('Nombre del Cliente obligatorio'),
    observaciones: Yup.string().required('Observaciones necesarias'),
    tipo: Yup.string(),
});

const normalizeString = (str: string): string => str.trim().toLowerCase().replace(/\s+/g, ' ');

export const RegisterEquipmentForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const [clientes, setClientes] = useState<Cliente[]>([]);
    useEffect(() => {
        fetch('https://tesis-kphi.onrender.com/api/clientes')
            .then(response => response.json())
            .then(data => setClientes(data))
            .catch(error => console.error('Error al obtener los clientes', error));
    }, []);

    const initialValues: FormValues = {
        marca: "",
        modelo: "",
        estado: "",
        cliente_nombre: "",
        observaciones: "",
        tipo: "",
    };

    const handleSubmit = async (values: FormValues) => {
        const normalizedInputName = normalizeString(values.cliente_nombre);
        const cliente = clientes.find(c => normalizeString(c.nombre) === normalizedInputName);
        if (cliente) {
            const equipmentData: EquipmentData = {
                ...values,
                id_cliente: cliente.id,
                cliente_nombre: cliente.nombre, // Usar el nombre exacto del cliente de la base de datos
            };
            setIsLoading(true);
            try {
                await submitEquipment(equipmentData);
                Toast.show({
                    type: 'success',
                    text1: 'Registro Exitoso ! ✔',
                    text2: 'Equipo Registrado con Éxito',
                    visibilityTime: 6000,
                    position: 'top',
                });
                console.log("Datos enviados correctamente");
            } catch (error) {
                console.error('Error al enviar los datos', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Cliente no encontrado',
                visibilityTime: 6000,
                position: 'top',
            });
        }
    };

    return (
        <ScrollView>
            <View style={{ flex: 1, marginTop: 10 }}>
                <TitleComponent title="Registrar Equipos" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <View style={{ marginTop: 10 }}>
                            <CardInputComponent>
                                <InputTextComponent
                                    label="Marca"
                                    placeHolder="Marca del Computador"
                                    values={values.marca}
                                    onChangeText={handleChange('marca')}
                                    onBlur={handleBlur('marca')}
                                    error={touched.marca && errors.marca ? errors.marca : ''} />
                            </CardInputComponent>
                            <CardInputComponent>
                                <InputTextComponent
                                    label="Modelo"
                                    placeHolder="Modelo Del Computador"
                                    values={values.modelo}
                                    onChangeText={handleChange('modelo')}
                                    onBlur={handleBlur('modelo')}
                                    error={touched.modelo && errors.modelo ? errors.modelo : ''} />
                            </CardInputComponent>
                            <CardInputComponent>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={values.estado}
                                        onValueChange={(itemValue) => setFieldValue('estado', itemValue)}
                                        style={{ height: 50, width: '100%' }}
                                    >
                                        <Picker.Item label="Selecciona el estado" value="" />
                                        <Picker.Item label="Ingresado" value="Ingresado" />
                                        <Picker.Item label="En espera" value="En espera" />
                                        <Picker.Item label="En Mantenimiento" value="En Mantenimiento" />
                                        <Picker.Item label="Listo" value="Listo" />
                                        <Picker.Item label="Entregado" value="Entregado" />
                                    </Picker>
                                    {touched.estado && errors.estado && (
                                        <Text style={{ color: 'red' }}>{errors.estado}</Text>
                                    )}
                                </View>
                            </CardInputComponent>
                            <CardInputComponent>
                                <InputTextComponent
                                    label="Nombre del Cliente"
                                    placeHolder="Nombre del Cliente"
                                    values={values.cliente_nombre}
                                    onChangeText={handleChange('cliente_nombre')}
                                    onBlur={handleBlur('cliente_nombre')}
                                    error={touched.cliente_nombre && errors.cliente_nombre ? errors.cliente_nombre : ''} />
                            </CardInputComponent>
                            <CardInputComponent>
                                <InputTextComponent
                                    label="Observaciones"
                                    placeHolder="Observaciones del equipo"
                                    values={values.observaciones}
                                    onChangeText={handleChange('observaciones')}
                                    onBlur={handleBlur('observaciones')}
                                    error={touched.observaciones && errors.observaciones ? errors.observaciones : ''} />
                            </CardInputComponent>
                            <CardInputComponent>
                                <InputTextComponent
                                    label="Tipo de Equipo"
                                    placeHolder="(PC, Laptop, Impresora)"
                                    values={values.tipo}
                                    onChangeText={handleChange('tipo')}
                                    onBlur={handleBlur('tipo')}
                                    error={touched.tipo && errors.tipo ? errors.tipo : ''} />
                            </CardInputComponent>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }}>
                                <ButtomComponent
                                    style={{ backgroundColor: colors.primary, width: 150, alignSelf: 'center', marginTop: 15 }}
                                    IconName='checkmark'
                                    text='GUARDAR'
                                    onPress={handleSubmit}
                                    isLoading={isLoading}
                                />
                                <View style={{ padding: 5 }} />
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
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});