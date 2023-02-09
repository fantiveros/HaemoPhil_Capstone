import React, { Component, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, TextInput } from "react-native";
import { Row } from "./common/row";
import { customStyles } from './customStyles'
import { useFocusEffect } from '@react-navigation/native'
import { RetrievePatientList } from "./common/service";
import { GetFailedToast } from "../../common/common_config/ToastConfig";
import { useNavigation } from '@react-navigation/native'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'

export class PatientList extends Component {
  render() {
    return <PatientListScreen />
  }
}

const PatientListScreen = () => {
  const navigation = useNavigation()

  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('')

  useFocusEffect(
    React.useCallback(() => {
      let tempPatients = []
        const GetPatients = async () => {
          await RetrievePatientList(val => setIsLoading(val))
            .then(res => {
              res.map(doc => tempPatients.push(doc))
              setIsLoading(false)
            })
            .catch(res => {
              GetFailedToast()
              setIsLoading(false)
            })

            setPatients(tempPatients);
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
          {patients.length >= 1 && !isLoading 
            ? patients.map((patient, key) => <Row
              filter={filter}
              key={key}
              img={ patient.profilePicture
                  ? { uri: patient.profilePicture }
                : require("../../../icons/user.png")}
              title={patient.patientName}
              text={`Type: ${patient.type}`}
              onPress={() => navigation.navigate('PatientProfile', {patient})}/>) 
          : patients.length == 0 && !isLoading 
            ? <Text>No records found</Text>
            : <ActivityIndicator size="large" animating={true} />}
      </ScrollView>
    </SafeAreaView>
  )
}

