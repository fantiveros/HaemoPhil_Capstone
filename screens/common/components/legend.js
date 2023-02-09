import { View, Text } from "react-native"
import { legendStyles } from "../../common_styles/legend"

export function Legend({ name, color }) {
  return (
    <View style={legendStyles.container}>
      <View style={[legendStyles.icon, { backgroundColor: color }]} />
      <Text numberOfLines={1} style={[legendStyles.text, { color: color }]}>
        {name}
      </Text>
    </View>
  )
}
