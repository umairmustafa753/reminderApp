import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import userReducer from "./Reducers/user";
import usersReducer from "./Reducers/users";
import reminderReducer from "./Reducers/reminder";
import notificationReducer from "./Reducers/notification";

const middleware = applyMiddleware(thunk);
const rootReducer = combineReducers({
  userReducer,
  usersReducer,
  reminderReducer,
  notificationReducer
});
const store = createStore(rootReducer, middleware);

export default store;
