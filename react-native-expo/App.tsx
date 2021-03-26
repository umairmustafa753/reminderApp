import React from "react";
import * as Notifications from "expo-notifications";
import firebase from "firebase";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import Navigation from "./navigation";
import { firebaseConfig } from "./services/config";
import Store from "./store";

firebase.initializeApp(firebaseConfig);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
