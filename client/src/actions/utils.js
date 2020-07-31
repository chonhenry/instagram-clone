import { TOGGLE_ON_DROPDOWN, TOGGLE_OFF_DROPDOWN } from "../actions/type";

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
