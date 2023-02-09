import * as React from "react"
import { View, Text, ScrollView } from "react-native"
import { Color } from "../../common_styles/colors"
import { bleedingRowStyles } from "../../common_styles/bleedingRow"
import { C_Mild, C_Moderate, C_NoPain, C_Severe, C_VerySevere, C_WorstPainPossible } from "../constants/user_constants"

export const Row = ({ backgroundColor, isAreaBleeding, title, mainText, enclosedSubText, rightMostText, filter}) => {
  
  return (
    <View style={[bleedingRowStyles.container, filter != null ? typeof title == "string" && typeof filter == "string" && title.toLowerCase().includes(filter.toLowerCase()) ? {}  : {display: 'none'} : null]}>
      <View style={bleedingRowStyles.stretch}>
        <Text style={isAreaBleeding 
          ? { fontWeight: "bold" , fontSize: 12 } 
          : { fontWeight: "normal" , fontSize: 14 } }>{title}</Text>
        {(mainText || enclosedSubText) && <Text style={[Color.secondary, { fontSize: 12 }]}>
          {mainText} {enclosedSubText && <Text>(<Text style={[Color.primary, { fontSize: 12 }]}>{enclosedSubText}</Text>)</Text>}
        </Text>}
      </View>
      <View
        style={[
          bleedingRowStyles.indicator,
          { backgroundColor: backgroundColor },
        ]}>
         <Text style={isAreaBleeding 
          ? [Color.white, {fontSize: 12 }]
          : [Color.white, {fontSize: 14 }]}>{rightMostText}</Text>
      </View>
    </View>
  )
}

export const DataRows = ({visitationInfusionData, bleedingAreaData, isAreaBleeding, filter}) => {
  return <ScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}>
    {!isAreaBleeding 
      ? visitationInfusionData.length > 0 
        ? visitationInfusionData.map((record, key) => <Row
          filter={filter}
          key={key}
          isAreaBleeding={false}
          title={`${record.dateTime} - ${record.time}`}
          rightMostText={`${record.dosage} units of factor`}
          backgroundColor={"#E15C63"} />)
        : <Text>No data found.</Text>
      : bleedingAreaData.length > 0 
      ? bleedingAreaData.map((record, key) => <Row
          filter={filter}
          key={key}
          isAreaBleeding={true}
          title={record.location}
          mainText={`${record.dateTime} - ${record.time}`}
          rightMostText={record.severity}
          enclosedSubText={record.dosage}
          backgroundColor={GetSeverityColor(record.severity)} />)
        : <Text>No data found.</Text>}
  </ScrollView>
}

const GetSeverityColor = (severity) => {
  switch(severity)
  {
    case C_NoPain:
      return "#3eb747"
    case C_Mild:
      return "#7ec43f"
    case C_Moderate:
      return "#fdcc0b"
    case C_Severe:
      return "#feaf18"
    case C_VerySevere:
      return "#f77e21"
    case C_WorstPainPossible:
      return "#f14b24"
  }
}
