import * as Google from "expo-google-app-auth";
import firebase from "firebase";

import ActionTypes from "../Actions/ActionTypes";
import config from "../../config";

const UserAction = {
  LoginWithGmail: () => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.USER_REQUST, payload: {} });
      try {
        const user = await Google.logInAsync({
          androidClientId: config.GOOGLE_ANDROID_CLIENT_ID,
          iosClientId: config.GOOGLE_IOS_CLIENT_ID,
          behavior: "web",
          scopes: ["profile", "email"]
        });

        if (user.type === "success") {
          try {
            const unsubscribe = firebase.auth().onAuthStateChanged(() => {
              unsubscribe();
              const credential = firebase.auth.GoogleAuthProvider.credential(
                user?.idToken,
                user?.accessToken
              );

              firebase
                .auth()
                .signInWithCredential(credential)
                .then((result) => {
                  let user = {
                    email: result.user.email,
                    profile_picture:
                      result?.additionalUserInfo?.profile?.picture,
                    first_name: result?.additionalUserInfo?.profile?.given_name,
                    last_name: result?.additionalUserInfo?.profile?.family_name,
                    created_at: Date.now(),
                    last_logged_in: 0
                  };
                  if (result.additionalUserInfo?.isNewUser) {
                    firebase
                      .database()
                      .ref("/users/" + result.user.uid)
                      .set(user);
                  } else {
                    firebase
                      .database()
                      .ref("/users/" + result.user.uid)
                      .update({
                        last_logged_in: Date.now()
                      });
                    user.last_logged_in = Date.now();
                  }
                  dispatch({ type: ActionTypes.USER, payload: user });
                })
                .catch(() => {
                  dispatch({
                    type: ActionTypes.USER,
                    payload: { message: "error on saving user to firebase" }
                  });
                });
            });
          } catch (e) {
            dispatch({
              type: ActionTypes.USER,
              payload: { message: "error on saving user to firebase" }
            });
          }
        } else {
          dispatch({
            type: ActionTypes.USER,
            payload: { message: "user cancel login" }
          });
        }
      } catch (e) {
        dispatch({
          type: ActionTypes.USER,
          payload: { message: "error on logging in user to google" }
        });
      }
    };
  },

  GetUser: (obj) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.USER_REQUST, payload: {} });
      try {
        firebase
          .database()
          .ref("/users/" + obj.uid)
          .get()
          .then((user) => {
            dispatch({
              type: ActionTypes.USER,
              payload: user.val()
            });
          })
          .catch(() => {
            dispatch({
              type: ActionTypes.USER,
              message: "unable to fetch user"
            });
          });
      } catch (e) {
        dispatch({ type: ActionTypes.USER, message: "unable to fetch user" });
      }
    };
  }
};

export default UserAction;
