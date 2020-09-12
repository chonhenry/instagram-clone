import { TOGGLE_ON_CREATE_POST, TOGGLE_OFF_CREATE_POST } from "../actions/type";

export default function (state = false, action) {
  const { type } = action;

  switch (type) {
    case TOGGLE_ON_CREATE_POST:
      return true;
    case TOGGLE_OFF_CREATE_POST:
    default:
      return false;
  }
}
