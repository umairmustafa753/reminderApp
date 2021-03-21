import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import UserAvatar from "react-native-user-avatar";

import { Searchbar } from "react-native-paper";

import Wavy from "../components/wavy";

import styles from "../styles";

const Reminder = () => {
  const [search, setSearch] = useState<string>("");
  const [people, setPeople] = useState([
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
    },
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
    },
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
  ]);

  const handleSearch = (e) => {
    setSearch(e);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Wavy
        customStyles={styles.svgCurve}
        customHeight={345}
        customTop={245}
        customBgColor="#118571"
        customWavePattern="M0,32L60,58.7C120,85,240,139,360,160C480,181,600,171,720,138.7C840,107,960,53,1080,64C1200,75,1320,149,1380,186.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      />
      <View style={styles.reminderContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearch}
          value={search}
        />
        {true ? (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.cardView}>
              {people?.map((u, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.horizentalList, styles.mTop]}
                  >
                    <UserAvatar
                      size={60}
                      key={u.avatar}
                      name={u.name}
                      src={u.avatar}
                      style={styles.avatar}
                    />
                    <Text
                      style={[
                        styles.textCenter,
                        styles.whiteText,
                        styles.mTop5
                      ]}
                    >
                      {u.name.length > 5
                        ? u.name.substring(0, 5) + "..."
                        : u.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <Text style={[styles.textCenter, styles.whiteText, styles.mTop5]}>
            No People added
          </Text>
        )}
      </View>
    </View>
  );
};

export default Reminder;
