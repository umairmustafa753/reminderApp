import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../screens/login";
import Dashboard from "../../screens/dashboard";
import { StackParamList } from "../../constants/types";

const Stack = createStackNavigator<StackParamList>();

const StackScreens = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={"Login"}>
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"Dashboard"} component={Dashboard} />
    </Stack.Navigator>
  );
};

export default StackScreens;
