import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { labeledInputStyles } from '../../common_styles/labeledInput'
import { GetInputColor, GetLabelColor } from './labeledInput'

export const InputDropdown = ({ marginLeft, marginRight, label, handle, data, color }) => {
  const [selected, setSelected] = useState(0)
  const styles = StyleSheet.create(GetSelectedStyle(color))
  
  return (
    <View style={{ marginLeft: marginLeft, marginRight: marginRight }}>
      <View style={styles.container}>
        {label != null 
            ? <Text style={[ GetLabelColor(color), labeledInputStyles.inputMargin, ]}>
                {label}
              </Text> 
            : null}
      </View>
      <Dropdown
        data={data}
        value={selected}
        labelField="label"
        valueField="value"
        placeholder=""
        onChange={(item) => { 
          handle(item.value)
          setSelected(item.value) 
        }}
        maxHeight={200}
        containerStyle={styles.containerStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedTextProps={{numberOfLines: 1}}
        itemTextStyle={styles.itemStyle}
        iconStyle={styles.icon}
        iconColor={'#e15c63'}
        showsVerticalScrollIndicator={false}
        dropdownPosition='bottom'
        style={styles.dropdownStyle} />
    </View>
  )
}

const GetSelectedStyle = (color) => {
  switch(color)
  {
    case "black":
    case "Black":
      return {
        icon: {
          marginRight: 5,
        },
        selectedTextStyle: {
          fontSize: 14,
          color: '#000000',
        },
        selectedTextStyleBlk: {
          fontSize: 14,
          color: '#000000',
        },
        dropdownStyle: {
          borderWidth: 1,
          borderColor: '#000000',
          height: 40,
          paddingLeft: 15,
        },
        dropdownStyleBlk: {
          borderWidth: 1,
          borderColor: '#000000',
          height: 40,
          paddingLeft: 15,
        },
        container: {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        containerStyle: {
          backgroundColor: '#e3e3e3',
          marginTop: -20,
        },
        itemStyle: {
          color: '#000000',
          textAlign: 'center',
        },
      }
    default:
      return {
        icon: {
          marginRight: 5,
        },
        selectedTextStyle: {
          fontSize: 14,
          color: '#e15c63',
        },
        dropdownStyle: {
          borderWidth: 1,
          borderColor: '#e15c63',
          height: 40,
          paddingLeft: 15,
        },
        container: {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        containerStyle: {
          backgroundColor: '#ffeaeb',
          marginTop: -20,
        },
        itemStyle: {
          color: '#e15c63',
          textAlign: 'center',
        },
      }
  }
}
