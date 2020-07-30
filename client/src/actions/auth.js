import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./type";

// Register user
export const register = ({ name, username, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, username, email, password });

  try {
    const res = await axios.post("/api/auth/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.errors[0].msg,
    });
  }
};
