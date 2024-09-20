import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: colors.white_ice,
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.gray_light,

    },
    label: {
        marginLeft: 5,
        color: colors.gray_dark,
    }
})

export default styles;
