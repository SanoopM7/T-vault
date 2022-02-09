import { combineReducers } from "redux";
import SafeReducer from "./safeReducer";
const rootReducer = combineReducers({
  SafeReducer: SafeReducer,
});

export default rootReducer;
