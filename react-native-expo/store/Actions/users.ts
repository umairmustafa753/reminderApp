import firebase from "firebase";

import ActionTypes from "../Actions/ActionTypes";

const UserAction = {
  GetUsers: (obj) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.GET_USERS_REQUST, payload: {} });
      try {
        firebase
          .database()
          .ref("/users/")
          .orderByChild("email")
          .equalTo(obj?.email)
          .on("value", (users) => {
            dispatch({
              type: ActionTypes.GET_USERS,
              payload: users.val()
            });
          });
      } catch (e) {
        dispatch({
          type: ActionTypes.GET_USERS,
          payload: { message: "unable to fetch users" }
        });
      }
    };
  }
};

export default UserAction;
