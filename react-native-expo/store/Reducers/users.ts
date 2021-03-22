import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  users: [],
  loading: false
};

function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_USERS_REQUST: {
      return {
        ...state,
        users: action.payload,
        loading: true
      };
    }

    case ActionTypes.GET_USERS: {
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    }

    default:
      return state;
  }
}

export default usersReducer;
