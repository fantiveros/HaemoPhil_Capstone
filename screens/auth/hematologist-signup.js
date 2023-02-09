import React, { Component, useState } from 'react'
import { styles } from './styles'
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { LabeledInput } from '../common/components/labeledInput';
import { useNavigation } from '@react-navigation/native'
import { SignupUser } from './service'

class SignupAsHematologist extends Component {
  render() {
    return <SignupScreen />
  }
}

const SignupScreen = () => {
  const navigation = useNavigation()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.innerContainer, { marginBottom: 100 }]}>
        <View
          style={{ width: '80%' }}
          pointerEvents={isLoading ? 'none' : 'auto'}>
          <View style={styles.centerView}>
            <Text style={styles.largeLbl}>Create new Account</Text>
            <Text style={{ color: '#E15C63' }}>
              Already Registered?
              <Text
                style={styles.linkLbl}
                onPress={() => navigation.navigate('Signin')}>
                {' '}
                Log in{' '}
              </Text>
              here.
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} />
          <ActivityIndicator size="large" animating={isLoading} />
          <LabeledInput
            label={'NAME'}
            handle={(val) => setName(val)}
            value={name}
          />
          <LabeledInput
            label={'EMAIL ADDRESS'}
            handle={(val) => setEmail(val)}
            value={email}
          />
          <LabeledInput
            label={'PASSWORD'}
            handle={(val) => setPassword(val)}
            value={password}
            secureTextEntry={true}
          />
          <LabeledInput
            label={'SPECIALIZATION'}
            handle={(val) => setSpecialization(val)}
            value={specialization}
          />
          <LabeledInput
            label={'CONTACT NUMBER'}
            handle={(val) => setContactNum(val)}
            value={contactNum}
          />

          <View style={styles.centerView}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() =>
                SignupUser(
                  navigation,
                  (val) => setIsLoading(val),
                  { email, password },
                  {
                    hemaName: name,
                    specialization: specialization,
                    hemaConctactNum: contactNum,
                  },
                  { undefined },
                  false
                )
              }>
              <Text style={{ color: '#FFF' }}> Submit </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.transparentBtn, {width: '100%'}]}
              onPress={() => navigation.navigate('Welcome')}>
              <Text style={{ color: '#E15C63' }}> Cancel </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default SignupAsHematologist