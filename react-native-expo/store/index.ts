import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import userReducer from "./Reducers/user";

const middleware = applyMiddleware(thunk);
const rootReducer = combineReducers({
  userReducer
});
const store = createStore(rootReducer, middleware);

export default store;
