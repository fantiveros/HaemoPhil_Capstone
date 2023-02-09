import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ToastConfig, ShowToast } from '../common/common_config/ToastConfig'
import Toast from 'react-native-toast-message'
import OnboardingScreen from '../common/components/intro'

export class HematologistIntro extends React.Component {
  render() {
    return <HematologistIntroScreen />
  }
}

const HematologistIntroScreen = () => {
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
    image: require('./../../icons/intro_images/hematologist/hematologist_intro_1.png'),
    title: "View Patient's \n Journal",
  },
  {
    id: '2',
    image: require('./../../icons/intro_images/hematologist/hematologist_intro_2.png'),
    title: 'Track Patient \n Infusion Intake',
  },
  {
    id: '3',
    image: require('./../../icons/intro_images/hematologist/hematologist_intro_3.png'),
    title: 'Patient \n Analysis',
  },
]
