import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native'
import { VictoryStack, VictoryBar, VictoryChart, VictoryLegend, VictoryTheme, VictoryAxis } from 'victory-native'
import { CalculateYaxisValue } from '../common/math_helper';
const { width } = Dimensions.get('window')

export const StackedBarGraph = ({ title, records, dataLegend, height, yValues }) => {
  const [yAxisValues, setYAxisValues] = useState([])

  const GetYValues = async () => {
    let ys = []
    for(var x = 0; x < 4; x++)
    {
      let val = 0
      for(var y = 0; y < yValues.length; y++)
        val += yValues[y][x]
      
      ys.push(val)
    }

    return await CalculateYaxisValue(ys)
  }

  useEffect(() => {
     GetYValues().then(x => setYAxisValues(x))
  }, [])

  const DataLegendWidth = dataLegend.length === 3 
    ? width / 4 
    : width / 3

  const VictoryStackColors = dataLegend.length === 3 
    ? ['#e15c6e', '#ed9da1', '#e86d6b'] 
    : ['#e15c6e', '#ed9da1']
    
  return (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
      }}>
      <View style={{ marginVertical: 5, marginLeft: 10 }}>
        <VictoryChart
          height={height}
          domainPadding={{ x: 35, y: 20 }}
          theme={VictoryTheme.material}>
          <VictoryLegend
            x={width / 25}
            y={0}
            title={title}
            orientation="horizontal"
            gutter={20}
            style={{
              title: { fontSize: 15, fill: '#000', fontWeight: 'bold' },
            }}
            data={[]} />
          <VictoryLegend
            x={DataLegendWidth}
            y={20}
            orientation="horizontal"
            gutter={20}
            data={dataLegend} />
          <VictoryAxis
            tickCount={4}
            tickValues={yAxisValues}
            tickFormat={ (t) => {
              return Number.isInteger(t) ? 
                t
                : null
            }}
            dependentAxis={true} />
          <VictoryAxis
            tickCount={4} />
          {records.length > 0 && <VictoryStack colorScale={VictoryStackColors}>
              <VictoryBar
                barWidth={width / 7}
                data={ records[0] } />
              <VictoryBar
                barWidth={width / 7}
                data={ records[1] } />
              {records.length === 3 && <VictoryBar
                barWidth={width / 7}
                data={ records[2] } />}
            </VictoryStack>}
        </VictoryChart>
      </View>
    </View>
  )
}


