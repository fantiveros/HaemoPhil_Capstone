import React, { Component, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { styles } from './styles'
import Icon from 'react-native-vector-icons/Feather'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getStorage} from 'firebase/storage';
import { UpdateUserProfileImage } from '../../../auth/service';
import Toast from 'react-native-toast-message'
import { ToastConfig, GetFailedToast, GetSuccessToast } from '../../../common/common_config/ToastConfig'
import { useNavigation } from "@react-navigation/native"

export class ChangeDisplay extends Component {
  render() {
    return <ChangeDisplayScreen user={this.props.user}/>
  }
}

const ChangeDisplayScreen = ({user}) => {
  const navigation = useNavigation()
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if(image)
    {
      setIsUploading(true)
      const storage = getStorage();
      const response = await fetch(image)
      const blob = await response.blob();
      const filename = `${new Date().toString()}` + image.substring(image.lastIndexOf('/')+1)
      const storageRef = ref(storage, `profile_images/${filename}`);
  
      const metadata = {
        contentType: 'image/jpeg',
      };
      
      await uploadBytes(storageRef, blob, metadata)
      .then(async res => {
        const isCompleted = await UpdateUserProfileImage(user, `profile_images/${filename}`)
        if(isCompleted)
        {
          setIsUploading(false)
          GetSuccessToast('Signout is required to view changes.')
        }
      }).catch(error => console.error(error));
    }
    else
    {
      GetFailedToast("Image not found. Please try again.")
    }
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {isUploading 
        ? <ActivityIndicator size="large" animating={isUploading} />
        : <View style={styles.mainContainer}>
        <View style={styles.uploadContainer}>
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={1}
            style={styles.customPhotoContainer}>
            {!image 
            ? <View style={{ alignItems: 'center' }}>
                <Icon name="upload" size={50} color={'#E15C63'} />
                <Text style={{ color: '#E15C63', fontSize: 20 }}>Browse</Text>
              </View>
            : <Image
                source={{ uri: image }}
                style={styles.uploadedImg}
              />}
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={uploadImage}>
            <Text style={{ color: '#FFF' }}> Submit </Text>
          </TouchableOpacity>
        </View>
        <Toast config={ToastConfig} />
      </View>}
    </ScrollView>
  )
}


