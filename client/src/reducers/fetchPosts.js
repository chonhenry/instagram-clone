import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL } from "../actions/type";

const initialState = {
  user: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case FETCH_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        posts: null,
      };
    default:
      return state;
  }
}
