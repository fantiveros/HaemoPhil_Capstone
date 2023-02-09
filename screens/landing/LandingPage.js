import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Home } from './patient_tabs/home'
import { Account } from './patient_tabs/account'
import { Add } from './patient_tabs/add'
import { BleedingEvent } from './patient_tabs/add_screens/bleedingevent'
import { VisitationInfusion } from './patient_tabs/add_screens/visitationInfusion'
import { ReadUserData } from './service'
import { DateAndTime } from '../common/common_screen/date_time_screen'
import { AreaOfBleeding } from './patient_tabs/add_screens/screens/area_bleed'
import { MethodOfTreatment } from './patient_tabs/add_screens/screens/method_of_treatment'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { ShowToast, ToastConfig } from '../common/common_config/ToastConfig'
import { ChangeDisplay } from './patient_tabs/profile_screens/change_display'
import { ChangePassword } from './patient_tabs/profile_screens/change_password'
import { EditAccount } from './patient_tabs/profile_screens/edit_account'
import { PhysicalActivity } from './patient_tabs/add_screens/screens/physical_activity'
import { AddPhysicalActivity } from './hematologist_tabs/add_physical_activity'
import { Exercises } from './hematologist_tabs/exercises'
import { UserHematologist, UserPatient } from '../common/constants/user_constants'
import { ViewAll } from './patient_tabs/profile_screens/view_all'
import { PatientList } from './hematologist_tabs/patient_list'
import { AddPatient } from './hematologist_tabs/add_patients'
import { PatientProfile } from './hematologist_tabs/patient_profile'
import { ProfileExercise } from './hematologist_tabs/profileExercise'
import { License } from './hematologist_tabs/license'
import { PatientHistory } from './hematologist_tabs/patientHistory'
const Tab = createBottomTabNavigator()

function MyTabs() {
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [user, setUser] = useState({})
  const [userType, setUserType] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const GetUserData = async () =>
    await ReadUserData()
      .then((res) => {
        var result = { isCompleted: false, title: 'Loading', body: 'Loading' }
        if (res) {
          setUser(res)
          setName(res.name)
          setUserType(res.user_type)
          result = {
            isCompleted: true,
            title: 'Success',
            body: 'You have signed in successfully.',
          }
        } else {
          result = {
            isCompleted: false,
            title: 'Failed',
            body: 'User is not authenticated!',
          }
        }

        setIsLoading(false)
        ShowToast(result)
      })
      .catch((res) => {
        setIsLoading(false)
      })

  useEffect(() => {
    GetUserData()
  }, [])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => (
          userType == UserPatient 
            ? {
                tabBarButton: [
                  'BleedingEvent',
                  'VisitationInfusion',
                  'BleedingEventDateAndTime',
                  'AreaOfBleeding',
                  'VisitationInfusionDateAndTime',
                  'MethodOfTreatment',
                  'ChangeDisplay',
                  'EditAccount',
                  'ChangePassword',
                  'PhysicalActivity',
                  'ViewAll'
                ].includes(route.name)
                  ? () => null
                  : undefined 
                }
            : {
              tabBarButton: [
                'ChangeDisplay',
                'ChangePassword',
                'EditAccount',
                'AddPatient',
                'AddPhysicalActivity',
                'PatientProfile',
                'ProfileExercise',
                'AddLicense',
                'PatientHistory'
              ].includes(route.name)
                ? () => null
                : undefined 
              })}>
      <Tab.Screen
        name="Home"
        children={() => <Home userType={userType} isLoading={isLoading} />}
        options={{
          unmountOnBlur: true,
          headerTitle: () => {
            if (!isLoading)
              return (
                <View
                  style={{
                    marginTop: 20,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={{ color: '#FFF' }}>
                      Today is {new Date().toDateString()}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginBottom: 10,
                        color: '#FFF',
                      }}>
                      Good Morning, {name}!
                    </Text>
                  </View>
                  <View>
                    <AwesomeIcon
                      name="bell-o"
                      size={25}
                      color={'#FFF'}></AwesomeIcon>
                  </View>
                  <Toast config={ToastConfig} />
                </View>
              )
          },
          headerShown: true,
          headerStyle: {
            backgroundColor: '#E15C63',
            height: 100,
          },
          tabBarIcon: ({ focused }) => (
            <View>
            {!isLoading && <AwesomeIcon name="home" size={25} color={focused ? '#E15C63' : '#000'}></AwesomeIcon>}
          </View>
          ),
          tabBarShowLabel: !isLoading,
          tabBarLabel: ({focused}) => {
            return focused  
                    ? <Text style={{fontSize: 12, color: '#E15C63'}}>Home</Text>
                    : <Text style={{fontSize: 12, color: '#000'}}>Home</Text>
          }
        }} />
      { userType == UserHematologist && <Tab.Screen 
        name="Exercises" 
        component={Exercises}
        options={{
          headerTitle: 'Physical Activity',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#E15C63',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: '#FFF',
            fontSize: 15,
            fontWeight: '100',
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <AwesomeIcon name="heartbeat" size={25} color={focused ? '#E15C63' : '#000'}></AwesomeIcon>
            </View>
          ),
          tabBarLabel: ({focused}) => {
            return focused  
                    ? <Text style={{fontSize: 12, color: '#E15C63'}}>Exercise</Text>
                    : <Text style={{fontSize: 12, color: '#000'}}>Exercise</Text>
          }
        }}/> }
      {userType == UserPatient && <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarLabelStyle: {color: 'transparent'},
          headerTitle: 'Journal',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#E15C63',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: '#FFF',
            fontSize: 15,
            fontWeight: '100',
          },
          tabBarIcon: ({ focused }) => (
            <View style={{position: 'absolute', top: -20, backgroundColor: '#fff', borderRadius: 25, width: 50, justifyContent: 'center', alignItems: 'center'}}>
              <AwesomeIcon name="plus-circle" size={50} color={'#E15C63'}></AwesomeIcon>
            </View>
          ),
        }} /> }
        { userType == UserHematologist && <Tab.Screen 
          name="PatientList" 
          component={PatientList}
          options={{
            headerTitle: 'Patient List',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              color: '#FFF',
              fontSize: 15,
              fontWeight: '100',
            },
            tabBarIcon: ({ focused }) => (
              <View>
                <AwesomeIcon name="list-ul" size={25} color={focused ? '#E15C63' : '#000'}></AwesomeIcon>
              </View>
            ),
            tabBarLabel: ({focused}) => {
              return focused  
                ? <Text style={{fontSize: 12, color: '#E15C63'}}>Patient List</Text>
                : <Text style={{fontSize: 12, color: '#000'}}>Patient List</Text>
            },
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate('AddPatient')}>
                <FeatherIcon name="user-plus" size={25} color={'#FFF'}/>
              </TouchableOpacity>
            ),
        }}/> }
      {!isLoading && <Tab.Screen
        name="Account"
        children={() => <Account user={user} />}
        options={{
          headerTitle: 'Account',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#E15C63',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: '#FFF',
            fontSize: 15,
            fontWeight: '100',
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <AwesomeIcon name="cog" size={25} color={focused ? '#E15C63' : '#000'}></AwesomeIcon>
          </View>
          ),
          tabBarLabel: ({focused}) => {
            return focused  
                    ? <Text style={{fontSize: 12, color: '#E15C63'}}>Account</Text>
                    : <Text style={{fontSize: 12, color: '#000'}}>Account</Text>
          }
        }} />}
        {userType == UserPatient && 
        <Tab.Screen 
          name="ViewAll" 
          component={ViewAll}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Patient Records',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
          }} />
        
        }
        {userType == UserPatient && <Tab.Screen
          name="BleedingEvent"
          component={BleedingEvent}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Bleeding Event',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('Add')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }} />}

        {userType == UserPatient && <Tab.Screen
          name="VisitationInfusion"
          component={VisitationInfusion}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Visitation Infusion',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 12,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('Add')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }} />}
        {userType == UserPatient && <Tab.Screen
          name="BleedingEventDateAndTime"
          component={DateAndTime}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Date & Time',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('BleedingEvent')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }} />}
        {userType == UserPatient && <Tab.Screen
          name="VisitationInfusionDateAndTime"
          component={DateAndTime}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Date & Time',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('VisitationInfusion')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }} />}
        {userType == UserPatient && <Tab.Screen
          name="AreaOfBleeding"
          component={AreaOfBleeding}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Area of Bleeding',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('BleedingEvent')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }} />}
        {userType == UserPatient && <Tab.Screen
          name="MethodOfTreatment"
          component={MethodOfTreatment}
          options={{
            unmountOnBlur: true,
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Method of Treatment',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('BleedingEvent')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }} />}
        <Tab.Screen 
          name="ChangeDisplay" 
          children={() => <ChangeDisplay user={user} />}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Display Photo',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('Account')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }}/>
        <Tab.Screen 
          name="EditAccount" 
          children={() => <EditAccount user={user} />}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Edit Account',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('Account')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }}/>
        <Tab.Screen 
          name="ChangePassword" 
          component={ChangePassword}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Change Password',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('Account')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }}/>
        {userType == UserPatient && <Tab.Screen 
          name="PhysicalActivity" 
          component={PhysicalActivity} 
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Physical Activity',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('MethodOfTreatment')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }}/>}

        {userType == UserHematologist && <Tab.Screen 
          name="AddPatient" 
          component={AddPatient}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Add Patient',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('PatientList')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }} />}
        {userType == UserHematologist && <Tab.Screen 
          name="AddPhysicalActivity" 
          component={AddPhysicalActivity}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Create Physical Activity',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('Exercises')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }} />}
          {userType == UserHematologist && <Tab.Screen 
          name="PatientProfile" 
          component={PatientProfile}
          options={{
            unmountOnBlur: true,
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Patient Profile',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('PatientList')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }} />}
          {userType == UserHematologist && <Tab.Screen 
          name="ProfileExercise" 
          component={ProfileExercise}
          options={{
            unmountOnBlur: true,
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Edit Physical Activity',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('Exercises')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }}  />}
        {userType == UserHematologist &&  <Tab.Screen 
          name="AddLicense" 
          children={() => <License user={user} />}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'License',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('Account')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }}/>}
        {userType == UserHematologist &&  <Tab.Screen 
          name="PatientHistory" 
          component={PatientHistory}
          options={{
            headerStyle: {
              backgroundColor: '#E15C63',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Patient History',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 15,
              color: '#FFF',
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('PatientList')}>
                <Icon name="chevron-left" size={25} color={'#FFF'}></Icon>
              </TouchableOpacity>
            ),
          }} />}
    </Tab.Navigator>
  )
}

export default function App() {
  return <MyTabs />
}
