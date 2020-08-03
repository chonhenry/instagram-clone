import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import dropdown from "./utils";

export default combineReducers({ auth, user, dropdown });
