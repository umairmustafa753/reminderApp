import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import {
  useRoute,
  StackActions,
  useNavigation
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { Searchbar } from "react-native-paper";
import { Input, Button } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

import UsersAction from "../store/Actions/users";
import ReminderAction from "../store/Actions/reminder";
import HorizentalList from "../components/horizentalList";
import { NAVIGATIONS } from "../constants/navigator";
import { MESSAGE, TYPE } from "../constants/constant";
import styles from "../styles";

const Reminder = (props) => {
  const route = useRoute();
  const navigator = useNavigation();

  const [search, setSearch] = useState<string>("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (search !== props?.user?.email) props.getUsers({ email: search });
    else props.getUsers({ email: "" });
  };

  const handleBack = () => {
    const popAction = StackActions.pop(1);
    navigator.dispatch(popAction);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setDate(date);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showToast = (msg: string, type: string) => {
    Toast.show({
      type: `${type}`,
      position: "top",
      text1: `${msg}`,
      autoHide: true,
      topOffset: 50
    });
  };

  const handleNavigate = () => {
    navigator.reset({
      routes: [
        {
          name: NAVIGATIONS.SUCCESS,
          params: {
            msg: MESSAGE.SUCCESS_REMINDER_MESSAGE,
            navigateTo: NAVIGATIONS.DASHBOARD
          }
        }
      ]
    });
  };

  useEffect(() => {
    if (props?.users) {
      const usersArray = Object.values(props?.users);
      if (
        !users.some((ele) => ele?.email === usersArray[0]?.email) &&
        usersArray[0]
      )
        setUsers((users) => [...users, usersArray[0]]);
    }
  }, [props?.users]);

  useEffect(() => {
    if (props?.reminder?.success) handleNavigate();
  }, [props?.reminder?.success]);

  const removeUser = (user) => {
    setUsers(users.filter((ele) => ele?.email !== user?.email));
  };

  const checkDate = (date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const dif = ((targetDate.getTime() - currentDate.getTime()) / 1000).toFixed(
      0
    );
    return dif;
  };

  const handleSave = () => {
    const seconds = checkDate(date);
    if (!title || !title.trim().length) {
      showToast(MESSAGE.FAILED_ADD_TITLE, TYPE.ERROR);
    } else if (!message || !message.trim().length) {
      showToast(MESSAGE.FAILED_ADD_MESSAGE, TYPE.ERROR);
    } else if (!date || seconds < "0") {
      showToast(MESSAGE.FAILED_TO_ADD_DATE_TIME, TYPE.ERROR);
    } else {
      const obj = {
        user_uid: props?.user?.uid,
        user_email: props?.user?.email,
        user_name: `${props?.user?.first_name} ${props?.user?.last_name}`,
        title: title,
        note: message,
        users: users,
        date: new Date(date).getTime(),
        seconds: seconds
      };
      props.addReminder(obj);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={30}
      style={styles.container}
    >
      <Toast ref={(ref) => Toast.setRef(ref)} style={styles.zIndex} />
      <ScrollView>
        <Spinner
          visible={props?.loading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <StatusBar style="light" />
        <View style={styles.reminderContainer}>
          <Icon
            name="arrow-back"
            style={styles.backIcon}
            onPress={handleBack}
          />
          <Searchbar
            placeholder="Search email"
            scrollEnabled={Platform.OS === "ios" ? false : true}
            onChangeText={(e) => {
              setSearch(e);
            }}
            value={search}
            icon={"account-search-outline"}
            onEndEditing={handleSearch}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <View style={styles.mTop5} />
          <HorizentalList
            users={users}
            onPress={removeUser}
            iconType="remove"
            info="No user found"
          />
          <View style={styles.mTop} />
          <Input
            scrollEnabled={false}
            placeholderTextColor="white"
            placeholder="Title"
            style={styles.textBox}
            onChangeText={(value) => setTitle(value)}
            leftIcon={{
              type: "font-awesome",
              color: "white",
              name: "pencil-square"
            }}
          />
          <Input
            multiline
            scrollEnabled={false}
            placeholderTextColor="white"
            placeholder="Message"
            style={styles.textBox}
            onChangeText={(value) => setMessage(value)}
          />
          <Button
            buttonStyle={styles.reminderButton}
            icon={
              <Icon
                name="calendar"
                color="#ffffff"
                size={20}
                style={styles.right10}
              />
            }
            onPress={showDatePicker}
            title={
              date
                ? moment(date, "YYYY-MM-DD HH:mm:ss").format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
                : "Pick Date and Time"
            }
          />
          <View style={styles.mTop} />
          <Button
            buttonStyle={styles.reminderButton}
            icon={
              <Icon
                name="save"
                color="#ffffff"
                size={20}
                style={styles.right10}
              />
            }
            disabled={props?.loading}
            onPress={handleSave}
            title="Save"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.obj,
    users: state?.usersReducer?.users,
    reminder: state?.reminderReducer?.reminder,
    loading: state?.usersReducer?.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (obj) => {
      dispatch(UsersAction.GetUsers(obj));
    },
    addReminder: (obj) => {
      dispatch(ReminderAction.Add(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
