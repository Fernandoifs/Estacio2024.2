import { StyleSheet } from 'react-native';
import { colors, font_size } from '../../constants/theme';

const styles = StyleSheet.create({
  item: {//todo o flatlist
    flexDirection: 'row',           
    backgroundColor: colors.green_light,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 4,
    shadowColor:'' ,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  imageItem: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 10,
    marginRight: 15
  },
  rowItem: {
    flexDirection: 'row',
  },
  dadosItem: {
    flex: 1,
  },
  nomeItem: {
    color: colors.green_water,
    fontSize: font_size.medio,
    fontWeight: 'bold',
  },
  buttonsItem: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 30,
    justifyContent: 'flex-start'
  },
  editButton: {
    backgroundColor: colors.blue,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,

  },
  deleteButton: {
    backgroundColor: colors.red,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,

  },
  buttonText: {
    color: colors.white,
    fontSize: font_size.small,
    fontWeight: 'bold',
  },
  alterButton: {
    marginBottom: 70,
  },
  emptyMessage: {
    fontSize: font_size.medio,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
