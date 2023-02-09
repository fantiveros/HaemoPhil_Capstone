import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-web';
import { Row } from '../../common/Table/row';

export const Table = () => 
{
    const data = [1, 2];
    
    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {data.map((x, i) => 
                {
                    return <Row key={i} />
                })}
            </View>
        </ScrollView>
    )
}
  