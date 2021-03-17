import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
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
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          onPress={() => console.log('notes tapped!')}>
          <Icon name="md-create" style={Styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Notifications"
          onPress={() => {}}>
          <Icon name="md-notifications-off" style={Styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="All Tasks"
          onPress={() => {}}>
          <Icon name="md-done-all" style={Styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
};

export default Dashboard;
