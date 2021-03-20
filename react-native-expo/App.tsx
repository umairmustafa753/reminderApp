import React from "react";
import firebase from "firebase";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation";
import { firebaseConfig } from "./services/config";

firebase.initializeApp(firebaseConfig);

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
