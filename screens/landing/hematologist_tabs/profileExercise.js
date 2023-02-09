import React, { useState, Component } from 'react'
import { useFocusEffect } from "@react-navigation/native"
import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles } from './styles'
import { LabeledInput } from '../../common/components/labeledInput'
import AwesomeIcon from 'react-native-vector-icons/Feather'
import * as ImagePicker from 'expo-image-picker';
import { expo_image_picker_config } from '../../common/common_config/image_config'
import { OnSaveBleedingEvents, OnDeleteBleedingEvents } from './common/service'
import { GetSuccessToast, GetFailedToast, ToastConfig } from '../../common/common_config/ToastConfig'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

export class ProfileExercise extends Component {
  render() {
    return <ProfileExerciseScreen routeParams={this.props.route.params}/>
  }
}

const ProfileExerciseScreen = ({routeParams}) => {
  const [index, setIndex] = useState(0)
  const [newForm, setNewForm] = useState([])
  const [type, setType] = useState("")
  const [uniqueId, setUniqueId] = useState("")
  const [areaName, setAreaName] = useState("")
  const [descriptionNote, setDescriptionNote] = useState("")
  const [physicalActivities, setPhysicalActivities] = useState([])
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false); 
  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      const SetState = async () => {
        setIndex(routeParams.data.physicalActivities.length)
        setNewForm(routeParams.data.physicalActivities)
        setType(routeParams.data.type)
        setAreaName(routeParams.data.areaName)
        setDescriptionNote(routeParams.data.descriptionNote)
        setPhysicalActivities(routeParams.data.physicalActivities)
        setImage(routeParams.data.image);
        setUniqueId(routeParams.data.uniqueId)
        return true
      };
      SetState();
      return () => {}
    }, [])
  );

  const addNewForm = () => {
    setIndex(index + 1)
    setNewForm([...newForm, { id: index }])
  }

  const onBleedingEventRemove = async () => {
    await OnDeleteBleedingEvents(uniqueId)
      .then(res => {
        GetSuccessToast("Successfully Deleted")
        navigation.navigate("Exercises")
      })
      .catch(res => GetFailedToast());
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(expo_image_picker_config);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const onSave = async () => {
    const finalPhysicalActivities = physicalActivities.filter(activity => activity.image || activity.description !== "")
    setIsLoading(true)
    GetSuccessToast()     
    if(!image || areaName === "" || type.length === "" || descriptionNote.length === "")
    {
      GetFailedToast("Fields cannot be empty.")
    }
    else
    {
      const bleedingEvent = 
      {
        uniqueId: new Date().toString() + areaName, 
        image: image, 
        areaName: areaName, 
        type: type, 
        descriptionNote: descriptionNote, 
        physicalActivities: finalPhysicalActivities
      }   

      await OnSaveBleedingEvents(bleedingEvent)
        .then(result => {     
            GetSuccessToast()  
            setIndex(0)
            setNewForm([])
            setType("")
            setAreaName("")
            setDescriptionNote("")
            setPhysicalActivities([])
            setImage(null);
            
        })
        .catch(result => {
          GetFailedToast()
          setIsLoading(false)
        })
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer} pointerEvents={isLoading ? 'none' : 'auto'}>
          <ActivityIndicator size="large" animating={isLoading} />
          <View style={styles.imgInnerContainer}>
            <Image
              source={image 
                ? { uri: image } 
                : require('../../../icons/camera.png')}
                style={!image ? styles.uploadIcon : styles.img}/>
          </View>
          {isEdit
            ? <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
                <Text style={styles.changeBtnText}>Change Icon</Text>
              </TouchableOpacity>
            : <View style={{ width: '100%', alignItems: 'center'}}>
                <Text style={[styles.changeBtnText, {color: '#000', marginVertical: 0, marginTop: 5}]}>{areaName}</Text>
                <Text style={[styles.descriptionText, {marginVertical: 0}]}>Type: {type}</Text>
                <Text style={styles.descriptionText}>{descriptionNote}</Text>
              </View> }
          {isEdit 
            ? <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
                <AwesomeIcon name='check-square' size={20} color={'#E15C63'}/>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            : <View style={[styles.saveBtn, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5, display: "none"}} onPress={() => setIsEdit(!isEdit)}>
                  <AwesomeIcon name='edit' size={20} color={'#E15C63'}/>
                  <Text style={styles.saveBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}} onPress={onBleedingEventRemove}>
                  <AwesomeIcon name='trash' size={20} color={'#E15C63'}/>
                  <Text style={styles.saveBtnText}>Delete</Text>
                </TouchableOpacity>
              </View> }
        </View>
        {isEdit
          ? <View pointerEvents={isLoading || isEdit ? 'none' : 'auto'}>
              <LabeledInput 
                label={'AREA NAME'}
                handle={(val) => setAreaName(val)}
                value={areaName} />
              <LabeledInput 
                label={'TYPE'}
                handle={(val) => setType(val)}
                value={type} />
              <LabeledInput
                label={'DESCRIPTION NOTES'}
                multiLine={true}
                numLines={5}
                height={100}
                align={'top'}
                handle={(val) => setDescriptionNote(val)}
                value={descriptionNote} />
              <Text style={styles.stepsText}>STEPS:</Text>
              {newForm.map((item, index) => (
                <Form key={index + 1} id={index + 1} uploadedImg={item.image} uploadedDesc={item.description} physicalActivities={physicalActivities} setPhysicalActivities={(val)=>setPhysicalActivities(val)}/>
              ))}
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[styles.mainBtn, { marginVertical: 10, width: '50%' }]}
                  onPress={() => addNewForm()}>
                  <Text style={{ fontSize: 14, color: '#FFF' }}>ADD STEP</Text>
                </TouchableOpacity>
              </View>
            </View> 
          : newForm.map((item, index) => (
              <FormUneditable key={index + 1} image={item.image} description={item.description}/>
            ))}
      </ScrollView>
      <Toast config={ToastConfig} />
    </SafeAreaView>
  )
}

const Form = ({id, physicalActivities, setPhysicalActivities, uploadedImg, uploadedDesc}) => {
  const [description, setDescription] = useState(uploadedDesc)
  const [image, setImage] = useState(uploadedImg);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(expo_image_picker_config);

    if (!result.canceled) {
      setImage(result.uri);

      setPhysicalActivity({stepDescription: "", stepImage: result.uri})
    }
  };

  const onChange = (stepDescription) => {
    setDescription(stepDescription)

    setPhysicalActivity({stepDescription: stepDescription, stepImage: null})
  }

  const setPhysicalActivity = ({stepDescription, stepImage}) => {
    const physicalActivity = {step: id, image: stepImage, description: stepDescription}
    let physicalActivitiesTemp = physicalActivities
    const exists = physicalActivitiesTemp.filter(x => x.step === id).length > 0
    if(!exists)
    {
      physicalActivitiesTemp.push(physicalActivity)
      setPhysicalActivities(physicalActivitiesTemp)
    }
    else
    {
      const final = physicalActivitiesTemp.map(pa => {
        let data = {...pa};
        if(pa.step === id)
        {
          if(stepDescription)
            data = {...pa, description: physicalActivity.description}
          if(stepImage)
            data = {...pa, image: physicalActivity.image}
        }

        return data
      })

      setPhysicalActivities(final)
    }
  }

  return (
    <View style={{marginVertical: 15}}>
      <Text style={{fontSize: 12, color: '#E15C63'}}>STEP {id}</Text>
      <View style={styles.uploadImgContainer}>
        <TouchableOpacity 
          activeOpacity={0.5} 
          style={styles.uploadImgBtn}
          onPress={pickImage}>
          <Image 
            source={image ? {uri: image} : require('../../../icons/camera.png')} 
            style={!image ? styles.uploadIcon : styles.uploadedImg}/>
        </TouchableOpacity>
      </View>
      <LabeledInput
        label={'DESCRIPTION'}
        multiLine={true}
        numLines={5}
        height={100}
        align={'top'}
        handle={(val) => onChange(val)}
        value={description} />
    </View>
  )
}

const FormUneditable = ({ image, description }) => {
  return (
    <View style={{ width: '100%', alignItems: 'center', marginVertical: 15}}>
      <Image
        source={image ? { uri: image } : require('../../../icons/camera.png')}
        style={!image ? styles.uploadIcon : styles.displayImg}
      />
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  )
}
