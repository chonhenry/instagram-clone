import {
  TOGGLE_ON_DROPDOWN,
  TOGGLE_OFF_DROPDOWN,
  TOGGLE_ON_FOLLOW_LIST,
  TOGGLE_OFF_FOLLOW_LIST,
} from "../actions/type";
// import { toggleOffDropdown } from "../actions/utils";

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
