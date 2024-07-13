import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { ButtomComponent } from "./ButtomComponent";
import { colors } from "../../../config/theme/theme";
import { CardInputComponent } from "./CardInputComponent";
import { InputTextComponent } from "./InputTextComponent";
import * as Yup from 'yup';
import { Formik } from "formik";
import { EquipmentData } from "../../../services/equipmentServices";
import { Picker } from "@react-native-picker/picker";

interface Props {
    visible: boolean,
    hideModal: () => void;
    nameData?: string;
    onPress: (values: EquipmentData) => void;
    equipmentData?: EquipmentData;
}

const validationSchema = Yup.object().shape({
    marca: Yup.string().required('Marca es obligatorio'),
    modelo: Yup.string().required('Modelo es obligatorio'),
    estado: Yup.string().required('Estado es Obligatorio'),
    cliente_nombre: Yup.string().required('Nombre del Cliente obligatorio'),
    observaciones: Yup.string().required('Observaciones necesarias')
});

export const ModalEditComponent = ({ visible, hideModal, onPress, nameData, equipmentData }: Props) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: '80%', marginTop: 58, marginBottom: 50, marginLeft: 44, borderRadius: 30 }}>
                <ScrollView style={{ alignSelf: 'center', width: '100%', height: '100%' }}>
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>{`Editar Equipo ${nameData}`}</Text>
                    <View>
                        <Formik
                            initialValues={equipmentData || {
                                marca: "",
                                modelo: "",
                                estado: "",
                                cliente_nombre: "",
                                observaciones: "", // 
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                onPress(values);
                                hideModal();
                                console.log(values)
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                                <View>
                                    <CardInputComponent style={{ width: 270 }}>
                                        <InputTextComponent
                                            label='Marca'
                                            placeHolder="Marca del equipo"
                                            style={{ width: 250 }}
                                            values={values.marca}
                                            onChangeText={handleChange('marca')}
                                            onBlur={handleBlur('marca')}
                                            error={touched.marca && errors.marca ? errors.marca : ''}
                                        />
                                    </CardInputComponent>
                                    <CardInputComponent style={{ width: 270 }}>
                                        <InputTextComponent
                                            label="Modelo"
                                            placeHolder="Modelo del equipo"
                                            style={{ width: 250 }}
                                            values={values.modelo}
                                            onChangeText={handleChange('modelo')}
                                            onBlur={handleBlur('modelo')}
                                            error={touched.modelo && errors.modelo ? errors.modelo : ''}
                                        />
                                    </CardInputComponent>
                                    <CardInputComponent style={{ width: 270 }}>
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={values.estado}
                                                onValueChange={(itemValue) => setFieldValue('estado', itemValue)}
                                                style={styles.picker}
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
                                    <CardInputComponent style={{ width: 270, backgroundColor: '#c7c7c7' }}>
                                        <InputTextComponent
                                            label="Cliente"
                                            placeHolder="Nombre del Cliente"
                                            style={{ width: 250 }}
                                            editable={false}
                                            values={values.cliente_nombre}
                                            onChangeText={handleChange('nombre_cliente')}
                                            onBlur={handleBlur('nombre_cliente')}
                                            error={touched.cliente_nombre && errors.cliente_nombre ? errors.cliente_nombre : ''}
                                        />
                                    </CardInputComponent>
                                    <CardInputComponent style={{ width: 270 }}>
                                        <InputTextComponent
                                            label="Observaciones"
                                            placeHolder="Observaciones"
                                            style={{ width: 250 }}
                                            values={values.observaciones}
                                            onChangeText={handleChange('observaciones')}
                                            onBlur={handleBlur('observaciones')}
                                            error={touched.observaciones && errors.observaciones ? errors.observaciones : ''}
                                        />
                                    </CardInputComponent>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <ButtomComponent
                                            style={{ backgroundColor: '#20be00', width: 120, alignSelf: 'center', marginTop: 15 }}
                                            IconName='checkmark'
                                            colorIcon={'white'}
                                            text='Guardar'
                                            onPress={handleSubmit}
                                        />
                                        <View style={{ padding: 3 }}></View>
                                        <ButtomComponent
                                            style={{ backgroundColor: colors.primary, width: 120, alignSelf: 'center', marginTop: 15 }}
                                            IconName='close'
                                            colorIcon={'white'}
                                            text='Cancelar'
                                            onPress={hideModal}
                                        />
                                        <View style={{ padding: 3 }} />
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </Modal>
        </Portal>
    );
}

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