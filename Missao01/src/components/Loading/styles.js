import { StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    width: 250,
    height: 4,
    borderRadius: 30, 
    backgroundColor: 'rgba(0,0,0,0.2)',
    overflow: 'hidden',
    position: 'relative',
  },
  loaderBar: {
    width: '0%', 
    height: '100%',
    backgroundColor: colors.blue,
    borderRadius: 30,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default styles;