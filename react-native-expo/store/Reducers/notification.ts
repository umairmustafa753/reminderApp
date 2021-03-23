import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  obj: {},
  loading: false
};

function notificationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.REQUST_PUSH_NOTIFICATIN: {
      return {
        ...state,
        obj: action.payload,
        loading: true
      };
    }

    case ActionTypes.PUSH_NOTIFICATIN: {
      return {
        ...state,
        obj: action.payload,
        loading: false
      };
    }

    default:
      return state;
  }
}

export default notificationReducer;
