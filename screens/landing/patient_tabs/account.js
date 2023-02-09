import React, { useEffect, useState, useCallback } from "react"
import { Text, View, TouchableOpacity, ScrollView, Image, Linking, Alert } from "react-native"
import { styles } from "./../styles"
import { signOut } from "firebase/auth"
import { authen } from "../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { ToastConfig, ShowToast, GetFailedToast } from "../../common/common_config/ToastConfig"
import Toast from 'react-native-toast-message';
import { UserHematologist } from "../../common/constants/user_constants"
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { ImageViewer } from "../../common/components/imageModal"

export class Account extends React.Component {
  render() {
    return <AccountScreen user={this.props.user}/>
  }
}

const AccountScreen = ({user}) => {
  const navigation = useNavigation()
  const [authUser, setAuthUser] = useState({})
  const [profilePictureUrl, setProfilePictureUrl] = useState(undefined)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setAuthUser(authen.currentUser)
    if(user.profilePicture)
      setProfilePictureUrl(user.profilePicture)
  }, [])

  const signoutUser = () => {
    signOut(authen)
      .then((res) => {
        navigation.navigate("Signin")
        ShowToast({isCompleted: true, title: "Success", body: "You have successfully signed out."})
      })
      .catch((res) => {
        ShowToast({isCompleted: false, title: "Failed", body: "Something went wrong."})
      })
  }

  const OpenSurveyButton = ({ url }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url)

      if (supported) {
        await Linking.openURL(url)
      } else {
        Alert.alert("Can't open survey form at the moment.")
      }
    }, [url])

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.mainBtn,
          { borderRadius: 0, padding: 10, marginTop: 15 },
        ]}>
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>
          SURVEY FORM
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView
      style={{ width: "100%", backgroundColor: "#FFF" }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={{ padding: 30 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={profilePictureUrl 
              ? { uri: profilePictureUrl } 
              : require("../../../icons/user.png")}
            style={styles.accountImg}/>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#E15C63" }}>
            {authUser.email}
          </Text>
          <Text style={{ fontSize: 14, color: "#E15C63" }}>
            {user.name}
          </Text>
          {user.licenseUri && user.user_type === UserHematologist && <TouchableOpacity 
            style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}} 
            onPress={() => setIsVisible(true)}>
              <AwesomeIcon name='id-card-o' size={20} color={'#E15C63'}/>
              <Text style={{ fontSize: 14, color: "#E15C63" }}> View license</Text>
          </TouchableOpacity>}
          <ImageViewer 
            onCancel={() => setIsVisible(false)}
            isVisible={isVisible}
            image={user.licenseUri}/>
        </View>
        <TouchableOpacity
          style={[styles.mainBtn, { marginTop: 30, width: "100%" }]}
          onPress={() => navigation.navigate("ChangeDisplay")}>
          <Text style={{ fontSize: 14, color: "#FFF" }}>
            Change Display Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainBtn, { marginTop: 10, width: "100%" }]}
          onPress={() => navigation.navigate("EditAccount")}>
          <Text style={{ fontSize: 14, color: "#FFF" }}>Edit Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainBtn, { marginTop: 10, width: "100%" }]}
          onPress={() => navigation.navigate("ChangePassword")}>
          <Text style={{ fontSize: 14, color: "#FFF" }}>Change Password</Text>
        </TouchableOpacity>
        {user.user_type === UserHematologist && <TouchableOpacity
          style={[styles.mainBtn, { marginTop: 10, width: "100%" }]}
          onPress={() => navigation.navigate("AddLicense")}>
          <Text style={{ fontSize: 14, color: "#FFF" }}>License</Text>
        </TouchableOpacity> }
        <TouchableOpacity
          style={[styles.transparentBtn, { marginTop: 50, width: "100%" }]}
          onPress={signoutUser}>
          <Text style={{ fontSize: 14, color: "#E15C63" }}>Log out</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#ffeaeb', borderColor: '#e15c63', marginVertical: 30, padding: 10, borderWidth: 1, alignItems: 'center' }}>
          <Text style={{flexShrink: 1, textAlign: 'justify', fontSize: 15, fontWeight: '400', color: '#e15c63'}}>{message}</Text>
          <OpenSurveyButton url={surveyUrl}/> 
        </View>
        <Toast config={ToastConfig} />
      </View>
    </ScrollView>
  )
}
const surveyUrl = "https://docs.google.com/forms/d/e/1FAIpQLSclN2R7R0GVcEqxzl6M54SvqgHX0euXRpWiJuH8nhr0MswCnw/viewform";
const message = 'Thank you for using HaemoPhil! We would very much appreciate it if you would please take a few minutes of your time and share your experience on the review form below.'
