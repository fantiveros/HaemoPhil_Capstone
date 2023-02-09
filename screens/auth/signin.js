import React, { Component, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { LabeledInput } from '../common/components/labeledInput';
import { useNavigation } from '@react-navigation/native'
import { SigninUser, FakeSigninForPatient, FakeSigninForHematologist, FakeSigninForHematologistWithIntro, FakeSigninForPatientWithIntro } from './service'
import Toast from 'react-native-toast-message';
import { ToastConfig } from '../common/common_config/ToastConfig';

class Signin extends Component {
  render() {
    return <SigninScreen />
  }
}

const SigninScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const signupType = "";
  const isSignup = false;

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.innerContainer}>
          <View style={{ width: '80%' }} pointerEvents={isLoading ? "none" : "auto"}>
          <View style={styles.centerView}>
            <Text style={styles.largeLbl}>Sign in</Text>
            <Text style={{ color: '#E15C63' }}>
              Don't have a account yet?
              <Text
                style={styles.linkLbl}
                    onPress={() => navigation.navigate('Welcome')}> Sign up </Text>
              here.
            </Text>
          </View>
            <ActivityIndicator size="large" animating={isLoading}/>
          <LabeledInput
            label={'EMAIL ADDRESS'}
            value={email}
              handle={(val) => setEmail(val)} />
          <LabeledInput
            label={'PASSWORD'}
            value={password}
            handle={(val) => setPassword(val)}
              secureTextEntry={true} />
          <View style={styles.centerView}>
              <Text style={{ color: '#E15C63', marginTop: 20 }} onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot password?
            </Text>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              SigninUser(
                navigation,
                (val) => setIsLoading(val),
                { isSignup, signupType },
                { email, password }
              )
            }>
            <Text style={{ color: '#FFF' }}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
              onPress={() => FakeSigninForPatient(navigation, (val) => setIsLoading(val))} >
            <Text style={{ color: '#FFF' }}>Fake as Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
              onPress={() => FakeSigninForHematologist(navigation, (val) => setIsLoading(val))} >
            <Text style={{ color: '#FFF' }}>Fake as Hematologist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
              onPress={() => FakeSigninForPatientWithIntro(navigation, (val) => setIsLoading(val))} >
            <Text style={{ color: '#FFF' }}>Fake as Patient w/ Intro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
              onPress={() => FakeSigninForHematologistWithIntro(navigation, (val) => setIsLoading(val))} >
              <Text style={{ color: '#FFF' }}>Fake as Hematologist w/ Intro</Text>
            </TouchableOpacity>
          </View>
          <Toast config={ToastConfig} />
        </View>
      </ScrollView>
  )
}
export default Signin