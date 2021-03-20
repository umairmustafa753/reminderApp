import { StatusBar } from "expo-status-bar";
import React from "react";
import * as Google from "expo-google-app-auth";
import { Text, View, Button } from "react-native";

import config from "../config";
import styles from "../styles";

const Login = () => {
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: config.ANDROIDCLIENTID,
        iosClientId: config.IOSCLIENTID,
        behavior: "web",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  return (
    <View style={styles.container}>
      <Button onPress={signInWithGoogleAsync} title="Log in with Google" />
      <StatusBar style="auto" />
    </View>
  );
};

export default Login;
