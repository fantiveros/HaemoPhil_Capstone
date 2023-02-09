import React, { Component, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native'
import { customStyles } from './customStyles'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from "@react-navigation/native"
import { Row } from './common/row' 
import { useFocusEffect } from '@react-navigation/native'
import { RetrieveBleedingEvents } from './common/service'
import Toast from 'react-native-toast-message'
import { GetFailedToast, ToastConfig } from "../../common/common_config/ToastConfig";
export class Exercises extends Component {
  render() {
    return <ExercisesScreen />
  }
}

const ExercisesScreen = () => {
  const navigation = useNavigation()
  const [bleedingEvents, setBleedingEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('')
  
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#E15C63' }}>
          <View style={customStyles.customTitleContainer}>
            <View>
              <Text style={customStyles.title}>Activity List</Text>
              <Text style={customStyles.subTitle}>Created activities</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("AddPhysicalActivity")}>
                <Icon name='playlist-add' size={30} color={'#FFF'}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
          <View pointerEvents={isLoading ? 'none' : 'auto'}>
            {bleedingEvents.length > 0 
              ? bleedingEvents.map((data, key) => <Row 
                filter={filter}
                key={key} 
                title={data.areaName} 
                text={data.type} 
                img={ data.image 
                  ? {uri: data.image} 
                  : require('../../../icons/areas/shoulder.png')}
                onPress={() => navigation.navigate('ProfileExercise', {data})} />)
              : isLoading ? <ActivityIndicator size="large" animating={isLoading} /> : <Text>No Records Found.</Text>}
          </View>
        </ScrollView>
        <Toast config={ToastConfig} />
      </SafeAreaView>
  )
}
