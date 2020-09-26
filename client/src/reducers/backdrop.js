import { TOGGLE_ON_BACKDROP, TOGGLE_OFF_BACKDROP } from "../actions/type";

export default function (state = false, action) {
  const { type } = action;

  switch (type) {
    case TOGGLE_ON_BACKDROP:
      return true;
    case TOGGLE_OFF_BACKDROP:
    default:
      return false;
  }
}
