import { combineReducers } from "redux";
import { qlsvReducer } from "./qlsvReducer";

const rootReducer = combineReducers({
  qlsvReducer,
});

export default rootReducer;
