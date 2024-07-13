import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native"
import { colors } from "../../../config/theme/theme";

interface Props extends PropsWithChildren {
    style?: StyleProp<ViewStyle>;
}
export const CardComponent = ({ style, children }: Props) => {
    return (
        <View style={[
            {
                backgroundColor: colors.cardBackground,
                borderRadius: 10,
                padding: 10,
                width: 378,
                height: 220,
                alignSelf: 'center',
                marginTop: 15,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 10
                },
                shadowOpacity: 0.24,
                shadowRadius: 7,
                elevation: 9,
                marginBottom: 10
            },
            style
        ]}>
            {
                children
            }
        </View>
    )
}