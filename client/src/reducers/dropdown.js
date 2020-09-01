import { TOGGLE_ON_DROPDOWN, TOGGLE_OFF_DROPDOWN } from "../actions/type";

export default function (state = false, action) {
  const { type } = action;

  switch (type) {
    case TOGGLE_ON_DROPDOWN:
      return true;
    case TOGGLE_OFF_DROPDOWN:
    default:
      return false;
  }
}
