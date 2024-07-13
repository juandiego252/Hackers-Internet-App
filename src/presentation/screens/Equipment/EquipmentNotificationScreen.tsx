import { useEffect, useState } from "react";
import { Linking, Text, View } from "react-native";
import { editEquipment, editEquipmentNotify, listEquipment, listEquipmentToNotify, notifyEquipment } from "../../../services/equipmentServices";
import { ActivityIndicator, Button } from "react-native-paper";
import { FlatList } from "react-native";
import { CardEquipmentNotify } from "../../components/ui/CardEquipmentNotify";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { colors } from "../../../config/theme/theme";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";

interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
}


interface Equipment {
  id: string;
  marca: string;
  modelo: string;
  estado: string;
  id_cliente: number;
  observaciones: string;
  tipo: string;
}

export const EquipmentNotificationScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  useEffect(() => {
    fetch('https://tesis-kphi.onrender.com/api/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al obtener los clientes', error))
  }, [])

  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifying, setNotifying] = useState(false);

  useEffect(() => {
    const getEquipments = async () => {
      try {
        const data = await listEquipment();
        setEquipments(data);
      } catch (error) {
        console.error('Error al obtener los equipos:', error);
      } finally {
        setLoading(false);
      }
    };
    getEquipments();
  }, []);

  const handleSelectEquipment = (id: string) => {
    setSelectedEquipments((prevState) =>
      prevState.includes(id)
        ? prevState.filter((equipmentId) => equipmentId !== id)
        : [...prevState, id]
    );
  };

  const handleNotify = async () => {
    setNotifying(true);
    try {
      for (const id_equipo of selectedEquipments) {
        const equipment = equipments.find((eq) => eq.id === id_equipo);
        if (equipment) {
          await notifyEquipment(id_equipo);
          // await editEquipmentNotify(id_equipo, {
          //   marca: equipment.marca,
          //   modelo: equipment.modelo,
          //   estado: 'notificado',
          //   id_cliente: equipment.id_cliente,
          //   observaciones: equipment.observaciones,
          //   tipo: equipment.tipo,
          // })
        }

      }
      Toast.show({
        type: 'success',
        text1: 'Notificacion Exitosa ! ✔ 🔔',
        text2: 'Notificacion enviada con exito al cliente',
        visibilityTime: 6000,
        position: 'top'
      })
      console.log('Notificación enviada correctamente');
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
    } finally {
      setNotifying(false);
    }
  };

  const handleContact = (id_cliente: number) => {
    const cliente = clientes.find((cl) => cl.id === id_cliente);
    if (cliente && cliente.telefono) {
      const whatsappUrl = `https://wa.me/593${cliente.telefono}`;
      Linking.openURL(whatsappUrl).catch((err) => console.error('Error al abrir WhatsApp', err));
    } else {
      console.error('Cliente o teléfono no encontrado');
    }
  };

  if (loading) {
    return <ActivityIndicator animating={true} size="large" color="black" />;
  }

  if (loading) {
    return <ActivityIndicator animating={true} size="large" color="black" />;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={equipments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardEquipmentNotify id={item.id} estado={item.estado} marca={item.marca} modelo={item.modelo}>
            <BouncyCheckbox
              style={{ marginTop: 10 }}
              size={25}
              fillColor={colors.primary}
              unFillColor="#FFFFFF"
              text="Notificar"
              textStyle={{
                color: selectedEquipments.includes(item.id) ? 'green' : 'black',
                textDecorationStyle: 'dashed',
                textDecorationLine: selectedEquipments.includes(item.id) ? 'underline' : 'line-through'
              }}
              iconStyle={{ borderColor: 'green' }}
              innerIconStyle={{ borderWidth: 2 }}
              onPress={() => handleSelectEquipment(item.id)}
            />
            <View style={{ flex: 1, alignItems: 'flex-end', marginTop: -30 }}>
              <Button
                icon={() => <Icon name="logo-whatsapp" color={colors.secondary} size={15} />}
                mode="contained"
                buttonColor={colors.primary}
                style={{ width: 114, height: 38, marginLeft: 130 }}
                onPress={() => handleContact(item.id_cliente)}
              >
                Contactar
              </Button>
            </View>
          </CardEquipmentNotify>
        )}
      />
      <View style={{ marginTop: 30 }} />
      <Button
        icon={() => <Icon name="notifications-outline" color={colors.secondary} size={15} />}
        mode="contained"
        onPress={handleNotify}
        loading={notifying}
        disabled={notifying || selectedEquipments.length === 0}
        buttonColor={colors.primary}
        style={{ height: 40 }}
      >
        Notificar
      </Button>
    </View>
  );
};
