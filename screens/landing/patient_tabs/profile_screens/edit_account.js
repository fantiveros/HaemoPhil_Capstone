import React, { Component, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LabeledInput } from '../../../common/components/labeledInput'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { EditUserAccount } from '../../../auth/service'
import Toast from 'react-native-toast-message'
import { ToastConfig, GetFailedToast } from '../../../common/common_config/ToastConfig'

export class EditAccount extends Component {
  render() {
    return <EditAccountScreen user={this.props.user}/>
  }
}

const EditAccountScreen = ({user}) => {
  const navigation = useNavigation()
  const [currentPassword, setCurrentPassword] = useState('')
  const [name, setName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [contactNum, setContactNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const SendEditAccount = async () => {
    if(setCurrentPassword.length > 0 && name.length > 0 && newEmail.length > 0 && contactNum.length > 0)
    {
      await EditUserAccount(
        { currentPassword, name, newEmail, contactNum },
        user,
        (val) => setIsLoading(val),
        navigation)
    }
    else
    {
      GetFailedToast();
    }
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
      {isLoading ? (
          <ActivityIndicator size="large" animating={isLoading} />
        ) : (
        <View>
          <LabeledInput 
            label={'NAME'}
            handle={(val) => setName(val)}
            value={name}/>
          <LabeledInput 
            label={'EMAIL ADDRESS'}
            handle={(val) => setNewEmail(val)}
            value={newEmail} />
          <LabeledInput 
            label={'CONTACT NUMBER'} 
            keyboardType={'numeric'}
            handle={(val) => setContactNumber(val)}
            value={contactNum} />
          <View style={{ marginTop: 50 }}>
            <LabeledInput
              label={'ENTER PASSWORD TO CONFIRM CHANGES'}
              secureTextEntry={true}
              handle={(val) => setCurrentPassword(val)}
              value={currentPassword}/>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={() => SendEditAccount()}>
              <Text style={{ color: '#FFF' }}> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>)}
        <Toast config={ToastConfig} />
      </View>
    </ScrollView>
  )
}
