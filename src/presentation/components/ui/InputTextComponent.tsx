import React, { useState } from 'react'
import { KeyboardTypeOptions, StyleProp, TextStyle } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper'
import { colors } from '../../../config/theme/theme';

interface Props {
    placeHolder: string;
    label: string;
    secureTextEntry?: boolean;
    style?: StyleProp<TextStyle>;
    keyboardtype?: KeyboardTypeOptions;
    values?: string;
    onChangeText?: (text: string) => void;
    onBlur?: (e: any) => void;
    error?: string;
    editable?: boolean;
}


export const InputTextComponent = ({ label, placeHolder, secureTextEntry = false, style, keyboardtype, values, onChangeText, onBlur, error, editable = true }: Props) => {
    const [text, setText] = useState("");
    return (
        <>
            <TextInput
                mode='flat'
                label={label}
                value={values}
                onChangeText={onChangeText}
                placeholder={placeHolder}
                style={style}
                outlineColor='gray'
                activeOutlineColor='gray'
                contentStyle={{ backgroundColor: colors.cardBackground }}
                activeUnderlineColor='#3ACDA0'
                textColor='#3E4452'
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardtype}
                onBlur={onBlur}
                editable={editable}
            />
            {
                error ? (
                    <HelperText type="error" visible={Boolean(error)}>
                        {error}
                    </HelperText>
                ) : null
            }
        </>
    );
}
