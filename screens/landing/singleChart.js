import * as React from 'react'
import { View, Dimensions } from 'react-native'
import { VictoryBar, VictoryChart, VictoryLegend, VictoryTheme, VictoryAxis } from 'victory-native'
import { CalculateYaxisValue } from '../common/math_helper';

const { width } = Dimensions.get('window')

export const SingleBarGraph = ({title, records, dataLegend, yValues}) => {
  const GetYValues = () => {
    let ys = []
    for(var x = 0; x < 4; x++)
    {
      const val = yValues[x]
      ys.push(val)
    }

    return CalculateYaxisValue(ys)
  }

  return (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
      }}>
      <View style={{ marginLeft: 10 }}>
        <VictoryChart
          domainPadding={{ x: 35, y: 5 }}
          theme={VictoryTheme.material}>
          <VictoryLegend
            x={width / 25}
            y={10}
            title={title}
            orientation="horizontal"
            gutter={20}
            style={{
              title: { fontSize: 15, fill: '#000', fontWeight: 'bold' },
            }}
            data={dataLegend}
          />
          <VictoryAxis
            tickCount={4}
            tickValues={GetYValues()}
            tickFormat={ (t) => {
              return Number.isInteger(t) ? 
                t
                : null
            }}
            dependentAxis={true} />
          <VictoryBar
            barWidth={width / 7}
            data={records}
            style={{ data: { fill: '#e15c6e' } }}
          />
        </VictoryChart>
      </View>
    </View>
  )
}
