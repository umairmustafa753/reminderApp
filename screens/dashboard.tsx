import React, {useState, useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {CalendarList} from 'react-native-calendars';

import Styles from '../styles';

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        degrees={0}
        renderIcon={() => {
          return <Icon name="person-outline" style={Styles.actionButtonIcon} />;
        }}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Edit Profile"
          onPress={() => {}}>
          <Icon name="md-pencil" style={Styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
};

export default Dashboard;
