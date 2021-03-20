import * as Google from "expo-google-app-auth";

import ActionTypes from "../Actions/ActionTypes";
import config from "../../config";

const UserAction = {
  LoginWithGoogle: () => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.USER_REQUST, payload: {} });
      try {
        const result = await Google.logInAsync({
          androidClientId: config.ANDROIDCLIENTID,
          iosClientId: config.IOSCLIENTID,
          behavior: "web",
          scopes: ["profile", "email"]
        });

        if (result.type === "success") {
          dispatch({ type: ActionTypes.USER, payload: result.accessToken });
        } else {
          dispatch({ type: ActionTypes.USER, payload: { cancelled: true } });
        }
      } catch (e) {
        dispatch({ type: ActionTypes.USER, payload: { error: true } });
      }
    };
  }
};

export default UserAction;
