import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ToastConfig, ShowToast } from '../common/common_config/ToastConfig'
import Toast from 'react-native-toast-message'
import OnboardingScreen from '../common/components/intro'

export class PatientIntro extends React.Component {
  render() {
    return <PatientIntroScreen />
  }
}

const PatientIntroScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    ShowToast({isCompleted: true, title: "Success", body: "Account Successfully created."})}, []);
    
  return (
    <OnboardingScreen
      onPress={() => navigation.navigate('LandingPage')}
      slides={slides}>
      <Toast config={ToastConfig} />
    </OnboardingScreen>
  )
}

const slides = [
  {
    id: '1',
    image: require('./../../icons/intro_images/patient/patient_intro_1.png'),
    title: 'Electronically Record \n Daily Events',
  },
  {
    id: '2',
    image: require('./../../icons/intro_images/patient/patient_intro_2.png'),
    title: 'Infusion Intake \n Tracker',
  },
  {
    id: '3',
    image: require('./../../icons/intro_images/patient/patient_intro_3.png'),
    title: 'Effective Physical \n Activity',
  },
]
