import React, { useState } from 'react'
import { View, ScrollView, Text, SafeAreaView, TouchableOpacity, Image, } from 'react-native'
import { styles } from '../../../styles'
import { useNavigation } from '@react-navigation/native'
import { customStyles } from './customStyles'

export class PhysicalActivity extends React.Component {
  render() {
    return <PhysicalActivityScreen props={this.props.route.params.areaOfBleeding}/>
  }
}

const PhysicalActivityScreen = ({props}) => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#E15C63' }}>
        <View style={{ marginLeft: 15, marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold', color: '#FFF', fontSize: 20 }}>
            Body Part
          </Text>
          <Text style={{ color: '#FFF', fontSize: 12 }}>
            Suggested exercise
          </Text>
        </View>
      </View>
      <ScrollView
        style={{ width: '100%', backgroundColor: '#f4efef' }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            {props.areaName}
          </Text>
          <Text style={customStyles.exerciseText}>
            {props.descriptionNote}
          </Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          {props.physicalActivities.map((item) => (
            <ActivityList key={item.step} src={item.image ? { uri: item.image } : require("../../../../../icons/camera.png")} label={item.description} />
          ))}
        </View>
      </ScrollView>
      <View style={customStyles.doneBtnContainer}>
        <TouchableOpacity style={[styles.mainBtn, {width: '100%', borderRadius: 0}]} onPress={()=>navigation.navigate('Home')}>
          <Text style={{ fontSize: 14, color: '#FFF' }}>Complete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const ActivityList = ({ src, label }) => {
  return (
    <View style={customStyles.physicalActivityImgContainer}>
      <Image style={customStyles.physicalActivityImg} source={src} />
      <Text style={customStyles.physicalActivityText}>{label}</Text>
    </View>
  )
}
