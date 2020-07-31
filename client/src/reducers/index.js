import { combineReducers } from "redux";
import auth from "./auth";
import dropdown from "./utils";

export default combineReducers({ auth, dropdown });
