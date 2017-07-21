import {
  UPDATE_LEADERBOARD,
  RETRIEVE_LEADERBOARD,
  RETRIEVING_LEADERBOARD,
  RESET_LEADERBOARD
} from "../actions/leaderboard";

const initialState = {
  retrievingLeaderboard: false,
  updatedLeaderboard: false,
  leaderboardData: [],
  scoreId: -1
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case RESET_LEADERBOARD:
      return {
        retrievingLeaderboard: false,
        updatedLeaderboard: false,
        leaderboardData: [],
        scoreId: -1
      };
    case RETRIEVING_LEADERBOARD:
      return {
        ...state,
        retrievingLeaderboard: true
      };
    case RETRIEVE_LEADERBOARD:
      return {
        ...state,
        retrievingLeaderboard: false,
        leaderboardData: payload.leaderboardData
      };
    case UPDATE_LEADERBOARD:
      return {
        ...state,
        updatedLeaderboard: true,
        scoreId: payload.scoreId
      };
    default:
      return state;
  }
}
