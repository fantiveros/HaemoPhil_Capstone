import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions, BackHandler, ActivityIndicator } from "react-native"
import { styles } from "../styles"
import { StackedBarGraph } from "../stackedChart"
import { SingleBarGraph } from '../singleChart';
import { useFocusEffect } from '@react-navigation/native'
import { RetrieveVisitationInfusionData, RetrieveBleedingAreaData } from '../service';
import { useNavigation } from '@react-navigation/native'
import { DataRows } from '../../common/Table/row';
import { C_FactorInject, C_FirstAid, MONTH_LIST,C_Visitation } from '../../common/constants/user_constants';

export class Patient extends React.Component {

  render() {
    return <PatientScreen />
  }
}

const PatientScreen = () => {
  const navigation = useNavigation()
    const [visitationInfusionData, setVisitationInfusionData] = useState([])
    const [bleedingAreaData, setBleedingAreaData] = useState([])
    const [isAreaBleeding, setIsAreaBleeding] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [recentMonthsForBleedingEventForGraph, setRecentMonthsForBleedingEventForGraph] = useState([])
    const [recentMonthsForVisitationInfusionForGraph, setRecentMonthsForVisitationInfusionForGraph] = useState([])
    const [recentMonthsForBleedingEvent, setRecentMonthsForBleedingEvent] = useState([])
    const [recentMonthsForVisitationInfusion, setRecentMonthsForVisitationInfusion] = useState([])
    const [yValuesForBleedingEvent, setYValuesForBleedingEvent] = useState([])
    const [yValuesForVistationInfusion, setYValuesForVistationInfusion] = useState([])
  
    const GetRecentMonthsData = (res) =>
    {
      let data = [];
      let currentMonth = new Date().getMonth()
      for(var x = 0; x < 4; x++)
      {
        var month = GetMonthInt(currentMonth, x)
        var recentData = res.filter(data => data.dateTime.getMonth() == month)

        data = data.concat(GetSeriableResult(recentData))
      }
     
      return data
    }

    const GetSeriableResult = (res) => {
      var serialize = res.map(record => {
        return {...record, dateTime: record.dateTime.toDateString()}
      })

      return serialize
    }

    const GetRecentMonthsForBleedingEventForGraph = (res) => {
      const factorInject = res.filter(x => x.dosage.length > 0)
      const firstAid = res.filter(x => x.dosage.length == 0)

      let months = [];
      let currentMonth = new Date().getMonth()
      for(var x = 0; x < 4; x++)
      {
        var month = GetMonthInt(currentMonth, x)
        var inject = factorInject.filter(data => data.dateTime.getMonth() == month)
        var aid = firstAid.filter(data => data.dateTime.getMonth() == month)

        months.push({month: month, firstInject: inject.length, firstAid: aid.length})
      }
  
      return months
    }

    const GetRecentMonthsForVisitationInfusionForGraph = (res) => {
      let months = [];
      let currentMonth = new Date().getMonth()
      for(var x = 0; x < 4; x++)
      {
        var month = GetMonthInt(currentMonth, x)
        var data = res.filter(data => data.dateTime.getMonth() == month)
        
        months.push({month: month, data: data.length})
      }
  
      return months
    }
    
    useFocusEffect(
      React.useCallback(() => {
        GetVisitationInfusionData()
        GetBleedingAreaData()
        const onBackPress = () => {
          return true
        };
        const eventHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => eventHandler.remove();
      }, [])
    );
  
    const GetVisitationInfusionData = async () =>
      await RetrieveVisitationInfusionData((val) => setIsLoading(val))
      .then(res => {
        var allData = GetSeriableResult(res)
        setVisitationInfusionData(allData)
        const tempVisitationInfusionData = RecentMonthsForVisitationInfusion(GetRecentMonthsForVisitationInfusionForGraph(res));
        setRecentMonthsForVisitationInfusionForGraph(tempVisitationInfusionData)
        setRecentMonthsForVisitationInfusion(GetRecentMonthsData(res))
        setYValuesForVistationInfusion(tempVisitationInfusionData.map(record => record.y))
        setIsLoading(false)

      })
      .catch(res => setIsLoading(false))

    const GetBleedingAreaData = async () =>
      await RetrieveBleedingAreaData((val) => setIsLoading(val))
      .then(res => {
        var allData = GetSeriableResult(res)
        setBleedingAreaData(allData)
        const tempBleedingArea = [
          RecentMonthsForFirstInject(GetRecentMonthsForBleedingEventForGraph(res)), 
          RecentMonthsForFirstAid(GetRecentMonthsForBleedingEventForGraph(res))
        ]
        setRecentMonthsForBleedingEventForGraph(tempBleedingArea)
        setYValuesForBleedingEvent(tempBleedingArea.map(records => records.map(record => record.y)))
        setRecentMonthsForBleedingEvent(GetRecentMonthsData(res))
        setIsLoading(false)
      })
      .catch(res => setIsLoading(false))

    return (
      <ScrollView
        style={{ width: '100%' }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={[styles.container, {paddingVertical: 10}]}
          pointerEvents={isLoading ? 'none' : 'auto'}>
          <View>
          {(isAreaBleeding && recentMonthsForBleedingEventForGraph.length > 0 && yValuesForBleedingEvent.length > 0)
            && <StackedBarGraph 
                records={recentMonthsForBleedingEventForGraph}
                dataLegend={DataLegendForBleedingEvent} 
                title={'Bleeding Event in the Past 4 Months'}
                yValues={yValuesForBleedingEvent} />}
         {(!isAreaBleeding && recentMonthsForVisitationInfusionForGraph.length > 0 && yValuesForVistationInfusion.length > 0) 
            && <SingleBarGraph 
                records={recentMonthsForVisitationInfusionForGraph}
                dataLegend={[]}
                title={'Visitation Infusion in the Past 4 Months'}
                yValues={yValuesForVistationInfusion} />}
          </View>
          <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
            <View style={styles.scrollViewTitle}>
              <TouchableOpacity
                activeOpacity={1}
                style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E15C63', borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10 }}
                onPress={() =>
                  setIsAreaBleeding(isAreaBleeding ? false : true)
                }>
                <Text
                  style={{ fontSize: 13, fontWeight: 'bold', color: '#E15C63'}}>
                  Recent {isAreaBleeding ? 'Bleeding' : 'Infusion'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ViewAll', {  visitationInfusionData: visitationInfusionData, bleedingAreaData: bleedingAreaData, isAreaBleeding: isAreaBleeding})}>
                <Text style={{ fontSize: 13, color: '#E15C63' }}>View All</Text>
              </TouchableOpacity>
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" animating={isLoading} />
            ) : (
              <DataRows
              filter={null}
                visitationInfusionData={recentMonthsForVisitationInfusion}
                bleedingAreaData={recentMonthsForBleedingEvent}
                isAreaBleeding={isAreaBleeding}
              />
            )}
          </View>
        </View>
      </ScrollView>
    )
   }

const DataLegendForBleedingEvent = 
[
  { name: C_FactorInject, symbol: { fill: '#e15c6e', type: 'square' } },
  { name: C_FirstAid, symbol: { fill: '#ed9da1', type: 'square' } },
]

const DataLegendForVisitation = 
  [{ name: C_Visitation, symbol: { fill: '#e15c6e', type: 'square' }}]


const RecentMonthsForFirstAid = (records) => 
  [{ x: MONTH_LIST[records[3].month], y: records[3].firstAid },
  { x: MONTH_LIST[records[2].month], y: records[2].firstAid },
  { x: MONTH_LIST[records[1].month], y: records[1].firstAid },
  { x: MONTH_LIST[records[0].month], y: records[0].firstAid }]

const RecentMonthsForFirstInject= (records) => 
  [{ x: MONTH_LIST[records[3].month], y: records[3].firstInject },
  { x: MONTH_LIST[records[2].month], y: records[2].firstInject },
  { x: MONTH_LIST[records[1].month], y: records[1].firstInject },
  { x: MONTH_LIST[records[0].month], y: records[0].firstInject }]

const RecentMonthsForVisitationInfusion = (records) => 
  [{ x: MONTH_LIST[records[3].month], y: records[3].data },
  { x: MONTH_LIST[records[2].month], y: records[2].data },
  { x: MONTH_LIST[records[1].month], y: records[1].data },
  { x: MONTH_LIST[records[0].month], y: records[0].data }]

export const GetMonthInt = (currentMonth, previousMonth) =>
{
  var month = currentMonth-previousMonth;
  if(month < 0)
    month = 12 + month

    return month
}
