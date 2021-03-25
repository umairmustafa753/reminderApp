import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  reminder: {},
  loading: false
};

function reminderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.REMINDER_REQUST: {
      return {
        ...state,
        reminder: action.payload,
        loading: true
      };
    }

    case ActionTypes.REMINDER: {
      return {
        ...state,
        reminder: action.payload,
        loading: false
      };
    }

    default:
      return state;
  }
}

export default reminderReducer;
