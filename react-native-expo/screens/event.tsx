import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Text, View, Image, ScrollView } from "react-native";
import {
  useRoute,
  StackActions,
  useNavigation
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Header, Card, Button } from "react-native-elements";
import ActionButton from "react-native-action-button";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";

import { NAVIGATIONS } from "../constants/navigator";
// import { remindersProps } from "../constants/types";
import styles from "../styles";

const Event = (props) => {
  const route = useRoute();
  const navigator = useNavigation();

  const [remindersData, setRemindersData] = useState({
    reminders: [],
    dates: []
  });

  const handleBack = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  const handleAdd = () => {
    navigator.navigate(NAVIGATIONS.REMINDER);
  };

  useEffect(() => {
    if (props?.reminders) {
      const remindersArray = Object.values(props?.reminders);
      const filterReminders = remindersArray.filter(
        (reminder) =>
          moment
            .unix(reminder?.date / 1000, "YYYY-MM-DD")
            .format("YYYY-MM-DD") == route?.params?.date
      );
      const datesArray = filterReminders.map((reminder) =>
        moment
          .unix(reminder?.date / 1000, "YYYY-MM-DD HH:mm:ss")
          .format("YYYY-MM-DD HH:mm:ss")
      );
      setRemindersData({ reminders: filterReminders, dates: datesArray });
    }
  }, [props?.reminders]);

  return (
    <ScrollView>
      <StatusBar style="inverted" />
      <Header
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          onPress: handleBack
        }}
        rightComponent={{ icon: "event-note", color: "#fff" }}
      />
      <Card>
        {remindersData?.reminders?.length ? (
          <Card.Title>{remindersData?.reminders.length} Reminders</Card.Title>
        ) : (
          <Card.Title>No Reminders</Card.Title>
        )}
        <Card.Divider />
        <View>
          <Image
            resizeMode="cover"
            style={styles.logoImageWithSelf}
            source={require("../assets/logo.png")}
          />
          <View style={styles.bottom20} />
          <Text style={styles.textCenter}>For {route?.params?.date}</Text>
        </View>
      </Card>
      {remindersData?.reminders?.map((reminder, index) => {
        return (
          <Card wrapperStyle={styles.mBottom50}>
            <Card.Title>{remindersData?.dates[index]}</Card.Title>
            <Card.Divider />
            <View>
              <Text style={styles.bottom20}>{reminder.note}</Text>
              {reminder?.users?.length && (
                <Text style={styles.bottom20}>People Include in Reminder</Text>
              )}
            </View>
            {reminder?.users?.map((u, i) => {
              return (
                <>
                  <Card.Divider />
                  <View key={i} style={styles.cardView}>
                    <UserAvatar
                      size={60}
                      key={u.profile_picture}
                      name={`${u?.first_name} ${u?.last_name}`}
                      src={u.profile_picture}
                      style={styles.avatar}
                    />
                    <Text style={styles.username}>
                      {" "}
                      {`${u?.first_name} ${u?.last_name}`.length > 15
                        ? `${u?.first_name} ${u?.last_name}`.substring(0, 15) +
                          "..."
                        : `${u?.first_name} ${u?.last_name}`}
                    </Text>
                  </View>
                </>
              );
            })}
            <ActionButton
              buttonColor="#1C70CA"
              degrees={0}
              size={50}
              style={styles.mBottomM80}
              renderIcon={() => {
                return (
                  <Icon name="md-newspaper" style={styles.actionButtonIcon} />
                );
              }}
            >
              <ActionButton.Item
                buttonColor="#CA1C3B"
                title="Delete Reminder"
                onPress={() => {}}
              >
                <Icon name="md-trash-bin" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor="#1ABFA6"
                title="Edit Reminder"
                onPress={() => {}}
              >
                <Icon name="md-pencil" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          </Card>
        );
      })}
      <Card>
        <Button
          buttonStyle={styles.buttonBackground}
          icon={
            <Icon
              name="ios-calendar-outline"
              color="#ffffff"
              size={20}
              style={styles.right10}
            />
          }
          onPress={handleAdd}
          title="Add Reminder"
        />
      </Card>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.obj,
    loading: state.userReducer.loading,
    reminders: state.reminderReducer.reminders
  };
};

export default connect(mapStateToProps, null)(Event);
