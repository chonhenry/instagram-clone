import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  authError: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        authError: null,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        authError: payload,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
