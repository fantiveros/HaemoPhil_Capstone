import { StyleSheet, Dimensions } from 'react-native'

const COLORS = { primary: '#E15C63', white: '#fff' }
const { width } = Dimensions.get('window')

export const customStyles = StyleSheet.create({
  customTitleContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: 20,
  },
  subTitle: {
    color: COLORS.white,
    fontSize: 12,
  },
  customBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainerMargin: {
    marginHorizontal: 25,
    marginVertical: 10,
  },
  iconMargin: {
    paddingRight: 15,
    paddingVertical: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
    paddingVertical: 5,
    alignItems: 'center',
  },
  img: {
    height: width / 8,
    width: width / 8,
    backgroundColor: '#ffeaeb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width / 4,
    marginRight: 10,
  },
  customScrollView: {
    width: '100%',
    paddingHorizontal: 25,
    paddingBottom: 25,
    marginTop: 10,
  },
  inputWithIcon: {
    flex: 1,
    paddingLeft: 15,
    paddingVertical: 2,
  },
  text: {
    fontSize: 13,
    marginLeft: 5,
    flexShrink: 1,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 3,
    alignItems: 'center',
  },
  textMainContainer: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
})
