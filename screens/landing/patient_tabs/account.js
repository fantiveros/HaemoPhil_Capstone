import React, { useEffect, useState } from "react"
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native"
import { styles } from "./../styles"
import { signOut } from "firebase/auth"
import { authen } from "../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { ToastConfig, ShowToast } from "../../common/common_config/ToastConfig"
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
        <Toast config={ToastConfig} />
      </View>
    </ScrollView>
  )
}