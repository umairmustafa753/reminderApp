import firebase from "firebase";

import ActionTypes from "../Actions/ActionTypes";

const ReminderAction = {
  Add: (obj) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.REMINDER_REQUST, payload: {} });
      try {
        const tokenArray = obj?.users?.map((user) => {
          return {
            to: user?.push_token,
            sound: "default",
            title: `Hey ${user?.first_name} ${user?.last_name}`,
            body: `${obj.user_name} wants to add you in a reminder`
          };
        });
        if (tokenArray) {
          fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(tokenArray)
          });
          console.log("hello");
        }
      } catch (e) {
        dispatch({
          type: ActionTypes.REMINDER,
          payload: { message: "unable to add reminder" }
        });
      }
    };
  }
};

export default ReminderAction;
