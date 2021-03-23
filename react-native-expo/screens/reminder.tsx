import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import {
  useRoute,
  StackActions,
  useNavigation
} from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from "react-native-action-button";
import { connect } from "react-redux";
import { Searchbar } from "react-native-paper";
import { Input, Button } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import UsersAction from "../store/Actions/users";
import Wavy from "../components/wavy";
import styles from "../styles";

const Reminder = (props) => {
  const route = useRoute();
  const navigator = useNavigation();

  const [search, setSearch] = useState<string>("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [users, setUsers] = useState([]);

  const handleSearch = (e) => {
    setSearch(e);
    props.getUsers({ email: e });
  };

  const handleBack = () => {
    const popAction = StackActions.pop(1);
    navigator.dispatch(popAction);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleDateConfirm = (date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const dif = ((targetDate.getTime() - currentDate.getTime()) / 1000).toFixed(
      0
    );
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    if (props?.users) {
      const usersArray = Object.values(props?.users);
      setUsers(usersArray);
    } else {
      setUsers([]);
    }
  }, [props?.users]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Wavy
        customStyles={styles.svgCurve}
        customHeight={545}
        customTop={360}
        customBgColor="#118571"
        customWavePattern="M0,32L60,58.7C120,85,240,139,360,160C480,181,600,171,720,138.7C840,107,960,53,1080,64C1200,75,1320,149,1380,186.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      />
      <View style={styles.reminderContainer}>
        <Icon name="arrow-back" style={styles.backIcon} onPress={handleBack} />
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearch}
          value={search}
        />
        {users.length ? (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.cardView}>
              {users?.map((u, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.horizentalList, styles.mTop]}
                  >
                    <UserAvatar
                      size={60}
                      key={u?.profile_picture}
                      name={`${u?.first_name} ${u?.last_name}`}
                      src={u?.profile_picture}
                      style={styles.avatar}
                    />
                    <Text
                      style={[
                        styles.textCenter,
                        styles.whiteText,
                        styles.mTop5
                      ]}
                    >
                      {`${u?.first_name} ${u?.last_name}`.length > 5
                        ? `${u?.first_name} ${u?.last_name}`?.substring(0, 5) +
                          "..."
                        : `${u?.first_name} ${u?.last_name}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <>
            <Text style={[styles.textCenter, styles.whiteText, styles.mTop5]}>
              No users found
            </Text>
            <Text style={[styles.textCenter, styles.whiteText, styles.mTop5]}>
              Hint: Search with exact email.
            </Text>
          </>
        )}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          date={new Date()}
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.mTop} />
        <Input
          multiline
          placeholder="Message"
          style={styles.textBox}
          placeholderTextColor="white"
          leftIcon={{
            type: "font-awesome",
            name: "pencil-square-o",
            color: "white"
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
          title="Pick Date and Time"
        />
      </View>
      <ActionButton
        buttonColor="#3b5c5e"
        degrees={0}
        renderIcon={() => {
          return <Icon name="add" style={styles.actionButtonIcon} />;
        }}
      >
        <ActionButton.Item
          buttonColor="#0d917a"
          title="Save"
          onPress={() => {}}
        >
          <Icon
            name="ios-checkmark-done-outline"
            style={styles.actionButtonIcon}
          />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
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
