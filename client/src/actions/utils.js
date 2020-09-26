import {
  TOGGLE_ON_DROPDOWN,
  TOGGLE_OFF_DROPDOWN,
  TOGGLE_ON_FOLLOW_LIST,
  TOGGLE_OFF_FOLLOW_LIST,
  TOGGLE_ON_CREATE_POST,
  TOGGLE_OFF_CREATE_POST,
  TOGGLE_ON_BACKDROP,
  TOGGLE_OFF_BACKDROP,
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

// toogle on backdrop
export const toggleOnBackdrop = () => {
  return {
    type: TOGGLE_ON_BACKDROP,
  };
};

// toogle off backdrop
export const toggleOffBackdrop = () => {
  return {
    type: TOGGLE_OFF_BACKDROP,
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

// toggle on create post
export const toggleOnCreatePost = () => {
  console.log("action");
  return {
    type: TOGGLE_ON_CREATE_POST,
  };
};

// toggle off create post
export const toggleOffCreatePost = () => {
  return {
    type: TOGGLE_OFF_CREATE_POST,
  };
};
