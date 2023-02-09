import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import { styles } from '../../../styles'
import Toast from 'react-native-toast-message'
import { ShowToast, ToastConfig } from '../../../../common/common_config/ToastConfig'
import { useNavigation } from '@react-navigation/native'
import { AREA_OF_BLEEDING_BLEEDING_EVENT_KEY } from '../bleedingevent'
import { StoreData } from '../../../../common/common_config/asyncStorage'
import { RetrieveBleedingEvents } from '../../../hematologist_tabs/common/service'
import { useFocusEffect } from '@react-navigation/native'

export class AreaOfBleeding extends React.Component {
  render() {
    return <AreaOfBleedingScreen routeParams={this.props.route.params}/>
  }
}

const AreaOfBleedingScreen = ({routeParams}) => {
  const navigation = useNavigation()
  const [bleedingEvents, setBleedingEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useFocusEffect(
    React.useCallback(() => {
      let tempBleedingEvents = []
        const GetBleedingEvents = async () => {
          await RetrieveBleedingEvents(val => setIsLoading(val))
            .then(res => {
              res.map(doc => tempBleedingEvents.push(doc))
              setIsLoading(false)
            })
            .catch(res => {
              GetFailedToast()
              setIsLoading(false)
            })

            setBleedingEvents(tempBleedingEvents);
          return true
        };

        GetBleedingEvents()
      return () => {}
    }, [])
  );

  const showSuccessToast = () =>
    ShowToast({ isCompleted: true, title: 'Success', body: 'Changes saved' })

  const showFailedToast = () =>
    ShowToast({ isCompleted: false, title: 'Cancelled', body: 'Changes cancelled' })
  
  const onBleedAreaClick = (item) => {
    Alert.alert('Area of Bleeding', 'You selected ' + item.areaName, [
      {
        text: 'Cancel',
        onPress: () => showFailedToast(),
        style: 'cancel',
      },
      { 
        text: 'Confirm', 
        onPress: () => {
          StoreData(item, AREA_OF_BLEEDING_BLEEDING_EVENT_KEY)
          navigation.navigate(routeParams.previousScreen)
          showSuccessToast()
        }
    },
    ])
  }

  return (
    <ScrollView
      style={{ width: '100%', marginBottom: 30 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View
        pointerEvents={isLoading ? 'none' : 'auto'}
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 30,
        }}>
        {bleedingEvents.map((item, key) => (
          <RadioBtnBleed
            key={key}
            src={item.image ? { uri: item.image } : require("../../../../../icons/areas/shoulder.png")}
            label={item.areaName}
            type={item.type}
            onPress={() => onBleedAreaClick(item)}
          />
        ))}
        <Toast config={ToastConfig} />
      </View>
    </ScrollView>
  )
}

const RadioBtnBleed = ({ src, label, type, onPress }) => {
  return (
    <View
      style={styles.customBleedBtnContainer}>
      <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.customBleedAreaBtn]}>
        <Image source={src} style={styles.customBleedImg} />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 13
          }}>
          {label}
        </Text>
        <Text style={{ fontSize: 12 }}>Type: {type}</Text>
      </TouchableOpacity>
    </View>
  )
}
