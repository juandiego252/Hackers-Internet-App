import { StyleProp, View, ViewStyle } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../../config/theme/theme";
import { Text } from "react-native";

interface Props {
    IconName: string,
    text: string,
    buttonColor?: string | undefined;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    isLoading?: boolean;
    colorIcon?: string;
    colorIsloading?: string
}



export const ButtomComponent = ({ IconName, text, buttonColor, onPress, style, isLoading, colorIcon = colors.secondary, colorIsloading = 'white' }: Props) => {
    return (
        <Button mode="text" buttonColor={buttonColor} style={style} onPress={onPress} disabled={isLoading}>
            {
                isLoading ? (
                    <ActivityIndicator color={colorIsloading} />
                ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name={IconName} color={colorIcon} size={16} style={{ marginRight: 5 }} />
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{text}</Text>
                    </View>

                )
            }
        </Button>
    )
}
