import React, { useState, useEffect } from "react"
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native"
import DatePicker from "react-native-modern-datepicker"
import { format } from "date-fns"
import { styles } from "../../landing/styles"
import { useNavigation } from "@react-navigation/native"
import { StoreData } from '../../common/common_config/asyncStorage'

export class DateAndTime extends React.Component {
  render() {
    return <DateAndTimeScreen routeParams={this.props.route.params}/>
  }
}

const DateAndTimeScreen = ({routeParams}) => {
  const [timeFormat, setTimeFormat] = useState([
    { id: 0, value: 0, name: "AM", bgColor: "#3eb747", selected: true },
    { id: 1, value: 1, name: "PM", bgColor: "#58bc40", selected: false },
  ])

  const navigation = useNavigation()

  const dateNow = format(new Date(), "yyyy-MM-dd")
  const [pickedTime, setPickedTime] = useState("00:00")
  const [timePostfix, setTimePostFix] = useState("AM")
  const [pickedDate, setPickedDate] = useState(dateNow)

  const onRadioBtnClick = (item) => {
    let updateState = timeFormat.map((isTimeItem) =>
      isTimeItem.id === item.id
        ? { ...isTimeItem, selected: true }
        : { ...isTimeItem, selected: false }
    )

    setTimeFormat(updateState)
    setTimePostFix(item.name)
  }

  const onTimeChange = (val) => {
    var splittedTime = val.split(":");
    var hours = "00"
    var minutes = "00"

    // Hours
    hours = splittedTime[0];
    var isNum = isNumber(hours);
    if (isNum || hours.length == 0) {
      var intHour = parseInt(hours)
      if (intHour > 11 || intHour < 0)
        hours = "00"
    }
    else{
      hours = "00"
    }

    // Minutes
    if(splittedTime.length == 2){
      minutes = splittedTime[1]
      isNum = isNumber(minutes);
      if (isNum || minutes.length == 0) {
        var intMinutes = parseInt(minutes)
        if (intMinutes > 59 || intMinutes < 0)
          minutes = "00"
      }
      else{
        minutes  = "00"
      }
    }

    if(hours.length <= 2 && minutes.length <= 2)
    {
      var finalTime = hours+":"+minutes;
      setPickedTime(finalTime)
    }
  }

  const onClicked = () => {
    const data = {date: pickedDate, time: pickedTime, postFix: timePostfix}

    StoreData(data, routeParams.KEY)
    navigation.navigate(routeParams.previousScreen)
  }

  const isNumber = (val) => /^\d+$/.test(val);

  return (
    <ScrollView
      style={{ width: "100%" }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
        <View
          style={{
            width: "100%",
            padding: 10,
            alignItems: "center",
          }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Time</Text>
            </View>
            <View style={{ flex: 2 }}>
              <TextInput
                keyboardType="numeric"
                value={pickedTime}
                onChangeText={(val) => onTimeChange(val)}
                style={{ fontSize: 20, textAlign: "center" }}
              />
            </View>
            {timeFormat.map((item) => (
              <RadioButton
                label={item.name}
                selected={item.selected}
                onPress={() => onRadioBtnClick(item)}
                key={item.id}
              />
            ))}
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <DatePicker
              options={{
                backgroundColor: "#ffcacc",
                textHeaderColor: "#000",
                textDefaultColor: "#000",
                selectedTextColor: "#fff",
                mainColor: "#eb666b",
                textSecondaryColor: "#000",
                borderColor: "transparent",
                textFontSize: 12,
              }}
              maximumDate={dateNow}
              current={pickedDate}
              selected={pickedDate}
              mode="calendar"
              style={{ borderRadius: 10, margin: 10 }}
              onSelectedChange={(val) => setPickedDate(val)}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}>
          <TouchableOpacity 
          style={[styles.mainBtn, { marginTop: 20 }]} 
          onPress={onClicked}>
            <Text style={{ fontSize: 12, color: "#FFF" }}> Proceed </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const RadioButton = ({ label, selected, onPress }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[
          selected ? styles.radioTimeSelected : null,
          { paddingLeft: 10, paddingRight: 10, flex: 1 },
        ]}>
        <Text style={{ fontSize: 20 }}>{label}</Text>
      </TouchableOpacity>
    </View>
  )
}
