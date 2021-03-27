import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../screens/login";
import Event from "../../screens/event";
import Dashboard from "../../screens/dashboard";
import Reminder from "../../screens/reminder";
import Success from "../../screens/success";
import { StackParamList } from "../../constants/types";
import Notification from "../../screens/notification";

const Stack = createStackNavigator<StackParamList>();

const StackScreens = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={"Login"}>
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"Dashboard"} component={Dashboard} />
      <Stack.Screen name={"Event"} component={Event} />
      <Stack.Screen name={"Success"} component={Success} />
      <Stack.Screen name={"Notification"} component={Notification} />
      <Stack.Screen name={"Reminder"} component={Reminder} />
    </Stack.Navigator>
  );
};

export default StackScreens;
