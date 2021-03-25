import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../screens/login";
import Event from "../../screens/event";
import Dashboard from "../../screens/dashboard";
import Reminder from "../../screens/reminder";
import { StackParamList } from "../../constants/types";

const Stack = createStackNavigator<StackParamList>();

const StackScreens = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={"Login"}>
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"Dashboard"} component={Dashboard} />
      <Stack.Screen name={"Event"} component={Event} />
      <Stack.Screen
        name={"Reminder"}
        component={Reminder}
        options={{
          cardStyle: {
            backgroundColor: "#118571"
          }
        }}
      />
    </Stack.Navigator>
  );
};

export default StackScreens;
