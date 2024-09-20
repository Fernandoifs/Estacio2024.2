import { StyleSheet } from "react-native";
import { colors, font_size } from "../../constants/theme";

const styles = StyleSheet.create({
    formGroup: {
        width: '100%',
    },
    form: {
        width: '100%',
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