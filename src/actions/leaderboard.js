import axios from "axios";
export const UPDATE_LEADERBOARD = "UPDATE_LEADERBOARD";
export const RETRIEVE_LEADERBOARD = "RETRIEVE_LEADERBOARD";
export const RETRIEVING_LEADERBOARD = "RETRIEVING_LEADERBOARD";

export const retrieveLeaderboard = () => async dispatch => {
  try {
    dispatch({
      type: RETRIEVING_LEADERBOARD,
      payload: {}
    });
    const {
      data
    } = await axios.post(
      "https://82pw9a4thl.execute-api.us-east-1.amazonaws.com/dev/gateway",
      {
        payload: {
          command: "leaderboard:retrieve"
        }
      }
    );
    dispatch({
      type: RETRIEVE_LEADERBOARD,
      payload: {
        leaderboardData: data.body.leaderboardData
      }
    });
  } catch (err) {}
};

export const updateLeaderboard = ({
  size,
  time,
  name,
  elapsedTime,
  percentageComplete
}) => async dispatch => {
  try {
    const {
      data
    } = await axios.post(
      "https://82pw9a4thl.execute-api.us-east-1.amazonaws.com/dev/gateway",
      {
        payload: {
          command: "leaderboard:udpdate",
          size,
          time,
          name,
          elapsedTime,
          percentageComplete
        }
      }
    );
    dispatch({
      type: UPDATE_LEADERBOARD,
      payload: {
        scoreId: data.body.scoreId
      }
    });
  } catch (err) {}
};
