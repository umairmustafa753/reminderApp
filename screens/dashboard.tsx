import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {CalendarList} from 'react-native-calendars';

import Styles from '../styles';

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const customStyle = {
    hasEventCircle: {
      backgroundColor: 'grey',
    },
    hasEventDaySelectedCircle: {
      backgroundColor: 'red',
    },
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Spinner visible={loading} textStyle={Styles.loaderContent} />
      <CalendarList
        theme={{
          textDayFontWeight: '300',
          textDayHeaderFontWeight: '300',
        }}
        pastScrollRange={50}
        futureScrollRange={50}
        scrollEnabled={true}
        showScrollIndicator={true}
        markedDates={{
          '2021-03-16': {
            selected: true,
            marked: true,
          },
        }}
      />
    </>
  );
};

export default Dashboard;
