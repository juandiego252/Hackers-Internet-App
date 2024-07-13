import { View, Text } from "react-native"
import { colors } from "../../../config/theme/theme"

interface Props {
    text: string;
}

export const TitleViewComponent = ({ text }: Props) => {
    return (
        <View style={{ backgroundColor: colors.secondary, alignItems: 'center', height: 43, borderRadius: 10 }}>
            <Text style={{ marginTop: 10, fontSize: 20, color: 'black', fontWeight: 'bold', alignItems: 'center' }}>{text}</Text>
        </View>
    )
}
