import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ActionButton from "react-native-action-button";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { CalendarList } from "react-native-calendars";
import moment from "moment";

import { NAVIGATIONS } from "../constants/navigator";
import ReminderAction from "../store/Actions/reminder";
import UserAction from "../store/Actions/user";
import NotificationAction from "../store/Actions/notification";
import Loader from "../components/loader";
import styles from "../styles";

const Dashboard = (props) => {
  const navigator = useNavigation();
  const route = useRoute();

  const [user, setUser] = useState({});
  const [reminders, setReminders] = useState({
    dates: {}
  });

  const handleSignOut = async () => {
    firebase.auth().signOut();
    navigator.reset({ routes: [{ name: NAVIGATIONS.LOGIN }] });
  };

  useEffect(() => {
    if (!props?.user?.email) {
      props.getUser({ uid: route?.params?.uid });
    } else {
      setUser(props.user);
      props.getReminders({
        email: props?.user?.email
      });
    }
  }, [props?.loading]);

  useEffect(() => {
    pushNotification();
    props.setAddReminderSuccesFalse();
  }, []);

  useEffect(() => {
    if (props?.reminders) {
      const datesArray = Object.keys(props?.reminders)?.map((key) =>
        moment
          .unix(props?.reminders[key]?.date / 1000, "YYYY-MM-DD")
          .format("YYYY-MM-DD")
      );
      const datesObj = Object.assign({}, datesArray);
      const altdates = Object.fromEntries(
        Object.entries(datesObj).map(([key, value]) => [
          value,
          {
            selected: true,
            marked: true
          }
        ])
      );

      setReminders({ dates: altdates });
    }
  }, [props?.reminders]);

  const pushNotification = async () => {
    await props.registerForPushNotifications({ uid: route?.params?.uid });
  };

  const handleEvent = (date) => {
    navigator.navigate({
      name: NAVIGATIONS.EVENT,
      params: {
        date: date
      }
    });
  };

  const handleNotification = () => {
    navigator.navigate(NAVIGATIONS.NOTIFICATOIN);
  };

  return (
    <>
      {props.loading ? (
        <Loader loading={props.loading} />
      ) : (
        <View>
          <CalendarList
            theme={{
              textDayFontWeight: "300",
              textDayHeaderFontWeight: "300"
            }}
            pastScrollRange={50}
            futureScrollRange={50}
            scrollEnabled={true}
            showScrollIndicator={true}
            onDayPress={(day) => {
              handleEvent(day?.dateString);
            }}
            markedDates={reminders?.dates}
          />
          <ActionButton
            buttonColor="#1C70CA"
            degrees={0}
            renderIcon={() => {
              return (
                <Ionicons
                  name="person-outline"
                  style={styles.actionButtonIcon}
                />
              );
            }}
          >
            <ActionButton.Item
              buttonColor="#0ac993"
              title="Notifications"
              onPress={handleNotification}
            >
              <Ionicons
                name="md-notifications"
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#CA1C3B"
              title="Sign Out"
              onPress={handleSignOut}
            >
              <Ionicons
                name="log-out-outline"
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
          </ActionButton>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.obj,
    loading: state.userReducer.loading,
    reminders: state.reminderReducer.reminders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (obj) => {
      dispatch(UserAction.GetUser(obj));
    },
    getReminders: (obj) => {
      dispatch(ReminderAction.GetRemidners(obj));
    },
    registerForPushNotifications: (obj) => {
      dispatch(NotificationAction.RegisterForPushNotifications(obj));
    },
    setAddReminderSuccesFalse: () => {
      dispatch(ReminderAction.SetAddReminderSuccesFalse());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
