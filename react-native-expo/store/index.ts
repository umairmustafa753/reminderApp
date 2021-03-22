import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import userReducer from "./Reducers/user";
import usersReducer from "./Reducers/users";

const middleware = applyMiddleware(thunk);
const rootReducer = combineReducers({
  userReducer,
  usersReducer
});
const store = createStore(rootReducer, middleware);

export default store;
