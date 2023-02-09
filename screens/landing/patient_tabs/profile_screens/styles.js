import { StyleSheet, Dimensions } from 'react-native'

export const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 30,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#f4efef',
  },
  mainContainer: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  submitButton: {
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
    backgroundColor: '#E15C63',
    color: '#fff',
  },
  transparentBtn: {
    marginTop: 20,
    borderWidth: 4,
    borderRadius: 10,
    height: 45,
    borderColor: '#E15C63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  customPhotoContainer: {
    borderRadius: 10,
    backgroundColor: '#fff7f7',
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').width * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImg: {
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').width * 0.75,
  },
})
