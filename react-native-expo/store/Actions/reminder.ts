import firebase from "firebase";
import * as Notifications from "expo-notifications";

import ActionTypes from "../Actions/ActionTypes";

const ReminderAction = {
  Add: (obj) => {
    return async (dispatch) => {
      dispatch({
        type: ActionTypes.REMINDER_REQUST,
        payload: {}
      });
      try {
        const tokenArray = obj?.users?.map((user) => {
          return {
            to: user?.push_token,
            sound: "default",
            title: `Hey ${user?.first_name} ${user?.last_name}`,
            body: `${obj.user_name} wants to add you in a reminder named ${obj.title}`
          };
        });
        firebase
          .database()
          .ref("/reminders/" + obj.user_uid + obj.date)
          .set(obj)
          .then(async () => {
            if (tokenArray) {
              fetch("https://exp.host/--/api/v2/push/send", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(tokenArray)
              });
            }
            await Notifications.scheduleNotificationAsync({
              content: {
                title: `Hey ${obj.user_name}`,
                sound: "default",
                body: `${obj.title}`
              },
              trigger: { seconds: parseInt(obj?.seconds) }
            });
            dispatch({
              type: ActionTypes.REMINDER,
              payload: { success: true }
            });
          })
          .catch(() => {
            dispatch({
              type: ActionTypes.REMINDER,
              payload: { message: "unable to add reminder", success: false }
            });
          });
      } catch (e) {
        dispatch({
          type: ActionTypes.REMINDER,
          payload: { message: "unable to add reminder", success: false }
        });
      }
    };
  },
  SetAddReminderSuccesFalse: () => {
    return async (dispatch) => {
      dispatch({
        type: ActionTypes.REMINDER,
        payload: { success: false }
      });
    };
  }
};

export default ReminderAction;
