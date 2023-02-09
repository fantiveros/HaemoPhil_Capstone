import { StyleSheet, Dimensions } from 'react-native'
const COLORS = { primary: '#E15C63', white: '#FFF', link: '#739af7', scroll: '#f4efef' }
const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  scrollView: {
    width: '80%',
    backgroundColor: COLORS.scroll,
    paddingBottom: 500,
  },
  mainBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imgInnerContainer: {
    width: width / 3,
    height: width / 3,
    borderRadius: width / 3,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: width / 3,
    height: width / 3,
    borderRadius: width / 3,
  },
  uploadedImg: {
    width: width,
    height: width / 3,
    resizeMode: 'contain',
  },
  displayImg: {
    width: width / 2,
    height: width / 2,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  uploadIcon: {
    width: width / 10,
    height: width / 10,
    resizeMode: 'contain',
  },
  imgIcon: {
    color: COLORS.primary,
  },
  uploadImgContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 10,
  },
  uploadImgBtn: {
    width: '100%',
    height: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBtnText: {
    color: COLORS.link,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: '500',
  },
  saveBtnText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 5,
  },
  descriptionText: {
    color: '#808080',
    fontSize: 15,
    fontWeight: 'normal',
    marginVertical: 5,
    flexShrink: 1, 
    maxWidth: width / 1.5,
    textAlign: 'center'
  },
  saveBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  stepsText: {
    marginTop: 20,
    fontWeight: '500',
    color: COLORS.primary,
    fontSize: 15,
  },
  input: {
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    height: 45,
    width: '100%',
    borderColor: '#E15C63',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#E15C63',
  },
  customGridContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 20,
  },
  justifyAlignCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  total: {
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 5
  },
  totalDescription: {
    flexShrink: 1, 
    textAlign: 'center',
    fontSize: 12,
    color: '#808080'
  },
  description: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5
  }
})
