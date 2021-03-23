import firebase from "firebase";
import * as Notifications from "expo-notifications";

import ActionTypes from "../Actions/ActionTypes";

const NotificatonAction = {
  RegisterForPushNotifications: (obj) => {
    return async (dispatch) => {
      const {
        status: existingStatus
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      try {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        firebase
          .database()
          .ref("/users/" + obj.uid + "/push_token")
          .set(token);
        dispatch({
          type: ActionTypes.PUSH_NOTIFICATIN,
          payload: { success: true }
        });
      } catch (e) {
        dispatch({
          type: ActionTypes.PUSH_NOTIFICATIN,
          payload: { message: "unable to add user for push notification" }
        });
      }
    };
  }
};

export default NotificatonAction;
