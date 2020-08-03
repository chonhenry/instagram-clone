import axios from "axios";
import { FIND_USER_SUCCESS, FIND_USER_FAIL } from "./type";

// find user
export const findUser = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${username}`);

    dispatch({
      type: FIND_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: FIND_USER_FAIL,
      //payload: err.response.data.errors[0].msg,
    });
  }
};
