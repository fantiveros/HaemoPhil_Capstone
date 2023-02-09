import React, { useState } from 'react';
import { Text, TextInput, View } from "react-native";
import { labeledInputStyles } from "../../common_styles/labeledInput";

export const LabeledInput = ({
  marginLeft,
  marginRight,
  marginVertical,
  label,
  secureTextEntry,
  handle,
  keyboardType,
  value,
  multiLine,
  numLines,
  height,
  align,
  editable,
  color
}) => {
  return (
    <View style={{ marginLeft: marginLeft, marginRight: marginRight, marginVertical: marginVertical }}>
      <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
        {label != null 
          ? <Text style={[GetLabelColor(color), labeledInputStyles.inputMargin]}>
              {label}
            </Text>
          : null}
      </View>
      <TextInput
        style={[GetInputColor(color), {textAlignVertical: align, height: height}]}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        onChangeText={handle}
        keyboardType={keyboardType}
        value={value}
        multiline={multiLine}
        numberOfLines={numLines}
        editable={editable}
      />
    </View>
  );
}

export const GetLabelColor = (color) => {
  switch(color)
  {
    case "black":
    case "Black":
      return labeledInputStyles.inputLblBlk
    default:
      return labeledInputStyles.inputLbl
  }
}

export const GetInputColor = (color) => {
  switch(color)
  {
    case "black":
    case "Black":
      return labeledInputStyles.inputBlk
    default:
      return labeledInputStyles.input
  }
}