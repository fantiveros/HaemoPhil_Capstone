import { StyleSheet } from 'react-native'

export const inputSelectStyles = StyleSheet.create({
  inputLbl: {
    color: '#E15C63',
    fontSize: 12,
  },
  inputMargin: {
    marginTop: 15,
    marginBottom: 10,
  },
  radioInput: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    height: 40,
    width: '100%',
    borderColor: '#E15C63',
    borderWidth: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: 'transparent',
  },
  radioContainer: {
    borderColor: '#E15C63',
    borderRadius: 20,
    borderWidth: 1,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  customIcon: {
    backgroundColor: '#E15C64',
    borderRadius: 15,
    height: 15,
    width: 15,
  },
})
