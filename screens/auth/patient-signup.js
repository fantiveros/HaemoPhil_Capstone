import React, { Component, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { gridStyles } from '../common_styles/grid';
import { LabeledInput } from '../common/components/labeledInput';
import { Col } from '../common/components/cols';
import { Row } from '../common/components/rows';
import { useNavigation } from '@react-navigation/native'
import { SignupUser } from './service'
import { InputSelect } from '../common/components/inputSelect';
import { InputDropdown } from '../common/components/inputDropdown';
import { format } from "date-fns"
import { CustomCalendarModal } from '../common/components/calendarModal';
import { GetFailedToast, ToastConfig } from '../common/common_config/ToastConfig';
import Toast from 'react-native-toast-message'

class SignupAsPatient extends Component {
  render() {
      return (
          <SignupScreen />
          )
  }
}

const SignupScreen = ({}) =>
{
  const navigation = useNavigation()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [condition, setCondition] = useState(0);
  const [type, setType] = useState('');
  const [bloodSeverity, setBloodSeverity] = useState(0);
  const [sex, setSex] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [ageOfDiagnosis, setAgeOfDiagnosis] = useState(0);
  const [dateOfDiagnosis, setDateOfDiagnosis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dateNow = format(new Date(), 'yyyy-MM-dd')
  const [pickedDate, setPickedDate] = useState(dateNow)
  const [isVisible, setIsVisible] = useState(false)
  const [modalId, setModalId] = useState(0)

  const onModalConfirm = () => {
    if(modalId === 0) {
      setDateOfBirth(pickedDate)
      setIsVisible(!isVisible)
    } else { 
      setDateOfDiagnosis(pickedDate)
      setIsVisible(!isVisible)
    }
  }

  const openModalDOB = () => {
    setModalId(0)
    setIsVisible(!isVisible)
  }

  const openModalDOD = () => {
    setModalId(1)
    setIsVisible(!isVisible)
  }



  return (
    <SafeAreaView style={{ flex: 1, width: '100%' }}>
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
              value={name}
              handle={(val) => setName(val)}
            />
            <LabeledInput
              label={'EMAIL ADDRESS'}
              value={email}
              handle={(val) => setEmail(val)}
            />
            <LabeledInput
              label={'PASSWORD'}
              value={password}
              handle={(val) => setPassword(val)}
              secureTextEntry={true}
            />
            <View style={gridStyles.grid}>
              <Row>
                <Col count={3}>
                  <LabeledInput
                    label={'CONTACT NUMBER'}
                    marginRight={5}
                    keyboardType={'numeric'}
                    value={contactNum}
                    handle={(val) => setContactNum(val)}
                  />
                </Col>
                <Col count={2}>
                  <TouchableOpacity onPress={() => openModalDOB()} activeOpacity={1}>
                    <LabeledInput
                      label={'DATE OF BIRTH'}
                      marginLeft={5}
                      value={dateOfBirth}
                      handle={(val) => setDateOfBirth(val)} 
                      editable={false}/>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col count={3}>
                  <InputDropdown
                    label={'HEMATOLOGICAL CONDITION'}
                    marginRight={5}
                    data={hemaConditionsList}
                    handle={(val) => setCondition(val)}
                  />
                </Col>
                <Col count={2}>
                  <LabeledInput
                    label={'TYPE'}
                    marginLeft={5}
                    value={type}
                    handle={(val) => setType(val)}
                  />
                </Col>
              </Row>
              <Row>
                <Col count={3}>
                  <InputSelect
                    label={'SEX'}
                    marginRight={5}
                    value={sex}
                    handle={(val) => setSex(val)}
                  />
                </Col>
                <Col count={2}>
                  <InputDropdown
                    label={'BLOOD SEVERITY'}
                    marginLeft={5}
                    data={bloodSeverityList}
                    handle={(val) => setBloodSeverity(val)}
                  />
                </Col>
              </Row>
              <Row>
                <Col count={3}>
                  <TouchableOpacity onPress={() => openModalDOD()} activeOpacity={1}>
                    <LabeledInput
                      label={'DATE OF DIAGNOSIS'}
                      marginRight={5}
                      value={dateOfDiagnosis}
                      editable={false}
                      handle={(val) => setDateOfDiagnosis(val)}/>
                  </TouchableOpacity>
                </Col>
                <Col count={2}>
                  <LabeledInput
                    label={'AGE OF DIAGNOSIS'}
                    marginLeft={5}
                    keyboardType={'numeric'}
                    value={ageOfDiagnosis}
                    handle={(val) => setAgeOfDiagnosis(val)}
                  />
                </Col>
              </Row>
              <LabeledInput
                    label={'FAMILY HISTORY'}
                    marginRight={5}
                    value={familyHistory}
                    handle={(val) => setFamilyHistory(val)} />
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => 
                {
                  if(name === "" || type === "" || sex === "" || contactNum === "" || ageOfDiagnosis === 0 || familyHistory === "" || dateOfBirth === "" || dateOfDiagnosis === "")
                    GetFailedToast("All fields are required! Please try again.")
                  else
                    SignupUser(
                      navigation,
                      (val) => setIsLoading(val),
                      { email, password },
                      { undefined },
                      {
                        patientName: name,
                        condition: hemaConditionsList[condition].label,
                        type: type,
                        sex: sex,
                        severity: bloodSeverityList[bloodSeverity].label,
                        patientContactNum: contactNum,
                        dateOfBirth: dateOfBirth,
                        ageOfDiagnosis: ageOfDiagnosis,
                        familyHistory: familyHistory,
                        dateOfDiagnosis: dateOfDiagnosis
                      },
                      true
                  )
                }
              }>
              <Text style={{ color: '#FFF' }}> Submit </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.transparentBtn}
              onPress={() => navigation.navigate('Welcome')}>
              <Text style={{ color: '#E15C63' }}> Cancel </Text>
            </TouchableOpacity>
          </View>
          <Toast config={ToastConfig} />
        </View>
      </ScrollView>
      <CustomCalendarModal 
        isVisible={isVisible} 
        dateNow={dateNow} 
        pickedDate={pickedDate}
        onCancel={() => setIsVisible(!isVisible)}
        onConfirm={() => onModalConfirm()} 
        onSelectChange={(val) => setPickedDate(val)}/>
    </SafeAreaView>
  )
}

const hemaConditionsList = [
  {value: 0, label: 'Von Willebrand Disease'},
  {value: 1, label: 'Hemophilia'},
  {value: 2, label: 'Anemia'},
]

const bloodSeverityList = [
  {value: 0, label: 'Normal'},
  {value: 1, label: 'Mild'},
  {value: 2, label: 'Moderate'},
  {value: 3, label: 'Severe'},
]

export default SignupAsPatient