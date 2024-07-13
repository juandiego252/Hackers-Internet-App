import React from 'react'
import { ActivityIndicator, Button, Text } from 'react-native-paper'
import { globalStyles } from '../../../config/theme/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import { Animated, StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  text: string,
  mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  onPress?: () => void;
  isLoading?: boolean;
}

export const ButtomComponentLogin = ({ text, mode, onPress, isLoading }: Props) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={globalStyles.btnPrimary}
      contentStyle={{ height: 40 }}
    >
      {
        isLoading ? (
          <ActivityIndicator color='white' />
        ) : (
          <Text style={{ color: 'white', fontWeight: 'bold', }}>{text}</Text>
        )
      }
    </Button>
  )
}
