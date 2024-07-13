import { View, Text } from "react-native"
import { Button } from "react-native-paper"
import { colors } from "../../../config/theme/theme"
import Icon from "react-native-vector-icons/Ionicons"

interface Props {
    IconName: string,
    text: string,
    buttonColor?: string | undefined;
    onPress?: () => void;
}

export const ButtomMenu = ({ IconName, text, buttonColor = colors.primary, onPress }: Props) => {
    return (
        <Button  mode="text" buttonColor={buttonColor} style={{ width: 110, alignSelf: 'center', marginTop: 3 }} onPress={onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name={IconName} color={colors.secondary} size={16} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>{text}</Text>
            </View>
        </Button>
    )
}
