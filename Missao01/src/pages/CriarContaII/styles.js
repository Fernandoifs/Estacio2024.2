import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

const styles = StyleSheet.create({
    formGroup: {
        width: '100%',
    },
    form: {
        width: '100%',
        marginBottom: 20
    },
    formHorizontal: {
        flexDirection: 'row'
    },
    form70: {
        width: '70%',
        marginBottom: 20,
        paddingRight: 10
    },
    form30: {
        width: '30%',
        marginBottom: 20
    },
    footer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        marginBottom: 50
    },
    footerText: {
        alignItems: 'center',
        color: colors.gray_dark
    }
})
export default styles;