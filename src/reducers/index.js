import { combineReducers } from "redux";
import config from "./config";
import play from "./play";

export default combineReducers({
  config,
  play
});
