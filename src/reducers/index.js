import { combineReducers } from "redux";
import config from "./config";
import play from "./play";
import leaderboard from "./leaderboard";

export default combineReducers({
  leaderboard,
  config,
  play
});
