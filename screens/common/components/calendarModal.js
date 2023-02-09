import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Modal, Dimensions } from 'react-native';
import { styles } from '../../landing/styles';
import DatePicker from "react-native-modern-datepicker"

export const CustomCalendarModal = ({ dateNow, pickedDate, onSelectChange, onCancel, onConfirm, isVisible }) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <View
        style={styles.modalStyle}>
          <View style={styles.modalViewContainer}>
          <DatePicker
          options={{
            backgroundColor: '#ffcacc',
            textHeaderColor: '#000',
            textDefaultColor: '#000',
            selectedTextColor: '#fff',
            mainColor: '#eb666b',
            textSecondaryColor: '#000',
            borderColor: 'transparent',
            textFontSize: 12,
          }}
          mode="calendar"
          maximumDate={dateNow}
          current={pickedDate}
          selected={pickedDate}
          style={{ borderRadius: 10 }}
          onSelectedChange={onSelectChange}
        />
        <View style={styles.modalBtnContainer}>
          <TouchableOpacity
            onPress={onCancel}
            style={[ styles.transparentBtn, { width: '40%', marginHorizontal: 10 } ]}>
            <Text style={{ color: '#E15C63' }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            style={[ styles.mainBtn, { width: '40%', marginHorizontal: 10 } ]}>
            <Text style={{ color: '#FFF' }}>Confirm</Text>
          </TouchableOpacity>
        </View>
          </View>
      </View>
    </Modal>
  )
}