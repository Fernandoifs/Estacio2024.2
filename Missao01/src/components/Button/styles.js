import { StyleSheet } from "react-native";
import  {colors, font_size} from '../../constants/theme'

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20
    },
    btn: {
        width: '100%',
        backgroundColor: colors.green_water,
        borderRadius: 6,
        marginTop: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: font_size.medio,
        color: colors.white,
        padding: 15
    }
});
export default styles;