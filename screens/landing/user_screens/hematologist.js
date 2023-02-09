import React, { useState } from 'react'
import { View, Text, BackHandler, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { styles } from '../styles'
import { useFocusEffect } from '@react-navigation/native'
import { StackedBarGraph } from '../stackedChart'
import { C_Factor7, C_Factor8, C_Factor9 } from '../../common/constants/user_constants'
import { RetrieveFactorConcentrateCounts } from '../service'
import { MONTH_LIST } from '../../common/constants/user_constants'

export class Hematologist extends React.Component {
  render() {
    return <HematologistScreen />
  }
}

const HematologistScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [allRecords, setAllRecords] = useState([])

    useFocusEffect(
        React.useCallback(() => {
          GetVisitationInfusionData()
          const onBackPress = () => {
            return true
          };

            const eventHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => eventHandler.remove();
        }, [])
    );

    const GetYvalues = () => allRecords.map(records => records.map(record => record.y))

    const GetVisitationInfusionData = async () =>
      await RetrieveFactorConcentrateCounts()
      .then(res => {
        setAllRecords([RecentMonthsForFactor7(res), RecentMonthsForFactor8(res), RecentMonthsForFactor9(res)])
      })
      .catch(res => console.error(res))
    
  return (
    <SafeAreaView style={{backgroundColor: '#FFF', height: height }}>
      <ScrollView
        style={{ width: '100%' }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', paddingTop: 10 }}>
          {allRecords && allRecords.length > 0
          ? <StackedBarGraph 
          title={'Factor Concentrate in Recent Four Month'} 
          records={allRecords} 
          dataLegend={DataLegend}
          height={height - 200}
          yValues={GetYvalues()} />
          : <Text>No records found</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const {height} = Dimensions.get('window')

const DataLegend = 
[
  { name: C_Factor7, symbol: { fill: '#ed9da1', type: 'square' } },
  { name: C_Factor8, symbol: { fill: '#e15c6e', type: 'square' } },
  { name: C_Factor9, symbol: { fill: '#e86d6b', type: 'square' } },
]

const RecentMonthsForFactor7 = (records) => 
  [{ x: MONTH_LIST[records[3].month], y: records[3].factor7 },
  { x: MONTH_LIST[records[2].month], y: records[2].factor7 },
  { x: MONTH_LIST[records[1].month], y: records[1].factor7 },
  { x: MONTH_LIST[records[0].month], y: records[0].factor7 }]

const RecentMonthsForFactor8 = (records) =>
    [{ x: MONTH_LIST[records[3].month], y: records[3].factor8 },
    { x: MONTH_LIST[records[2].month], y: records[2].factor8 },
    { x: MONTH_LIST[records[1].month], y: records[1].factor8 },
    { x: MONTH_LIST[records[0].month], y: records[0].factor8 }]

const RecentMonthsForFactor9 = (records) =>
    [{ x: MONTH_LIST[records[3].month], y: records[3].factor9 },
    { x: MONTH_LIST[records[2].month], y: records[2].factor9 },
    { x: MONTH_LIST[records[1].month], y: records[1].factor9 },
    { x: MONTH_LIST[records[0].month], y: records[0].factor9 }]
