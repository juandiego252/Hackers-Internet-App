import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { useClientStore } from '../../../store/clientStore'
import { FlatList } from 'react-native-gesture-handler';
import { listEquipmentClient } from '../../../services/equipmentServices';
import { CardListItemsComponent } from '../../components/ui/CardListItemsComponent';
import { CardEquipmeClientList } from '../../components/ui/CardEquipmeClientList';

interface Equipment {
  id: string;
  marca: string;
  modelo: string;
  estado: string;
  observaciones: string;
}

export const EquipmentStateClientScreen = () => {
  const clientData = useClientStore(state => state.clientData);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  useEffect(() => {
    const fetchEquipmentsClient = async () => {
      try {
        const data = await listEquipmentClient(clientData?.id);
        setEquipments(data);
      } catch (error) {
        console.log('Error fetching equipments')
      }
    }
    fetchEquipmentsClient();
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f2ef' }}>
      <FlatList
        data={equipments}
        renderItem={({ item }) => (
          <CardEquipmeClientList
            id={item.id}
            estado={item.estado}
            marca={item.marca}
            modelo={item.modelo}
            observaciones={item.observaciones}
          />
        )}
      />
    </View>
  )
}
