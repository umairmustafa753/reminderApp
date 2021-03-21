import React, { useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import {
  useRoute,
  StackActions,
  useNavigation
} from "@react-navigation/native";
import { Header, Card, Button, Avatar } from "react-native-elements";
import ActionButton from "react-native-action-button";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";

import { NAVIGATIONS } from "../constants/navigator";
import { remindersProps } from "../constants/types";
import styles from "../styles";

const Event = () => {
  const route = useRoute();
  const navigator = useNavigation();

  const [reminders, setReminders] = useState<remindersProps[]>([
    {
      date: route?.params?.date,
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
      date: route?.params?.date,
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

  const handleBack = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  const handleAdd = () => {
    navigator.navigate(NAVIGATIONS.REMINDER);
  };

  return (
    <ScrollView>
      <Header
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          onPress: handleBack
        }}
      />
      <Card>
        {reminders?.length ? (
          <Card.Title>{reminders.length} Reminders</Card.Title>
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
      {reminders?.map((reminder) => {
        return (
          <Card>
            <Card.Title>{reminder?.time}</Card.Title>
            <Card.Divider />
            <View>
              <Text style={styles.bottom20}>{reminder?.message}</Text>
              <Text style={styles.bottom20}>People Include in Reminder</Text>
            </View>
            {reminder?.users?.map((u, i) => {
              return (
                <>
                  <Card.Divider />
                  <View key={i} style={styles.cardView}>
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
                </>
              );
            })}
            <ActionButton
              buttonColor="#1C70CA"
              degrees={0}
              size={50}
              style={styles.Mbottom20}
              renderIcon={() => {
                return (
                  <Icon
                    name="ios-star-half-outline"
                    style={styles.actionButtonIcon}
                  />
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

export default Event;
