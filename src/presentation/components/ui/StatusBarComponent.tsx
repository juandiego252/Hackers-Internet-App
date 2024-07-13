import { Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../../config/theme/theme";
import { useState } from "react";

type Status = 'Ingresado' | 'En espera' | 'En Mantenimiento' | 'Listo' | 'Entregado';

interface StatusInfo {
    color: string;
    icon: string;
}

interface Props {
    status: Status;
    onStatusChange: (Status: Status) => void;
}


const STATUS_INFO: Record<Status, StatusInfo> = {
    Ingresado: { color: '#3498db', icon: 'arrow-redo-circle' },
    'En espera': { color: '#f1c40f', icon: 'alarm' },
    'En Mantenimiento': { color: '#e67e22', icon: 'build' },
    Listo: { color: '#2ecc71', icon: 'checkbox' },
    Entregado: { color: '#9b59b6', icon: 'rocket' },
};

export const StatusBarComponent = ({ status, onStatusChange }: Props) => {
    const [activeStatus, setActiveStatus] = useState<Status>(status);
    const handleStatusChange = (key: Status) => {
        setActiveStatus(key);
        onStatusChange(key);
    };

    return (
        <View style={styles.container}>
            {Object.keys(STATUS_INFO).map((key) => {
                const { color, icon } = STATUS_INFO[key as Status];
                const isActive = key === activeStatus

                return (
                    <TouchableOpacity key={key} style={[styles.statusItem, isActive && styles.activeStatus]} onPress={() => handleStatusChange(key as Status)}>
                        <Icon name={icon} size={30} color={color} />
                        <Text style={[styles.statusText, { color }]}>{key}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        margin: 10,
    },
    statusItem: {
        alignItems: 'center',
    },
    statusText: {
        fontSize: 12,
        marginTop: 5,
    },
    activeStatus: {
        borderBottomWidth: 2,
        borderBottomColor: '#8d8d8d',
    },
});