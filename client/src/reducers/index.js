import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import dropdown from "./dropdown";
import followList from "./followList";
import createPost from "./createPost";

export default combineReducers({
  auth,
  user,
  dropdown,
  followList,
  createPost,
});
