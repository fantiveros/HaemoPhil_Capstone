import React, { Component, useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native'
import { customStyles } from './customStyles'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'

export class PatientHistory extends Component {
  render() {
    return <PatientHistoryScreen props={this.props.route.params} />
  }
}

const PatientHistoryScreen = ({ props }) => {
  const navigation = useNavigation()
  const [bleedingHistory, setBleedingHistory] = useState([])
  const [infusionHistory, setInfusionHistory] = useState([])
  const [filter, setFilter] = useState('')
  const [isBleeding, setIsBleeding] = useState(true)

  const GetBleedingEvents = () => {
    const bleedingEvents = JSON.parse(props.userBleedingEvents)
    setBleedingHistory(bleedingEvents)
  }

  const GetVisitationInfusion = async () => {
    const visitationInfusions = JSON.parse(props.userVisitationInfusion)
    setInfusionHistory(visitationInfusions)
  }

  useEffect(() => {
    GetBleedingEvents()
    GetVisitationInfusion()
  }, [])

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: '#E15C63' }}>
        <View style={customStyles.customTitleContainer}>
          <View>
            <Text style={customStyles.title}>
            {isBleeding 
              ? 'Bleeding '
              : 'Infusion '}
              History</Text>
          </View>
          <View>
            <TouchableOpacity activeOpacity={1} onPress={() => setIsBleeding(!isBleeding)}>
              {isBleeding 
                ? <AwesomeIcon name="toggle-off" size={25} color={'#FFF'} />
                : <AwesomeIcon name="toggle-on" size={25} color={'#FFF'} />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={customStyles.inputContainerMargin}>
        <View style={customStyles.inputContainer}>
          <TextInput placeholder="Search" 
            style={customStyles.inputWithIcon}
            onChangeText={(filter) => setFilter(filter)}
            value={filter} />
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
        {isBleeding 
          ? bleedingHistory.length >= 1 
            ? bleedingHistory.map((item, index) => <BleedingRow 
              key={index}
              title={item.location} 
              level={item.severity} 
              method={item.treatment} 
              dosage={item.dosage}
              datetime={`${item.date} ${item.time}`}
              concentrate={item.factorConcentrate}
              brand={item.brand}
              filter={filter}/>)
            : <Text style={{textAlign: 'center'}}>No records found</Text>
          : infusionHistory.length >= 1
            ? infusionHistory.map((item, index) => <InfusionRow
              key={index}
              dosage={item.dosage}
              datetime={`${item.date} ${item.time}`}
              filter={filter}/>)
            : <Text style={{textAlign: 'center'}}>No records found</Text>}
      </ScrollView>
    </SafeAreaView>
  )
}

const BleedingRow = ({title, level, method, dosage, datetime, concentrate, brand, filter}) => {
  return (
    <View style={[
        customStyles.textMainContainer, 
        filter != null 
            ? typeof title == "string" 
                && typeof filter == "string" 
                && title.toLowerCase().includes(filter.toLowerCase()) 
                    ? {}  
                    : {display: 'none'} 
            : null]}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '100%' }}>
          <View style={ customStyles.textContainer }>
            <Text style={{ fontWeight: '500' }}>Area of Bleed:</Text>
            <Text style={customStyles.text}>{title}</Text>
          </View>
          <View style={customStyles.textContainer}>
            <Text style={{ fontWeight: '500' }}>Pain Level:</Text>
            <Text style={customStyles.text}>{level}</Text>
          </View>
          <View style={customStyles.textContainer}>
            <Text style={{ fontWeight: '500' }}>Factor Concentrate:</Text>
            <Text style={customStyles.text}>{concentrate}</Text>
          </View>
          <View style={ customStyles.textContainer }>
            <Text style={{ fontWeight: '500' }}>Method:</Text>
            <Text style={customStyles.text}>{method}</Text>
          </View>
          <View style={customStyles.textContainer}>
            <Text style={{ fontWeight: '500' }}>Dosage:</Text>
            <Text style={customStyles.text}>{dosage}</Text>
          </View>
          <View style={customStyles.textContainer}>
            <Text style={{ fontWeight: '500' }}>Brand:</Text>
            <Text style={customStyles.text}>{brand}</Text>
          </View>
          <View style={customStyles.textContainer}>
            <Text style={{ fontWeight: '500' }}>Date & Time:</Text>
            <Text style={{ fontSize: 13, marginLeft: 5 }}>{datetime}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const InfusionRow = ({dosage, datetime, filter}) => {
  return (
    <View style={[
        customStyles.textMainContainer, 
        filter != null 
            ? typeof datetime == "string" 
                && typeof filter == "string" 
                && datetime.toLowerCase().includes(filter.toLowerCase()) 
                    ? {}  
                    : {display: 'none'} 
                    : null]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}> 
        <View style={[customStyles.textContainer, { marginTop: 3 }]}>
          <Text style={{ fontWeight: '500' }}>Date & Time:</Text>
          <Text style={{ fontSize: 13, marginLeft: 5 }}>
            {datetime}
          </Text>
        </View>
        <View style={[customStyles.textContainer, { marginTop: 3 }]}>
          <Text style={{ fontWeight: '500' }}>Dosage:</Text>
          <Text style={{ fontSize: 13, marginLeft: 5 }}>
            {dosage}
          </Text>
        </View>
      </View>
    </View>
  )
}
