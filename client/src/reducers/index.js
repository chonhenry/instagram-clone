import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import dropdown from "./dropdown";
import followList from "./followList";
import createPost from "./createPost";
import fetchUserPosts from "./fetchPosts";

export default combineReducers({
  auth,
  user,
  dropdown,
  followList,
  createPost,
  post: fetchUserPosts,
});
