import React, { useState } from "react"
import { Text, TextInput, View, Pressable } from "react-native"
import {Color} from "../../common_styles/colors"
import Icon from "react-native-vector-icons/MaterialIcons"

export const ClickableInput = ({
    label,
    placeholder,
    onPress
}) => {
  return (
    <View style={{ width: "100%" }}>
      <Text style={[Color.secondary, { fontSize: 10 }]}>{label}</Text>
      <Pressable onPress={onPress}>
        <View
          pointerEvents="none"
          style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="chevron-right"
            size={25}
            style={[Color.primary, { position: "absolute", right: 0 }]}
          />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={"#000"}
            style={{
              borderBottomColor: "#d2d2d2",
              borderBottomWidth: 1,
              paddingBottom: 10,
              flex: 1,
            }}
          />
        </View>
      </Pressable>
    </View>
  )
}
