import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Auth from '../../screens/auth';
import Dashboard from '../../screens/dashboard';
import Event from '../../screens/event';
import {StackParamList} from '../types';

const Stack = createStackNavigator<StackParamList>();

const StackScreens = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={'Auth'}>
      <Stack.Screen name={'Auth'} component={Auth} />
      <Stack.Screen name={'Dashboard'} component={Dashboard} />
      <Stack.Screen name={'Event'} component={Event} />
    </Stack.Navigator>
  );
};

export default StackScreens;
