import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

import styles from "../styles";

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text>This is a dashboard</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Dashboard;
