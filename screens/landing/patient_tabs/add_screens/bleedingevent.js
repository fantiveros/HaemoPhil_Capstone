import React, { useState, useEffect, useCallback } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView, Linking, Alert, SafeAreaView } from "react-native"
import { Color } from "../../../common_styles/colors"
import { ClickableInput } from "../../../common/components/clickableInput"
import { styles } from "../../styles"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { RetrieveData, RemoveData } from "../../../common/common_config/asyncStorage"
import { ToastConfig, ShowToast } from '../../../common/common_config/ToastConfig';
import Slider from '@react-native-community/slider'
import Toast from 'react-native-toast-message';

export class BleedingEvent extends React.Component {
  render() {
    return <BleedingEventScreen />
  }
}

const BleedingEventScreen = () => {
  const [areaBleed, setAreaBleed] =  useState(undefined)
  const [dateTime, setDateTime] =  useState(undefined)
  const [painLevel, setPainLevel] = useState(undefined)
  const [properties, setProperties] = useState([])

  const navigation = useNavigation()

  const setColors = (range) => {
    range = range * 100
    if(range >= 0 && range <= 9.09) {
      setProperties({color: '#3eb747', src: require("../../../../icons/emoji/1.png"), label: 'No Pain'})
      setPainLevel('No Pain')
    } else if (range >= 9.1 && range <= 18.18) {
      setProperties({color: '#58bc40', src: require("../../../../icons/emoji/1.png"), label: 'No Pain'})
      setPainLevel('No Pain')
    } else if (range >= 18.19 && range <= 27.27) {
      setProperties({color: '#69bf44', src: require("../../../../icons/emoji/2.png"), label: 'Mild'})
      setPainLevel('Mild')
    } else if (range >= 27.28 && range <= 36.36) {
      setProperties({color: '#7ec43f', src: require("../../../../icons/emoji/2.png"), label: 'Mild'})
      setPainLevel('Mild')
    } else if (range >= 36.37 && range <= 45.45) {
      setProperties({color: '#7ec43f', src: require("../../../../icons/emoji/3.png"), label: 'Moderate'})
      setPainLevel('Moderate')
    } else if (range >= 45.46 && range <= 54.54) {
      setProperties({color: '#fdcc0b', src: require("../../../../icons/emoji/3.png"), label: 'Moderate'})
      setPainLevel('Moderate')
    } else if (range >= 54.55 && range <= 63.63) {
      setProperties({color: '#feaf18', src: require("../../../../icons/emoji/4.png"), label: 'Severe'})
      setPainLevel('Severe')
    } else if (range >= 63.64 && range <= 72.72) {
      setProperties({color: '#fb9622', src: require("../../../../icons/emoji/4.png"), label: 'Severe'})
      setPainLevel('Severe')
    } else if (range >= 72.73 && range <= 81.81) {
      setProperties({color: '#f77e21', src: require("../../../../icons/emoji/5.png"), label: 'Very Severe'})
      setPainLevel('Very Severe')
    } else if (range >= 81.82 && range <= 90.90) {
      setProperties({color: '#ed7e3b', src: require("../../../../icons/emoji/5.png"), label: 'Very Severe'})
      setPainLevel('Very Severe')
    } else {
      setProperties({color: '#f14b24', src: require("../../../../icons/emoji/6.png"), label: 'Worst Pain Possible'})
      setPainLevel('Worst Pain Possible')
    }
  }

  const OpenSurveyButton = ({ url }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url)

      if (supported) {
        await Linking.openURL(url)
      } else {
        Alert.alert("Can't open link at the moment.")
      }
    }, [url])

    return (
      <TouchableOpacity
        onPress={handlePress}>
        <Text style={{ color: '#E15C63', fontSize: 12 }}>
          WFH GUIDELINES
        </Text>
      </TouchableOpacity>
    )
  }

  useFocusEffect(
    React.useCallback(() => {
      const ReadCache = async () => {
        await RetrieveData(DATE_TIME_BLEEDING_EVENT_KEY)
        .then((res) => {
          if(res && res.length > 2)
            setDateTime(JSON.parse(res))
        })
        
        await RetrieveData(AREA_OF_BLEEDING_BLEEDING_EVENT_KEY)
        .then((res) => {
          if(res && res.length > 2)
            setAreaBleed(JSON.parse(res))
        })
        
        return true
      };

      ReadCache();
      return () => {}
    }, [])
  );

  useEffect(() => {
    ResetCache()
  }, [])

  const ResetCache = async () => {
    await RemoveData(DATE_TIME_BLEEDING_EVENT_KEY)
    await RemoveData(AREA_OF_BLEEDING_BLEEDING_EVENT_KEY)
    setDateTime(undefined)
    setAreaBleed(undefined)
    setPainLevel(undefined)
  }

  const setTextInputDate =
    dateTime ? dateTime.date  + " - " + dateTime.time + " " + dateTime.postFix : "Select" 
    
  const setTextInputBleedingArea =
    areaBleed ? areaBleed.areaName + " - " + areaBleed.type: "Select" 

  const onNextClick = () => {
    if(isSet(dateTime) && isSet(areaBleed) && isSet(painLevel))
    {
      var data = {dateAndTime: dateTime, areaOfBleeding: areaBleed, painLevel: painLevel}
      ResetCache()
      navigation.navigate('MethodOfTreatment', {data})
    }
    else
      ShowToast({ isCompleted: false, title: 'Cannot proceed', body: 'Please fill up the fields.' })
  }

  const isSet = (val) =>
    val != undefined && val != null

  return (
    <SafeAreaView style={{paddingBottom: 80}}>
      <View style={{ backgroundColor: "#E15C63" }}>
        <View style={{ marginLeft: 15, marginBottom: 15 }}>
          <Text style={{ fontWeight: "bold", color: "#FFF", fontSize: 20 }}>
            Bleed
          </Text>
          <Text style={{ color: "#FFF", fontSize: 12 }}>
            Be specific as possible
          </Text>
        </View>
      </View>
      <ScrollView
        style={{ width: "100%" }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 10, padding: 30 }}>
          <View style={{ paddingTop: 10 }}>
            <ClickableInput
              label={"Date & Time"}
              placeholder={setTextInputDate}
              onPress={() => navigation.navigate("BleedingEventDateAndTime", {previousScreen: "BleedingEvent", KEY: DATE_TIME_BLEEDING_EVENT_KEY })}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <ClickableInput
              label={"Area of Bleed"}
              placeholder={setTextInputBleedingArea}
              onPress={() => navigation.navigate("AreaOfBleeding", {previousScreen: "BleedingEvent"})}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={[Color.secondary, { fontSize: 10 }]}>Pain Level</Text>
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Image
                  source={properties.src}
                  style={styles.painLevelImg} />
              <View style={{
                width: '100%',
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",}}>
                {levels.map((item, key) => <PainLabels key={key} label={item.id}/>)}
              </View>
              <Slider 
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={properties.color}
                maximumTrackTintColor={'#808080'}
                thumbTintColor={properties.color}
                onValueChange={(val) => setColors(val)}/>
              <Text style={{ fontSize: 15, fontWeight: '500', color: properties.color}}>{properties.label}</Text>
            </View>
          </View>
          <Toast config={ToastConfig} />
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 20, justifyContent:'space-between', alignItems: 'flex-start', marginLeft: 10 }}>
          {labels.map((item) => {
            return (
              <View key={item.id} style={[styles.lblWidth, ]}>
                <Image source={item.src} style={styles.painLevelImg}/>
                <Text style={{textAlign: 'center', fontSize: 11, color: '#808080', marginTop: 5, flexShrink: 1}}>{item.value}</Text>
              </View>
            )
          })}
        </View>
        <View style={{ alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity 
            style={styles.mainBtn}
            onPress={() => onNextClick()} >
            <Text style={{ fontSize: 12, color: "#FFF" }}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity 
            style={[styles.transparentBtn, {width: '50%'}]}
            onPress={() => {
              ResetCache()
              navigation.navigate('Add')}} >
            <Text style={{ fontSize: 12, color: "#E15C63" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginVertical: 25}}>
          <OpenSurveyButton url={url} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const url = 'https://www1.wfh.org/publications/files/pdf-1863.pdf'

const PainLabels = ({ label }) => {
  return (
    <View style={[ styles.radioBtn, { alignItems: "center", margin: 1, marginTop: 10 }]}>
      <Text style={{ fontSize: 10 }}>{label}</Text>
    </View>
  )
}

const levels = [
  {id: 0}, 
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
  {id: 10},
]
const labels = [
  { id: 0, value: "0 \nNo hurt", src: require("../../../../icons/emoji/1.png") },
  { id: 1, value: "2 \nHurts little bit", src: require("../../../../icons/emoji/2.png") },
  { id: 2, value: "4 \nHurts little more", src: require("../../../../icons/emoji/3.png") },
  { id: 3, value: "6 \nHurts even more", src: require("../../../../icons/emoji/4.png") },
  { id: 4, value: "8 \nHurts whole lot", src: require("../../../../icons/emoji/5.png") },
  { id: 5, value: "10 \nHurts worst", src: require("../../../../icons/emoji/6.png") },
]

export const DATE_TIME_BLEEDING_EVENT_KEY = '@DATE_TIME_BLEEDING_EVENT_KEY'
export const AREA_OF_BLEEDING_BLEEDING_EVENT_KEY = '@AREA_OF_BLEEDING_BLEEDING_EVENT_KEY'
