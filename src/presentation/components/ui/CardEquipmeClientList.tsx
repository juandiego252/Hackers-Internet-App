import React from 'react';
import { Text, View } from 'react-native';
import { CardComponent } from './CardComponent';
import { TitleViewComponent } from './TitleViewComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../config/theme/theme';

interface Props {
    id: string;
    marca: string;
    modelo: string;
    estado: string;
    observaciones: string;
}


export const CardEquipmeClientList = ({ id, estado, marca, modelo, observaciones }: Props) => {
    return (
        <View>
            <CardComponent style={{ width: 340, marginBottom: 20 }}>
                <TitleViewComponent text={`${id}`} />
                <Icon name='desktop-sharp' size={70} style={{ marginTop: 25, alignSelf: 'flex-start' }} color={colors.primary} />
                <View style={{ paddingLeft: 80, marginTop: -70, flex: 1 }}>
                    <Text style={{ color: 'black' }}>{`Marca: ${marca}`}</Text>
                    <Text style={{ color: 'black' }}>{`Modelo: ${modelo}`}</Text>
                    <Text style={{ color: 'black' }}>{`Estado: ${estado}`}</Text>
                    <Text style={{ color: 'black' }}>{`Observaciones: ${observaciones}`}</Text>
                </View>
            </CardComponent>
        </View>
    )
}
