import { StyleProp, View, ViewStyle } from 'react-native'
import { colors } from '../../../config/theme/theme'
import { Children, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    style?: StyleProp<ViewStyle>;
}

export const CardInputComponent = ({ children, style }: Props) => {
    return (
        <View style={[{
            backgroundColor: colors.cardBackground,
            borderRadius: 10,
            padding: 10,
            width: 370,
            height: 100,
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
        }, style]}
        >
            {children}
        </View>

    )
}

