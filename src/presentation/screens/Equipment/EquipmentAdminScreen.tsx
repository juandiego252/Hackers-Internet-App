import { useEffect, useState } from "react";
import { CardListItemsComponent } from "../../components/ui/CardListItemsComponent"
import { EquipmentData, deleteEquipment, editEquipment, listEquipment } from "../../../services/equipmentServices";
import { FlatList, ScrollView, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../../../config/theme/theme";
import { TitleViewComponent } from "../../components/ui/TitleViewComponent";
import Toast from "react-native-toast-message";
import { date } from "yup";

interface Cliente {
  id: number;
  nombre: string;
}


interface Equipment {
  id: number;
  marca: string;
  modelo: string;
  estado: string;
  nombre_cliente: string;
  observaciones: string;
}


export const EquipmentAdminScreen = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const data = await listEquipment();
        setEquipments(data);
      } catch (error) {
        throw error
      } finally {
        setLoading(false);
      }
    }
    const fetchClientes = async () => {
      try {
        const response = await fetch('https://tesis-kphi.onrender.com/api/clientes');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        throw error
      }
    };
    fetchEquipments();
    fetchClientes();
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteEquipment(id.toString())
      Toast.show({
        type: 'success',
        text1: 'Eliminado! ✔',
        text2: 'Equipo eliminado exitosamente!',
        visibilityTime: 6000,
        position: 'top'

      })
      setEquipments(equipments.filter(equipment => equipment.id !== id));
    } catch (error) {
      console.log('Error al eliminar el equipo:' + error)
    }
  }

  const handleEdit = async (id: number, updateEquipmentData: EquipmentData) => {
    const cliente = clientes.find(c => c.nombre === updateEquipmentData.cliente_nombre);

    console.log(`Attempting to edit equipment with ID: ${id}`);
    if (!cliente) {
      console.log('No encontrado')
      return;
    }
    const updatedData: EquipmentData = {
      ...updateEquipmentData,
      id_cliente: cliente.id
    };
    try {
      await editEquipment(id.toString(), updatedData);
      Toast.show({
        type: 'success',
        text1: 'Editado Exitoso! ✔',
        text2: 'Equipo editado exitosamente!',
        visibilityTime: 6000,
        position: 'top'

      })
      console.log('Equipo editado con exito')
    } catch (error) {
      console.log('Error al editar el equipo' + error)
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f2ef' }}>
      <FlatList
        data={equipments}
        renderItem={({ item }) => (
          <CardListItemsComponent
            id={item.id}
            marca={item.marca}
            modelo={item.modelo}
            estado={item.estado}
            cliente_nombre={item.nombre_cliente}
            observaciones={item.observaciones}
            onDelete={handleDelete}
            onEdit={handleEdit} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  )
}
