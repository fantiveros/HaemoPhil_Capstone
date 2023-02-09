import React, { Component, useState } from 'react'
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { DataRows } from '../../../common/Table/row'
import { styles } from '../../styles'
import { customStyles } from '../../hematologist_tabs/customStyles'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'

export class ViewAll extends Component {
  render() {
    return <ViewAllScreen routeParams={this.props.route.params} />
  }
}

const ViewAllScreen = ({ routeParams }) => {
  const [isBleeding, setIsBleeding] = useState(routeParams.isAreaBleeding)
  const parameter = routeParams.isAreaBleeding
  const [filter, setFilter] = useState('')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={{ backgroundColor: '#E15C63' }}>
        <View style={customStyles.customTitleContainer}>
          <View>
            <Text style={customStyles.title}>
              {parameter ? 'Bleeding ' : 'Infusion '}
              History
            </Text>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                setIsBleeding(
                  isBleeding
                    ? (routeParams.isAreaBleeding = false)
                    : (routeParams.isAreaBleeding = true)
                )
              }>
              {parameter ? (
                <AwesomeIcon name="toggle-off" size={25} color={'#FFF'} />
              ) : (
                <AwesomeIcon name="toggle-on" size={25} color={'#FFF'} />
              )}
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
        <View style={[styles.container, { paddingHorizontal: 5 }]}>
          <DataRows
            filter={filter}
            visitationInfusionData={routeParams.visitationInfusionData}
            bleedingAreaData={routeParams.bleedingAreaData}
            isAreaBleeding={routeParams.isAreaBleeding}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
