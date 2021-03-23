import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ActionButton from "react-native-action-button";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { CalendarList } from "react-native-calendars";

import { NAVIGATIONS } from "../constants/navigator";
import UserAction from "../store/Actions/user";
import NotificationAction from "../store/Actions/notification";
import Loader from "../components/loader";
import styles from "../styles";

const Dashboard = (props) => {
  const navigator = useNavigation();
  const route = useRoute();

  const [user, setUser] = useState({});

  const handleSignOut = async () => {
    firebase.auth().signOut();
    navigator.reset({ routes: [{ name: NAVIGATIONS.LOGIN }] });
  };

  useEffect(() => {
    if (!props?.user?.email) {
      props.getUser({ uid: route?.params?.uid });
      setUser(props.user);
    } else {
      setUser(props.user);
    }
  }, [props?.loading]);

  useEffect(() => {
    pushNotification();
  }, []);

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
            markedDates={{
              "2021-03-16": {
                selected: true,
                marked: true
              }
            }}
          />
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
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
    loading: state.userReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (obj) => {
      dispatch(UserAction.GetUser(obj));
    },
    registerForPushNotifications: (obj) => {
      dispatch(NotificationAction.RegisterForPushNotifications(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
