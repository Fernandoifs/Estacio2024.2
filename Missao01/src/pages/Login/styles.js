import { StyleSheet } from 'react-native';
import { colors, font_size } from '../../constants/theme';

const styles = StyleSheet.create({
    viewImage: {
        paddingBottom: 40,
    },
    logo: {
        alignSelf: 'center',
        width: 150,
        height: 100,
    },
    titulo: {
        textAlign: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    forgotPassword: {
        color: colors.blue_dark,
        marginBottom: 20,
        textAlign: 'right',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signupText: {
        color: colors.blue_dark,
        marginLeft: 5,
    },
});
export default styles;