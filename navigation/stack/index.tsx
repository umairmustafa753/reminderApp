import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Auth from '../../screens/auth';
import {StackParamList} from '../types';

const Stack = createStackNavigator<StackParamList>();

const StackScreens = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={'Auth'}>
      <Stack.Screen name={'Auth'} component={Auth} />
    </Stack.Navigator>
  );
};

export default StackScreens;
