import { Modal, Portal } from 'react-native-paper';
import { Text, View } from 'react-native';
import { ButtomComponent } from './ButtomComponent';
import { colors } from '../../../config/theme/theme';


interface Props {
    visible: boolean,
    hideModal: () => void;
    nameData?: string;
    onPress: () => void;
}

export const ModalDeleteComponent = ({ visible, hideModal, nameData, onPress }: Props) => {


    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: '80%', marginTop: 150, marginBottom: 50, marginLeft: 40, borderRadius: 30 }} style={{ height: '55%' }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{`Estas seguro de Eliminar el equipo ${nameData} ?`}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <ButtomComponent
                        style={{ backgroundColor: colors.primary, width: 120, alignSelf: 'center', marginTop: 15 }}
                        IconName='close'
                        colorIcon={'white'}
                        text='Cancelar'
                        onPress={hideModal}
                    />
                    <View style={{ padding: 3 }} />
                    <ButtomComponent
                        style={{ backgroundColor: '#BF0000', width: 120, alignSelf: 'center', marginTop: 15 }}
                        IconName='trash'
                        colorIcon={'white'}
                        text='Eliminar'
                        onPress={onPress}
                    />
                </View>
            </Modal>
        </Portal>
    )
}
