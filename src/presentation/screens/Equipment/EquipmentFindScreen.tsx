import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { CardInputComponent } from '../../components/ui/CardInputComponent';
import { colors } from '../../../config/theme/theme';
import { InputTextComponent } from '../../components/ui/InputTextComponent';
import { ButtomComponent } from '../../components/ui/ButtomComponent';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { CardEquimentSearchComponent } from '../../components/ui/CardEquimentSearchComponent';
import { findEquipment } from '../../../services/equipmentServices';
import { TitleComponent } from '../../components/ui/TitleComponent';

interface Cliente {
  id: number;
  nombre: string;
}

interface Equipment {
  id: string;
  marca: string;
  modelo: string;
  estado: string;
  id_cliente: number;
  nombre_cliente?: string;
  observaciones: string;
}

const validationSchema = Yup.object().shape({
  id: Yup.string().required('Debes introducir el código de registro para buscar el equipo').length(9, 'El código de registro no es válido'),
});

export const EquipmentFindScreen = () => {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  useEffect(() => {
    fetch('https://tesis-kphi.onrender.com/api/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al obtener los clientes', error))
  }, [])

  const handleSubmit = async (values: { id: string }) => {
    setIsLoading(true)
    try {
      const data = await findEquipment(values.id);
      if (data) {
        const cliente = clientes.find(c => c.id === data.id_cliente);
        if (cliente) {
          data.nombre_cliente = cliente.nombre;
        }
        setEquipment(data);
      }
      console.log(data)
    } catch (error) {
      console.error('Error al buscar el equipo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignSelf: 'center', marginTop: 60 }}>
      <TitleComponent title='Regresar'/>
      <CardInputComponent style={{ height: 250 }}>
        <View>
          <Text style={{ fontSize: 18, alignSelf: 'center', color: 'black', marginTop: 15 }}>
            Introduce el código de registro del equipo
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Formik
            initialValues={{ id: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <InputTextComponent
                  label='Código'
                  placeHolder='Código de Registro'
                  values={values.id}
                  onChangeText={handleChange('id')}
                  onBlur={handleBlur('id')}
                  error={touched.id && errors.id ? errors.id : ''}
                />
                <View style={{ alignSelf: 'center', marginTop: 20, flexDirection: 'row' }}>
                  <ButtomComponent
                    text='Buscar'
                    IconName='search'
                    buttonColor={colors.primary}
                    style={{ width: 120 }}
                    onPress={handleSubmit}
                    isLoading={isLoading}
                    colorIsloading='black'
                  />
                  <View style={{ padding: 5 }} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </CardInputComponent>
      <View style={{ marginTop: 10 }}>
        <ScrollView>
          {equipment && (
            <CardInputComponent style={{ borderRadius: 5, width: 360, height: 300, backgroundColor: '#e6e6e6', marginBottom: 20 }}>
              <CardEquimentSearchComponent
                id={equipment.id}
                marca={equipment.marca}
                modelo={equipment.modelo}
                estado={equipment.estado}
                nombre_cliente={equipment.nombre_cliente || ''}
                observaciones={equipment.observaciones}
              />
            </CardInputComponent>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
