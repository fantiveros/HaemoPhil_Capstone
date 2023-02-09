import { StyleSheet, Dimensions } from 'react-native'

export const customStyles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    borderRadius: 5,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  radioBtn: {
    borderColor: '#E15C63',
    borderRadius: 3,
    borderWidth: 1,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E15C63',
    fontSize: 13,
  },
  doneBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
},
  exerciseText: {
    fontSize: 13,
    color: '#808080',
    flexShrink: 1,
  },
  physicalActivityImg: {
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').width / 1.5,
    resizeMode: 'contain',
    backgroundColor: '#808080',
  },
  physicalActivityImgContainer: {
    width: Dimensions.get('window').width / 1.2,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
  },
  physicalActivityText: {
    marginTop: 5,
    flexShrink: 1,
    textAlign: 'center',
    fontSize: 13,
    paddingHorizontal: 15,
  },
})
