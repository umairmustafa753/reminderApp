import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";
import ActionButton from "react-native-action-button";
import { Header, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

import { remindersProps } from "../constants/types";
import styles from "../styles";

const Notification = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [reminders, setReminders] = useState<remindersProps[]>([
    {
      date: "2020-12-12",
      time: "11:30 PM",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis itaque autem praesentium molestias consequuntur? Eaque sapiente, doloremque aut rem dolorem dolore, et nulla quidem officiis ut vero cumque ducimus odio!",
      users: [
        {
          name: "brynn",
          avatar: "https://i.pravatar.cc/300"
        },
        {
          name: "Alex",
          avatar: "https://i.pravatar.cc/300"
        },
        {
          name: "Jhon",
          avatar: "https://i.pravatar.cc/300"
        }
      ]
    },
    {
      date: "2020-21-23",
      time: "11:30 PM",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis itaque autem praesentium molestias consequuntur? Eaque sapiente, doloremque aut rem dolorem dolore, et nulla quidem officiis ut vero cumque ducimus odio!",
      users: [
        {
          name: "brynn",
          avatar: "https://i.pravatar.cc/300"
        }
      ]
    }
  ]);
  const navigator = useNavigation();
  const handleBack = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  return (
    <ScrollView>
      <StatusBar style="inverted" />
      <Header
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          onPress: handleBack
        }}
        rightComponent={{ icon: "notifications-active", color: "#fff" }}
      />
      {reminders?.map((reminder) => {
        return (
          <>
            {reminder?.users?.map((u, i) => {
              return (
                <Card>
                  <Card.Title>{reminder?.time}</Card.Title>
                  <Card.Divider />
                  <View key={i} style={[styles.cardView, styles.bottom20]}>
                    <UserAvatar
                      size={60}
                      key={u.avatar}
                      name={u.name}
                      src={u.avatar}
                      style={styles.avatar}
                    />
                    <Text style={styles.username}>
                      {" "}
                      {u.name.length > 15
                        ? u.name.substring(0, 15) + "..."
                        : u.name}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.bottom20}>
                      {u.name} requsted you to add this reminder
                    </Text>
                    <Text style={styles.bottom20}>{reminder?.message}</Text>
                    <Text style={styles.bottom20}>requsted user 4</Text>
                  </View>
                  <ActionButton
                    buttonColor="#1C70CA"
                    degrees={0}
                    size={50}
                    style={styles.Mbottom35}
                    renderIcon={() => {
                      return (
                        <Icon
                          name="md-options-sharp"
                          style={styles.actionButtonIcon}
                        />
                      );
                    }}
                  >
                    <ActionButton.Item
                      buttonColor="#CA1C3B"
                      title="Delete"
                      onPress={() => {}}
                    >
                      <Icon
                        name="md-trash-bin"
                        style={styles.actionButtonIcon}
                      />
                    </ActionButton.Item>
                    <ActionButton.Item
                      buttonColor="#1ABFA6"
                      title="Accept"
                      onPress={() => {}}
                    >
                      <Icon
                        name="md-checkbox"
                        style={styles.actionButtonIcon}
                      />
                    </ActionButton.Item>
                  </ActionButton>
                </Card>
              );
            })}
          </>
        );
      })}
    </ScrollView>
  );
};

export default Notification;
