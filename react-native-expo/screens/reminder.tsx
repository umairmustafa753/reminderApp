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
import HorizentalList from "../components/horizentalList";
import { MESSAGE, TYPE } from "../constants/constant";
import styles from "../styles";

const Reminder = (props) => {
  const route = useRoute();
  const navigator = useNavigation();

  const [search, setSearch] = useState<string>("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [enableToast, setEnableToast] = useState({
    visible: false
  });
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState({
    date: "",
    seconds: ""
  });

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
    const currentDate = new Date();
    const targetDate = new Date(date);
    const dif = ((targetDate.getTime() - currentDate.getTime()) / 1000).toFixed(
      0
    );
    if (dif < "0") showToast(MESSAGE.FAILED_TO_ADD_DATE_TIME, TYPE.ERROR);
    else setDate({ date: date, seconds: dif });
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

  useEffect(() => {
    if (props?.users) {
      const usersArray = Object.values(props?.users);
      setUsers(usersArray);
    } else {
      setUsers([]);
    }
  }, [props?.users]);

  const addUser = (user) => {
    if (!selectedUsers.some((ele) => ele?.email === user?.email))
      setSelectedUsers((users) => [...users, user]);
  };

  const removeUser = (user) => {
    setSelectedUsers(users.filter((ele) => ele?.email !== user?.email));
  };

  const handleSave = () => {
    if (!message || !message.trim().length) {
      showToast(MESSAGE.FAILED_ADD_MESSAGE, TYPE.ERROR);
    } else if (!date.date) {
      showToast(MESSAGE.FAILED_TO_ADD_DATE_TIME, TYPE.ERROR);
    }
    const obj = {
      note: message,
      users: selectedUsers,
      date: date
    };
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
          <HorizentalList
            users={users}
            onPress={addUser}
            iconType="add"
            info="No user found"
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <View style={styles.mTop5} />
          <HorizentalList
            users={selectedUsers}
            onPress={removeUser}
            iconType="remove"
            titile="Added Users"
          />
          <View style={styles.mTop} />
          <Input
            multiline
            scrollEnabled={false}
            placeholderTextColor="white"
            placeholder="Message"
            style={styles.textBox}
            onChangeText={(value) => setMessage(value)}
            leftIcon={{
              type: "font-awesome",
              color: "white",
              name: "pencil-square-o"
            }}
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
              date.date
                ? moment(date?.date, "YYYY-MM-DD HH:mm:ss").format(
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
    loading: state?.usersReducer?.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (obj) => {
      dispatch(UsersAction.GetUsers(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
