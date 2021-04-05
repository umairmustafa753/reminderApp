import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  reminder: {},
  loading: false,
  reminders: {}
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

    case ActionTypes.GET_REMINDERS_REQUST: {
      return {
        ...state,
        reminders: action.payload,
        loading: true
      };
    }

    case ActionTypes.GET_REMINDERS: {
      return {
        ...state,
        reminders: action.payload,
        loading: false
      };
    }

    default:
      return state;
  }
}

export default reminderReducer;
