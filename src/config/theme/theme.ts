import { StyleSheet } from "react-native";

export interface ThemeColors {
    primary: string,
    secondary: string,
    text: string,
    background: string;
    cardBackground: string;
    buttonTextColor: string;
}


export const colors: ThemeColors = {
    primary: '#3E4452',
    secondary: '#3ACDA0',
    text: 'black',
    background: '#FEFEF8',
    cardBackground: 'white',
    buttonTextColor: 'white'
}

export const globalStyles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.text
    },
    subtitle: {
        fontSize: 20,
        // fontWeight: "bold",
        color: colors.text
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
        color: colors.text,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    globalMargin: {
        paddingHorizontal: 20,
        flex: 1,
    },

    btnPrimary: {
        backgroundColor: colors.primary,
        borderRadius: 40,
        padding: 10,
        width: 300,
        height: 'auto'
        // alignItems: "center",
    },
    btnPrimaryText: {
        color: colors.text,
        fontSize: 16,
    },
    logo: {
        height: 180,
        width: 250,
        marginTop: -320
    }
    

})