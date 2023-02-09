import * as React from "react"
import { Text, View, FlatList, Button, TouchableOpacity } from "react-native"
import { styles } from "../styles"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from '@react-navigation/native'

export class Add extends React.Component {
  render() {
    return <AddScreen />
  }
}

const AddScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#E15C63" }}>
        <View style={{ marginLeft: 15, marginBottom: 15 }}>
          <Text style={{ fontWeight: "bold", color: "#FFF", fontSize: 20 }}>
            Select Category
          </Text>
          <Text style={{ color: "#FFF", fontSize: 12 }}>Add an event</Text>
        </View>
      </View>
      <View style={{ margin: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BleedingEvent')}
          style={styles.journalBtn}>
          <Text style={{ color: "#6c757d" }}>Bleeding Event</Text>
          <Icon name="chevron-right" size={25} color={"#E15C63"}></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('VisitationInfusion')}
          style={[styles.journalBtn, {paddingTop: 30}]}>
          <Text style={{ color: "#6c757d" }}>Visitation Infusion Intake</Text>
          <Icon name="chevron-right" size={25} color={"#E15C63"}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  )
}
