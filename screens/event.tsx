import React from 'react';
import {Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

const Event = () => {
  const route = useRoute();
  return <Text>{route?.params?.date}</Text>;
};

export default Event;
