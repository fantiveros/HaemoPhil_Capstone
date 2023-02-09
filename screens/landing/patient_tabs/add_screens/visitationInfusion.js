import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ClickableInput } from '../../../common/components/clickableInput'
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { RetrieveData, RemoveData } from "../../../common/common_config/asyncStorage"
import { ToastConfig, ShowToast } from '../../../common/common_config/ToastConfig';
import Toast from 'react-native-toast-message';
import { styles } from '../../styles'
import { CreateVisitationInfusion } from '../../service'

export class VisitationInfusion extends React.Component {
  render() {
    return <VisitationInfusionScreen />
  }
}

const VisitationInfusionScreen = () => {
  const navigation = useNavigation()
  const [dateTime, setDateTime] =  useState(undefined)
  const [dosage, setDosage] =  useState(0)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ResetCache()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const ReadCache = async () => {
        await RetrieveData(DATE_TIME_VISITATION_INFUSION_KEY)
        .then((res) => {
          if(res && res.length > 2)
            setDateTime(JSON.parse(res))
        })
        
        return true
      };

      ReadCache();
      return () => {}
    }, [])
  );

  const ResetCache = async () => {
    await RemoveData(DATE_TIME_VISITATION_INFUSION_KEY)
    setDateTime(undefined)
    setDosage(0)
  }

  const setTextInputDate = dateTime 
    ? dateTime.date + " - " + dateTime.time + " " + dateTime.postFix 
    : "Select" 
  
  const setTextInputDosage = dosage > 0 
    ? `${dosage}` 
    : "Input Dosage" 

  const onSaveClick = async () =>
  {
    if(dateTime && dosage > 0)
    {
      const date = dateTime.date;
      const time = `${dateTime.time} ${dateTime.postFix }`
      await CreateVisitationInfusion(
        navigation, 
        (val) => setIsLoading(val), {date, time, dosage })
      .then(res => ResetCache());
    }
    else 
      ShowToast({ isCompleted: false, title: 'Cannot proceed', body: 'Please fill up the fields.' })
  }

  return (
    <ScrollView
      style={{ width: '100%' }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={{ backgroundColor: '#E15C63' }}>
        <View style={{ marginLeft: 15, marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold', color: '#FFF', fontSize: 20 }}>
            Dosage
          </Text>
          <Text style={{ color: '#FFF', fontSize: 12 }}>
            Be specific as possible
          </Text>
        </View>
      </View>
      <View 
        style={{ paddingTop: 10, padding: 30 }}
        pointerEvents={isLoading ? 'none' : 'auto'}>
        <ActivityIndicator size="large" animating={isLoading}/>
        <View style={{ paddingTop: 10 }}>
          <ClickableInput
            label={'Date & Time'}
            placeholder={setTextInputDate}
            onPress={() => navigation.navigate('VisitationInfusionDateAndTime', {previousScreen: "VisitationInfusion", KEY: DATE_TIME_VISITATION_INFUSION_KEY })}
          />
        </View>
        <View style={{ paddingTop: 20 }}>
          <Text style={{ color: '#808080', fontSize: 10 }}>Dosage</Text>
          <TextInput
            placeholder={setTextInputDosage}
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            onChangeText={val => setDosage(val)}
            value={dosage}
            style={{
              borderBottomColor: '#d2d2d2',
              borderBottomWidth: 1,
              paddingBottom: 10,
              flex: 1,
            }}
          />
        </View>
        <Toast config={ToastConfig} />
      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity style={styles.mainBtn} onPress={() => onSaveClick()}>
          <Text style={{ fontSize: 12, color: '#FFF' }}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity 
          style={[styles.transparentBtn, {width: '50%'}]}
          onPress={() => {
            ResetCache()
            navigation.navigate('Add')}}>
          <Text style={{ fontSize: 12, color: '#E15C63' }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export const DATE_TIME_VISITATION_INFUSION_KEY = '@DATE_TIME_VISITATION_INFUSION_KEY'