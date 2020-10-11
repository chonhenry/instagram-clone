import {
  FIND_USER_SUCCESS,
  FIND_USER_FAIL,
  LOGOUT,
  LOGIN_SUCCESS,
  CLEAR_USER,
} from "../actions/type";

const initialState = {
  user: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FIND_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    // case LOGIN_SUCCESS:
    case LOGOUT:
    case FIND_USER_FAIL:
    case CLEAR_USER:
      return {
        ...state,
        loading: true,
        user: null,
      };
    default:
      return state;
  }
}
