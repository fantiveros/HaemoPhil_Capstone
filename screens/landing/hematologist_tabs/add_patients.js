import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, SafeAreaView, TextInput } from 'react-native'
import { styles } from '../styles'
import Toast from 'react-native-toast-message'
import { RetrievePatientData } from '../service'
import { useFocusEffect } from '@react-navigation/native'
import { Row } from './common/row'
import { customStyles } from './customStyles'
import { GetFailedToast, GetSuccessToast, ToastConfig } from '../../common/common_config/ToastConfig'
import { AssignPatientToHematologist } from './common/service' 
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'

export class AddPatient extends React.Component {
  render() {
    return <AddPatientScreen routeParams={this.props.route.params}/>
  }
}

const AddPatientScreen = ({routeParams}) => {
  const [patientData, setPatientData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('')


  const OnPatientAdd = (patient) => {
    Alert.alert('Patient selected', 'Are you sure you want to add  "' + patient.name +'"?', [
      {
        text: 'Cancel',
        onPress: () => GetFailedToast("Changes cancelled"),
        style: 'cancel',
      },
      { 
        text: 'Confirm', 
        onPress: () => {
          AssignPatientToHematologist(val => setIsLoading(val), patient)
          GetSuccessToast("Patient added succesfully")
        }
    },
    ])
  }

  useFocusEffect(
    React.useCallback(() => {
      let tempPatientData = []
        const GetPatients = async () => {
          await RetrievePatientData()
            .then(res => res.docs.map(doc => 
              tempPatientData.push(doc.data())))
            .catch(res => GetFailedToast())

            setPatientData(tempPatientData);

          return true
        };

        GetPatients()
      return () => {}
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
              <View style={customStyles.inputContainerMargin}>
        <View style={customStyles.inputContainer}>
        <TextInput
            placeholder="Search"
            style={customStyles.inputWithIcon}
            onChangeText={(filter) => setFilter(filter)}
            value={filter}
          />
          <AwesomeIcon
            name="search"
            size={18}
            color={'#E15C63'}
            style={customStyles.iconMargin}
          />
        </View>
      </View>
        <ScrollView
          style={customStyles.customScrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {patientData.length > 0 && !isLoading
            ? patientData.map((patient, key) => 
              <Row
                filter={filter}
                key={key}
                img={ patient.profilePicture && patient.profilePicture !== ""
                  ? { uri: patient.profilePicture }
                  : require("../../../icons/user.png")}
                title={patient.name}
                text={`Type: ${patient.type}`}
                onPress={() => OnPatientAdd(patient)}/>) 
            : <ActivityIndicator size="large" animating={true} />}
        </ScrollView>
        <Toast config={ToastConfig} />
    </SafeAreaView>
  )
}