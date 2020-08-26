import { TOGGLE_ON_FOLLOW_LIST, TOGGLE_OFF_FOLLOW_LIST } from "../actions/type";

export default function (state = false, action) {
  const { type } = action;

  switch (type) {
    case TOGGLE_ON_FOLLOW_LIST:
      return true;
    case TOGGLE_OFF_FOLLOW_LIST:
    default:
      return false;
  }
}
