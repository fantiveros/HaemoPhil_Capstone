import * as React from 'react';
import { Button, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './screens/landing/LandingPage';
import SignupAsPatient from './screens/auth/patient-signup';
import SignupAsHematologist from './screens/auth/hematologist-signup';
import Signin from './screens/auth/signin';
import ForgotPassword from './screens/auth/forgotpassword';
import { HematologistIntro } from './screens/intros/hematologist_intro';
import { PatientIntro } from './screens/intros/patient_intro';
function HomeScreen({ navigation }) 
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#FFF" }}>
      <Image
        source={(require('./icons/Logo.jpg'))}
        style={{ width: 400, height: 400 }} />
      <TouchableOpacity
        style={[styles.primaryBtn]}
        onPress={() => navigation.navigate('Signin')} >
        <Text
          style={{
            fontSize: 15,
            color: '#FFF',
          }}>
          START
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Welcome({ navigation }) 
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#FFF" }}>
      <Text style={{
        fontWeight: 'normal',
        fontSize: 20,
        color: '#E15C63',
        marginBottom: 50
      }}>Sign up as</Text>
      <TouchableOpacity 
        style={[styles.secondaryBtn, styles.my15]}
        onPress={() => navigation.navigate('SignupAsPatient')}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 20,
          color: '#FFF',
        }}>
          PATIENT
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.transparentBtn, styles.my15]}
        onPress={() => navigation.navigate('SignupAsHematologist')}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#E15C63',
          }}>
          HEMATOLOGIST
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function SignUpPatientNavigation({  }) 
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#FFF" }}>
      <SignupAsPatient />
    </View>
  );
}

function SignUpHematologistNavigation({ }) 
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#FFF" }}>
      <SignupAsHematologist />
    </View>
  );
}

function SigninNavigation({ }) 
{
  return (
    <Signin />
  )
}

function ForgotPasswordNavigation({ }) 
{
  return (
    <ForgotPassword />
  )
}

function HematologistIntroNavigation({ }) 
{
  return (
    <HematologistIntro />
  )
}

function PatientIntroNavigation({ }) 
{
  return (
    <PatientIntro />
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Signin' component={SigninNavigation} options={{ headerShown: false, title: "" }} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordNavigation} options={{ headerShown: false, title: "" }} />
        <Stack.Screen name='Welcome' component={Welcome} options={{ title: "" }}  />
        <Stack.Screen
          name='SignupAsPatient'
          component={SignUpPatientNavigation}
          options={{ headerShown: false, title: "" }} />
        <Stack.Screen
          name='SignupAsHematologist'
          component={SignUpHematologistNavigation}
          options={{ headerShown: false, title: "" }} />
        <Stack.Screen 
          name='LandingPage' 
          component={LandingPage} 
          options={
            { 
              headerShown: false,
            }
          } />
        <Stack.Screen name='HematologistIntro' component={HematologistIntroNavigation} options={{ headerShown: false }} />
        <Stack.Screen name='PatientIntro' component={PatientIntroNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: 
  {
    width: '50%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E15C63',
  },
  secondaryBtn: 
  {
    width: '75%',
    borderRadius: 50,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E15C63'
  },
  transparentBtn: 
  {
    width: '75%',
    borderWidth: 4,
    borderRadius: 50,
    height: 55,
    borderColor: '#E15C63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: 
  {
    paddingTop: 100,
    height: '40%',
    width: '80%',
  },
  title: 
  {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FF2A32',
  },
  img: 
  {
    paddingTop: 100,
    height: '3%',
    width: '100%',
  },
  my15: 
  {
    marginTop: 15,
    marginBottom: 15
  }
});

export default App;
