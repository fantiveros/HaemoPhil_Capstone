import React, { useState } from 'react'
import { Text, TouchableOpacity, View, TextInput } from 'react-native'
import { inputSelectStyles as styles } from '../../common_styles/inputSelect'

export const InputSelect = ({ marginLeft, marginRight, label, handle }) => {
  const [radioSex, setRadioSex] = useState(genderList)
  const [gender, setGender] = useState('Male')

  const OnRadioClick = (item) => {
    let updatedState = radioSex.map((isRadioSexItem) =>
      isRadioSexItem.id === item.id
        ? { ...isRadioSexItem, selected: true }
        : { ...isRadioSexItem, selected: false }
    )
    setRadioSex(updatedState)
    setGender(item.value)
    handle(item.value)
  }
  return (
    <View style={{ marginLeft: marginLeft, marginRight: marginRight }}>
      <Text style={[styles.inputLbl, styles.inputMargin]}>{label}</Text>
      <View style={styles.radioInput}>
        <TextInput
          style={[styles.radioInput, { borderWidth: 0, position: 'absolute' }]}
          value={gender}
          onChangeText={handle}
          editable={false}
        />
        {radioSex.map((item) => (
          <CustomGenderRadio
            key={item.id}
            label={item.label}
            selected={item.selected}
            onPress={() => OnRadioClick(item)}
          />
        ))}
      </View>
    </View>
  )
}

const CustomGenderRadio = ({ onPress, label, selected }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{ flexDirection: 'row', zIndex: 10 }}
      onPress={onPress}>
      <View style={styles.radioContainer}>
        {selected ? <View style={styles.customIcon} /> : null}
      </View>
      <Text style={{ color: '#E15C64' }}>{label}</Text>
    </TouchableOpacity>
  )
}

const genderList = [
  { id: 0, value: 'Male', label: 'Male', selected: false },
  { id: 1, value: 'Female', label: 'Female', selected: false },
]
