import axios from "axios";
import {
  TOGGLE_ON_DROPDOWN,
  TOGGLE_OFF_DROPDOWN,
  TOGGLE_ON_FOLLOW_LIST,
  TOGGLE_OFF_FOLLOW_LIST,
} from "../actions/type";

// toogle on dropdown
export const toggleOnDropdown = () => {
  return {
    type: TOGGLE_ON_DROPDOWN,
  };
};

// toogle off dropdown
export const toggleOffDropdown = () => {
  return {
    type: TOGGLE_OFF_DROPDOWN,
  };
};

// toggle on follow list
export const toggleOnFollowList = () => {
  return {
    type: TOGGLE_ON_FOLLOW_LIST,
  };
};

// toggle off follow list
export const toggleOffFollowList = () => {
  return {
    type: TOGGLE_OFF_FOLLOW_LIST,
  };
};
