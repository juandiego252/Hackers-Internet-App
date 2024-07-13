import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../../config/theme/theme";
import { ButtomMenu } from "./ButtomMenu";
import { CardComponent } from "./CardComponent";
import { TitleViewComponent } from "./TitleViewComponent";
import { useState } from "react";
import { ModalDeleteComponent } from "./ModalDeleteComponent";
import { ModalEditComponent } from "./ModalEditComponent";
import { EquipmentData } from "../../../services/equipmentServices";


interface Props {
    id: number;
    marca: string
    modelo: string;
    estado: string;
    cliente_nombre: string;
    observaciones: string;
    onDelete: (id: number) => void;
    onEdit: (id: number, data: EquipmentData) => void;

}




export const CardListItemsComponent = ({ id, marca, modelo, estado, cliente_nombre, observaciones, onDelete, onEdit }: Props) => {
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    const showModalDelete = () => setDeleteVisible(true);
    const hideModalDelete = () => setDeleteVisible(false);

    const showModalEdit = () => setEditVisible(true);
    const hideModalEdit = () => setEditVisible(false);
    return (
        <View style={{ marginBottom: 10 }}>
            <CardComponent>
                <TitleViewComponent text={`${marca}`} />
                <Icon name='tv-outline' size={70} style={{ marginTop: 25, alignSelf: 'flex-start' }} color={colors.primary} />
                <View style={{ paddingLeft: 80, marginTop: -70, flex: 1 }}>
                    <Text style={{ color: 'black' }}>{`Modelo: ${modelo}`}</Text>
                    <Text style={{ color: 'black' }}>{`Estado: ${estado}`}</Text>
                    <Text style={{ color: 'black' }}>{`Cliente: ${cliente_nombre}`}</Text>
                    <Text style={{ color: 'black' }}>{`Observacion: ${observaciones}`}</Text>
                    <View style={{ marginBottom: 20 }} />
                    <View style={{ width: 50, marginLeft: -80, marginTop: -10, flexDirection: 'row' }}>
                        <ButtomMenu text='Editar' IconName='create' onPress={showModalEdit} />
                        <View style={{ padding: 3 }} />
                        <ButtomMenu text='Eliminar' IconName='trash' onPress={showModalDelete} />
                    </View>
                </View>
            </CardComponent>
            <ModalEditComponent visible={editVisible} hideModal={hideModalEdit} nameData={modelo} onPress={(updateData) => onEdit(id, updateData)}
                equipmentData={{
                    marca,
                    modelo,
                    cliente_nombre,
                    estado,
                    observaciones
                }} />
            <ModalDeleteComponent visible={deleteVisible} hideModal={hideModalDelete} nameData={modelo} onPress={() => onDelete(id)} />
        </View>
    )
}
