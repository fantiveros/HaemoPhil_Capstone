import React, { Component, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LabeledInput } from '../../../common/components/labeledInput'
import { useNavigation } from '@react-navigation/native'
import { UpdateUserPassword } from '../../../auth/service'
import Toast from 'react-native-toast-message'
import { ToastConfig } from '../../../common/common_config/ToastConfig'
import { styles } from './styles'

export class ChangePassword extends Component {
  render() {
    return <ChangePasswordScreen />
  }
}

const ChangePasswordScreen = () => {
  const navigation = useNavigation()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const SendNewPasswordChange = async () => {
    await UpdateUserPassword(
      { newPassword, currentPassword, navigation },
      (val) => setIsLoading(val)
    )
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
              label={'CURRENT PASSWORD'}
              handle={(val) => setCurrentPassword(val)}
              value={currentPassword}
              secureTextEntry={true}
            />
            <LabeledInput
              label={'NEW PASSWORD'}
              handle={(val) => setNewPassword(val)}
              value={newPassword}
              secureTextEntry={true}
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => SendNewPasswordChange()}>
                <Text style={{ color: '#FFF' }}> Submit </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Toast config={ToastConfig} />
      </View>
    </ScrollView>
  )
}
