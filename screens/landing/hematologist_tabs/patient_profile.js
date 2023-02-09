import React, { Component, useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { customStyles } from './customStyles'
import { styles } from './styles'
import { gridStyles } from '../../common_styles/grid'
import { Row } from '../../common/components/rows'
import { Col } from '../../common/components/cols'
import { ReadUserDetails, RetrieveBleedingAreaData, RetrieveVisitationInfusionData, OnRemovePatientFromHematologist } from './common/service'
import { GetFailedToast, ToastConfig, GetSuccessToast } from '../../common/common_config/ToastConfig'
import AwesomeIcon from 'react-native-vector-icons/Feather'
import { MONTH_LIST } from '../../common/constants/user_constants'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

export class PatientProfile extends Component {
  render() {
    return <PatientProfileScreen props={this.props.route.params.patient}/>
  }
}

const PatientProfileScreen = ({props}) => {
  const navigation = useNavigation()
  
  const [profile, setProfile] = useState(undefined)
  const [rowOne, setRowOne] = useState(undefined)
  const [rowTwo, setRowTwo] = useState(undefined)
  const [rowThree, setRowThree] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [docId, setDocId] = useState('')
  const [user, setUser] = useState(undefined)
  const [userBleedingEvents, setUserBleedingEvents] = useState(undefined)
  const [userVisitationInfusion, setUserVisitationInfusion] = useState(undefined)

  const onPatientRemove = async () => {
    await OnRemovePatientFromHematologist(docId)
      .then(res => {
        GetSuccessToast("Successfully Deleted")
        navigation.navigate("PatientList")
      })
      .catch(res => GetFailedToast());
  }

  const GetUserData = async () =>
    await ReadUserDetails(props.patient_uid)
      .then(async (userDetail) => {
        if (userDetail) {
          setProfile({ image: userDetail.profilePicture, name: userDetail.name, email: userDetail.email })
          setUser(userDetail)
          await RetrieveVisitationInfusionData(props.patient_uid).then(async (visitationInfusion) => {
            setUserVisitationInfusion(JSON.stringify(visitationInfusion))
            const totalDosage = GetVisitationInfusionTotalDosage(visitationInfusion);
            setRowThree({ 
              sex: userDetail.sex, 
              birthdate: userDetail.date_of_birth, 
              contact: userDetail.contact_number, 
              typeAndSeverity: `${userDetail.type} (${userDetail.bleed_severity})`,
              noOfVisitation: visitationInfusion ? visitationInfusion.length : 0})

            await RetrieveBleedingAreaData(props.patient_uid).then(bleedingEvents => {
              setUserBleedingEvents(JSON.stringify(bleedingEvents))
              var bleedEventData = GetTotalNumberOfBleedingForCurrentMonth(bleedingEvents)
              const groupedBleedingEvent = GroupBy(bleedingEvents, 'location')
              var bleedingOccurences = GetBleedingEventsOccurences(groupedBleedingEvent)
              
              setRowOne({
                currentMonth: bleedEventData.currentMonth,
                totalDosage: totalDosage,
                totalNoOfBleeding: bleedEventData ? bleedEventData.totalNoOfBleeding : 0,
                bleedingEventsGrouped: groupedBleedingEvent
              })
              setRowTwo(bleedingOccurences);
            })
           
          })
        } else {
          GetFailedToast();
        }

        setIsLoading(false)
      })
      .catch((res) => {
        setIsLoading(false)
      })

  const GetVisitationInfusionTotalDosage = (visitationInfusion) => {
    var totalDosage = 0;
    visitationInfusion.forEach(x => {
      totalDosage += parseInt(x.dosage)
    });
    
    return totalDosage;
  }     

  const GetBleedingEventsOccurences = (groupedBleedingEvent) => {
    let bleedingEvents = []
    const keys = Object.keys(groupedBleedingEvent);

    keys.map((key) => {
      bleedingEvents.push({location: key, noOfOccurrence: groupedBleedingEvent[key].length})
    })

    return bleedingEvents
  }    

  const GroupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  const GetTotalNumberOfBleedingForCurrentMonth = (bleedingEvents) => {
    let currentMonth = new Date().getMonth()
    var data = bleedingEvents
      .filter(data => data.dateTime.getMonth() === currentMonth)

    return {totalNoOfBleeding: data ? data.length : 0, currentMonth: currentMonth}
  }   

  useEffect(() => {
    setDocId(props.docId)
    GetUserData();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isLoading &&
      <ScrollView
        style={customStyles.customScrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
        <View style={styles.imgInnerContainer}>
          <Image
            source={ profile.image 
              ? { uri: profile.image }
              : require('../../../icons/user.png') }
            style={styles.imgInnerContainer}/>
          </View>
          <View style={[styles.saveBtn, {flexDirection: 'column', alignItems: 'flex-start'}]}>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}} onPress={onPatientRemove}>
              <AwesomeIcon name='trash' size={20} color={'#E15C63'}/>
              <Text style={styles.saveBtnText}>Remove</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.changeBtnText, { color: '#000' }]}>
            {profile.name}
          </Text>
          <Text style={[styles.saveBtnText, { color: '#808080' }]}>
            {profile.email}
          </Text>
          <TouchableOpacity 
            style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}} 
            onPress={() => navigation.navigate('PatientHistory', {user, userBleedingEvents, userVisitationInfusion})}>
              <AwesomeIcon name='grid' size={20} color={'#E15C63'}/>
              <Text style={{ fontSize: 14, color: "#E15C63" }}> View history</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10 }}>
          <FirstRow props={rowOne}/>
          <SecondRow props={rowTwo}/>
          <ThirdRow props={rowThree}/>
        </View>
        <Toast config={ToastConfig} />
      </ScrollView>}
    </SafeAreaView>
  )
}

const FirstRow = ({ props }) => {
  let bleedingDesc = `Total No. of \n Bleeding in ${!props || !props.currentMonth ? 0 : MONTH_LIST[props.currentMonth]}`
  let infusionDesc = 'Total No. of \n Infusion Intake'
  return (
    <View style={styles.customGridContainer}>
      <View style={[gridStyles.grid, styles.justifyAlignCenter]}>
        <Row>
          <Col count={25}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.total}>
                {!props || !props.totalNoOfBleeding ? 0 : props.totalNoOfBleeding}
              </Text>
              <Text style={styles.totalDescription}>{bleedingDesc}</Text>
            </View>
          </Col>
          <Col count={25}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.total}>
                {!props || !props.totalDosage ? 0 : props.totalDosage}
              </Text>
              <Text style={styles.totalDescription}>{infusionDesc}</Text>
            </View>
          </Col>
        </Row>
      </View>
    </View>
  )
}

const SecondRow = ({ props }) => {
  const GetDescription = (location) => `Total No. of \n Bleeding in the \n ${location}`

  return (
    <View style={styles.customGridContainer}>
      <View style={[gridStyles.gridTwoColumn, styles.justifyAlignCenter]}>
        {(props && props.length > 0) ? props.map((data, index) => 
            <View key={index} style={{ alignItems: 'center', width: '50%' }}>
              <Text style={styles.total}>
                {!props ? 0 : data.noOfOccurrence}
              </Text>
              <Text style={styles.totalDescription}>{GetDescription(data.location)}</Text>
            </View>)
          :<View style={{ alignItems: 'center', width: '100%' }}>
          <Text style={styles.totalDescription}>
            No bleeding occurrence was recorded.
          </Text>
        </View>}
      </View>
    </View>
  )
}

const ThirdRow = ({props}) => {
  return (
    <View style={[styles.customGridContainer, { borderBottomWidth: 0 }]}>
      <View style={[gridStyles.grid, styles.justifyAlignCenter]}>
        <Row>
          <Col count={25}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.totalDescription}>Sex</Text>
              <Text style={styles.description}>
                {!props.sex ? 'N/A' : props.sex}
              </Text>
            </View>
          </Col>
          <Col count={25}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.totalDescription}>Birth Date</Text>
              <Text style={styles.description}>
                {!props.birthdate ? 'N/A' : props.birthdate}
              </Text>
            </View>
          </Col>
          <Col count={25}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.totalDescription}>Contact Number</Text>
              <Text style={styles.description}>
                {!props.contact ? 'N/A' : props.contact}
              </Text>
            </View>
          </Col>
        </Row>
        <View style={{ marginVertical: 10 }} />
        <Row>
          <Col count={25}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.totalDescription}>Type & Severity</Text>
              <Text style={styles.description}>
                {!props.typeAndSeverity ? 'N/A' : props.typeAndSeverity}
              </Text>
            </View>
          </Col>
          <Col count={25}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.totalDescription}>No. of Visitation</Text>
              <Text style={styles.description}>
                {!props.noOfVisitation ? 'N/A' : props.noOfVisitation}
              </Text>
            </View>
          </Col>
        </Row>
      </View>
    </View>
  )
}
