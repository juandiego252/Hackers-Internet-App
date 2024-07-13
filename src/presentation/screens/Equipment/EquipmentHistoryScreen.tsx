import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Button } from 'react-native-paper'
import DatePicker from 'react-native-date-picker';
import { colors } from '../../../config/theme/theme';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ButtomComponent } from '../../components/ui/ButtomComponent';
import { CardComponent } from '../../components/ui/CardComponent';
import { EquipmentMaintenance } from '../../../services/equipmentServices';
import { TitleComponent } from '../../components/ui/TitleComponent';


interface Maintenance {
  id_unico: number;
  id_equipo: string;
  descripcion: string;
  fecha: string;
  estado_actual: string;
  marca: string;
  modelo: string;
  nombre_cliente: string;
  telefono: string
}





export const EquipmentHistoryScreen = () => {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [filteredMaintenances, setFilteredMaintenances] = useState<Maintenance[]>([]);


  const FilterDate = useCallback(() => {
    setIsLoading(true);
    const startDate = new Date(dateStart.setHours(0, 0, 0, 0));
    const endDate = new Date(dateEnd.setHours(23, 59, 59, 999));

    setTimeout(() => {
      const filteredData = maintenances.filter((maintenance) => {
        const maintenanceDate = new Date(maintenance.fecha);
        return maintenanceDate >= startDate && maintenanceDate <= endDate;
      })
      setFilteredMaintenances(filteredData);
      setIsLoading(false);
    }, 500);
  }, [dateStart, dateEnd, maintenances]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await EquipmentMaintenance();
        setMaintenances(data);
        setFilteredMaintenances(data);
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    FilterDate();
  }, [FilterDate]);

  const renderEquipmentItem = ({ item }: { item: Maintenance }) => (
    <View style={styles.equipmentItem}>
      <Text>Equipo: {item.id_equipo}</Text>
      <Text>Descripción: {item.descripcion}</Text>
      <Text>Fecha: {item.fecha}</Text>
      <Text>Estado: {item.estado_actual}</Text>
      <Text>Marca: {item.marca}</Text>
      <Text>Modelo: {item.modelo}</Text>
      <Text>Cliente: {item.nombre_cliente}</Text>
      <Text>Teléfono: {item.telefono}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TitleComponent title='Regresar'/>
      <CardComponent style={styles.cardContainer}>
        <View style={styles.columnContainer}>
          <ButtomComponent
            text='Fecha Inicio'
            IconName='calendar'
            onPress={() => setOpenStart(true)}
            buttonColor={colors.primary}
            style={styles.button}
          />
          <Text style={styles.dateText}>{formatDate(dateStart)}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.columnContainer}>
          <ButtomComponent
            text='Fecha Fin'
            IconName='calendar-number'
            onPress={() => setOpenEnd(true)}
            buttonColor={colors.primary}
            style={styles.button}
          />
          <Text style={styles.dateText}>{formatDate(dateEnd)}</Text>
        </View>
      </CardComponent>

      <CardComponent style={styles.cardContainer_2}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={colors.primary} />
        ) : (
          <FlatList
            data={filteredMaintenances}
            renderItem={renderEquipmentItem}
            keyExtractor={item => item.id_unico.toString()}
            style={styles.flatList}
          />
        )}
      </CardComponent>

      <DatePicker
        modal
        open={openStart}
        date={dateStart}
        mode="date"
        onConfirm={(date) => {
          setOpenStart(false);
          setDateStart(date);
        }}
        onCancel={() => setOpenStart(false)}
      />
      <DatePicker
        modal
        open={openEnd}
        date={dateEnd}
        mode="date"
        onConfirm={(date) => {
          setOpenEnd(false);
          setDateEnd(date);
        }}
        onCancel={() => setOpenEnd(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    paddingTop: 50,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    width: 350,
    height: 200,
    marginBottom: 20,
  },
  cardContainer_2: {
    padding: 20,
    width: 350,
    height: 450,
  },
  columnContainer: {
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 40,
    marginBottom: 10,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: colors.primary,
    marginHorizontal: 10,
  },
  dateText: {
    textAlign: 'center',
    marginTop: 10,
  },
  flatList: {
    width: '100%',
  },
  equipmentItem: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});