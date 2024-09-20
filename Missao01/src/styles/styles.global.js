import { StyleSheet } from 'react-native';
import { colors, font_size } from '../constants/theme';

const globalStyle = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: font_size.big,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
});

export default globalStyle;
