import React, { Component, useState } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native'
import { styles } from './styles'
import { LabeledInput } from '../common/components/labeledInput'
import { useNavigation } from '@react-navigation/native'
import { ResetPassword } from './service'
import Toast from 'react-native-toast-message'
import { ToastConfig } from '../common/common_config/ToastConfig'

class ForgotPassword extends Component {
  render() {
    return <ForgotPasswordScreen />
  }
}

const ForgotPasswordScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) return <ActivityIndicator size="large" />

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.innerContainer}>
        <View style={{ width: '80%' }}>
          <View style={styles.centerView}>
            <Text style={styles.largeLbl}>Forgot Password</Text>
            <Text style={{ color: '#E15C63' }}>New Password</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}></TouchableOpacity>
          <LabeledInput
            label={'EMAIL ADDRESS'}
            value={email}
            handle={(val) => setEmail(val)}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              ResetPassword(navigation, email, (val) => setIsLoading(val))
            }>
            <Text style={{ color: '#FFF' }}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.transparentBtn}
            onPress={() => navigation.navigate('Signin')}>
            <Text style={{ color: '#E15C63' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Toast config={ToastConfig} />
      </View>
    </ScrollView>
  )
}
export default ForgotPassword
