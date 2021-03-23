import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import userReducer from "./Reducers/user";
import usersReducer from "./Reducers/users";
import notificationReducer from "./Reducers/notification";

const middleware = applyMiddleware(thunk);
const rootReducer = combineReducers({
  userReducer,
  usersReducer,
  notificationReducer
});
const store = createStore(rootReducer, middleware);

export default store;
