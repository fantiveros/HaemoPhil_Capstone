import React from 'react';
import { ActivityIndicator} from 'react-native';
import { Patient } from '../user_screens/patient';
import { Hematologist } from '../user_screens/hematologist';
import { UserPatient, UserHematologist } from '../../common/constants/user_constants';
export class Home extends React.Component {

  render() {
    if(this.props.userType == UserPatient)
      return <Patient /> 
    
    if(this.props.userType == UserHematologist)
      return <Hematologist />

    return <ActivityIndicator size="large" />
  }
}

