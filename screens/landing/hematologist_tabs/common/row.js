import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, } from 'react-native'
import { customStyles } from '../customStyles'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'

export const Row = ({ onPress, img, title, text, filter }) => {
    return (
      <TouchableOpacity style={[customStyles.rowContainer, filter != null ? typeof title == "string" && typeof filter == "string" && title.toLowerCase().includes(filter.toLowerCase()) ? {}  : {display: 'none'} : null]} onPress={onPress}>
        <View>
          <Image
            source={img}
            style={customStyles.img}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
          }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
          <Text style={{ fontSize: 12, color: '#808080' }}>{text}</Text>
        </View>
        <View>
          <AwesomeIcon name="chevron-right" size={20} color={'#E15C63'} />
        </View>
      </TouchableOpacity>
    )
  }