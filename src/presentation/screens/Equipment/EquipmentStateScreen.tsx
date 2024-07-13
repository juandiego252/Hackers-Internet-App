import { FlatList, ScrollView, Text, View } from 'react-native'
import { StatusBarComponent } from '../../components/ui/StatusBarComponent'
import { CardComponent } from '../../components/ui/CardComponent'
import { useEffect, useState } from 'react'
import { findEquipmentStatus } from '../../../services/equipmentServices';
import { CardListItemsComponent } from '../../components/ui/CardListItemsComponent';
import { CardEquimentSearchComponent } from '../../components/ui/CardEquimentSearchComponent';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { colors } from '../../../config/theme/theme';
import { ActivityIndicator } from 'react-native-paper';

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


type Status = 'Ingresado' | 'En espera' | 'En Mantenimiento' | 'Listo' | 'Entregado';

export const EquipmentStateScreen = () => {
  const [status, setstatus] = useState<Status>('Ingresado');
  const [equipments, setequipments] = useState<any[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEquipments = async () => {
      setIsLoading(true);
      try {
        const data = await findEquipmentStatus(status);
        const updatedEquipments = data.map((equipment: Equipment) => {
          const cliente = clientes.find(c => c.id === equipment.id_cliente);
          return {
            ...equipment,
            nombre_cliente: cliente ? cliente.nombre : 'Cliente no registrado',
          };
        });
        setequipments(updatedEquipments);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEquipments();
  }, [status])


  useEffect(() => {
    fetch('https://tesis-kphi.onrender.com/api/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al obtener los clientes', error))
  }, [])

  const handleStatusChange = (newStatus: 'Ingresado' | 'En espera' | 'En Mantenimiento' | 'Listo' | 'Entregado') => {
    setstatus(newStatus);
  }

  return (
    <View style={{ flex: 1 }}>
      <CardComponent style={{ height: 120, width: 350 }}>
        <StatusBarComponent status='Listo' onStatusChange={handleStatusChange} />
      </CardComponent>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        ) : (
          <CardComponent style={{ height: 672 }}>
            <FlatList
              data={equipments}
              renderItem={({ item }) => (
                <CardEquimentSearchComponent
                  estado={item.estado}
                  marca={item.marca}
                  modelo={item.modelo}
                  nombre_cliente={item.nombre_cliente || ''}
                  observaciones={item.observaciones}
                  id={item.id}
                />
              )}
              keyExtractor={Item => Item.id}
            />
          </CardComponent>
        )}
        <View style={{ marginBottom: 1, marginTop: 20 }} />
      </View>
    </View>
  )
}
