import { Pressable, Text } from "react-native";
import { Modal, Portal } from "react-native-paper"
import { ButtomComponent } from "./ButtomComponent";

interface Props {
    visible: boolean,
    hideModal?: () => void;
    texto?: string;
}

export const ModalComponent = ({ visible, hideModal, texto }: Props) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: '80%', marginTop: 50, marginBottom: 50, marginLeft: 50, borderRadius: 40 }} style={{ height: '70%' }}>
                <Text>{texto}</Text>
            </Modal>
        </Portal>
    )
}
