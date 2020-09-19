import axios from "axios";
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL } from "./type";

// fetch posts
export const fetchPosts = (post_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${post_id}`);

    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: FETCH_POSTS_FAIL,
      payload: err.response.data.errors[0].msg,
    });
  }
};