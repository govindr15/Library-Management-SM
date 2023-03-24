import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducers = combineReducers({
  users: userReducer,
});

export default rootReducers;
