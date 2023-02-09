import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView, Modal } from 'react-native'
import { styles } from '../../../styles'
import { customStyles } from './customStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { ToastConfig, ShowToast } from '../../../../common/common_config/ToastConfig';
import Toast from 'react-native-toast-message';
import { CreateBleedingArea } from '../../../../landing/service'
import { InputDropdown } from '../../../../common/components/inputDropdown'
import { LabeledInput } from '../../../../common/components/labeledInput'
import { FactorConcentrate, MethodTreatmentBtns, MethodTreatmentBrands } from '../../../../common/constants/dropdown'

export class MethodOfTreatment extends React.Component {
  render() {
    return <MethodOfTreatmentScreen props={this.props.route.params.data} />
  }
}

const MethodOfTreatmentScreen = ({ props }) => {
  const navigation = useNavigation()

  const [isSelected, setIsSelected] = useState(MethodTreatmentBtns)
  const [methodOfTreatment, setMethodOfTreatment] = useState(undefined)
  const [painLevel, setPainLevel] = useState(undefined)
  const [dateAndTime, setDateAndTime] = useState(undefined)
  const [areaOfBleeding, setAreaOfBleeding] = useState(undefined)
  const [dosageIntake, setDosageIntake] = useState("")
  const [factorConcentrate, setFactorConcentrate] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [brand, setBrand] = useState("")
  const [type, setType] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const onRadioBtnClick = (item) => {
    let updatedState = isSelected.map((isSelectedItem) =>
      isSelectedItem.id === item.id
        ? { ...isSelectedItem, selected: true }
        : { ...isSelectedItem, selected: false }
    )
    setIsSelected(updatedState)
    setMethodOfTreatment(item)
  }

  const onSetBrand = (val) => {
    if(val === 'Others') {
      setBrand('')
      setIsVisible(true)
    } else {
      setIsVisible(false)
      setBrand(val)
    }
  }

  const onConfirmModal = () => {
    if(brand === '') {
      ShowToast({ isCompleted: false, title: 'Cannot proceed', body: 'Please fill up the fields.' })
    } else {
      setIsVisible(!isVisible)
    }
  } 

  const onSaveClick = async () =>
  {
    if(dateAndTime && painLevel && areaOfBleeding  && methodOfTreatment)
    {
      const date = dateAndTime.date;
      const time = `${dateAndTime.time} ${dateAndTime.postFix }`
      const severity = painLevel
      const location = areaOfBleeding.areaName
      const type = areaOfBleeding.type
      const dosage = dosageIntake && methodOfTreatment.id == 1 ? dosageIntake : ""
      const treatment = methodOfTreatment.label
      const factor = FactorConcentrate[factorConcentrate].label
      const selectedBrand = brand.length === 0 ? MethodTreatmentBrands[0].label : brand
      if(methodOfTreatment.id === 1 && dosage.length === 0)
      {
        ShowToast({ isCompleted: false, title: 'Cannot proceed', body: 'You must record your intake' })
        return
      }
      
      await CreateBleedingArea(
        navigation, 
        (val) => setIsLoading(val), 
        {date, time, severity, location, type, dosage, treatment, factor, selectedBrand }, areaOfBleeding)
      .then(res => {
        setPainLevel(undefined)
        setDateAndTime(undefined)
        setMethodOfTreatment(undefined)
        setAreaOfBleeding(undefined)
        setFactorConcentrate("")
        setBrand("")
        setDosageIntake("")
      });
    }
    else 
      ShowToast({ isCompleted: false, title: 'Cannot proceed', body: 'Please fill up the fields.' })
  }

  useEffect(() => {
    setPainLevel(props.painLevel)
    setDateAndTime(props.dateAndTime)
    setAreaOfBleeding(props.areaOfBleeding)
  }, [])

  return (
    <SafeAreaView style={{width: '100%', marginBottom: 80}}>
      <View style={{ backgroundColor: '#E15C63' }}>
        <View style={{ marginLeft: 15, marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold', color: '#FFF', fontSize: 20 }}>
            Action
          </Text>
          <Text style={{ color: '#FFF', fontSize: 12 }}>
            Select treatment approach after the bleeding
          </Text>
        </View>
      </View>
      <ScrollView>
      {isLoading 
        ? <ActivityIndicator size="large" animating={isLoading}/>
        : <View style={customStyles.container}>
        <View style={{ width: '75%' }}>
          <View style={[customStyles.body, { paddingTop: 4 }]}>
            <InputDropdown
              label={'Factor Concentrate'}
              marginRight={5}
              data={FactorConcentrate}
              handle={(val) => setFactorConcentrate(val)}
              color={"black"} />
            <InputDropdown
              label={'Brand'}
              marginRight={5}
              data={MethodTreatmentBrands}
              handle={(val) => onSetBrand(MethodTreatmentBrands[val].label)}
              color={"black"} />
            <LabeledInput
              editable={false}
              label={'Selected Brand'}
              marginLeft={5}
              value={brand}  
              handle={(val) => setBrand(val)}
              color={"black"} />
          </View>
          {isSelected.map((item) => (
            <CustomRadioBtn
              key={item.id}
              id={item.id}
              label={item.label}
              selected={item.selected}
              onPress={() => onRadioBtnClick(item)}
              onChange={setDosageIntake}
              value={dosageIntake}
            />
          ))}
          <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
            <TouchableOpacity style={[styles.mainBtn, { width: '100%' }]} onPress={onSaveClick}>
              <Text style={{ fontSize: 12, color: '#FFF' }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast config={ToastConfig} />
      </View>}
    </ScrollView>
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.modalStyle}>
      <Toast config={ToastConfig} />
        <View style={styles.modalViewContainer}>
          <LabeledInput
            label={'Specify Brand'}
            marginLeft={5}
            value={brand}  
            handle={(val) => setBrand(val)}
            color={"black"} />
          <View style={styles.modalBtnContainer}>
            <TouchableOpacity style={[styles.transparentBtn, { width: '40%', height: 50, marginHorizontal: 10 }]} onPress={() => setIsVisible(!isVisible)}>
              <Text style={{ fontSize: 12 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mainBtn, { width: '40%', marginHorizontal: 10 }]} onPress={() => onConfirmModal()}>
              <Text style={{ fontSize: 12, color: '#FFF' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </SafeAreaView>
  )
}

const CustomRadioBtn = ({ id, onPress, selected, label, value, onChange }) => {
  const textChange = (val) =>
    onChange(val)

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={customStyles.body}>
      <View style={customStyles.titleContainer}>
        <Text style={{ fontWeight: 'bold' }}>{label}</Text>
        <View style={customStyles.radioBtn}>
          { selected && <Icon name="check" size={15} style={{ color: '#E15C63' }} /> }
        </View>
      </View>
      <TextContent id={id} />
      { id === 1 && <View style={{ margin: 10 }}>
        <TextInput
          editable={selected}
          selectTextOnFocus={selected}
          textAlign="center"
          placeholder="Input Factor VII Dosage Intake"
          keyboardType="numeric"
          style={customStyles.input}
          value={value}
          onChangeText={(val) => textChange(val)}/>
        </View>}
    </TouchableOpacity>
  )
}

const TextContent = ({ id }) => {
  return id === 0 
          ? (
            <View style={{ paddingLeft: 5, paddingRight: 10 }}>
              {firstAidProps.map((item) => (
                <View key={item.id} style={{ flexDirection: 'row', marginVertical: 5 }}>
                  <Text style={{ fontSize: 13 }}>{item.id}. </Text>
                  <Text style={{ textAlign: 'justify', fontSize: 13, flexShrink: 1 }}>
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>
          ) 
          : (
            <View style={{ paddingLeft: 5, paddingRight: 10 }}>
              {factorInjectProps.map((item) => (
                <View key={item.id} style={{ marginVertical: 5 }}>
                  <Text style={{ textAlign: 'justify', fontSize: 13, flexShrink: 1 }}>
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>
          )
}

const firstAidProps = [
  {
    id: 1,
    text: 'Applying something cold on the injured area, such as ice.',
  },
  {
    id: 2,
    text: 'Putting pressure on the injured area and raising the hands or the legs upward to slow down blood flow.',
  },
  {
    id: 3,
    text: 'Applying a pinch of aloe powder mixed into a paste with a pinch of turmeric powder or aloe vera gel to stop the bleeding.',
  },
  {
    id: 4,
    text: 'Applying of Ayuverdic herb Lodhra, Kushtha, and Bilva to stop the Bleeding. For continuing problems with bleeding, use 1/2 teaspoon 2 or 3 times a day.',
  },
]

const factorInjectProps = [
  {
    id: 1,
    text: 'For home self treatment, read  the product information first before using the medicine.',
  },
  {
    id: 2,
    text: 'Injecting of Factor VII into a vein, usually over 5 to 10 minutes or as directed by your doctor.',
  },
  {
    id: 3,
    text: 'Dosage is based on medical condition, weight, blood test results, and response to treatment.',
  },
]