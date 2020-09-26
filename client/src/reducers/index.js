import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import dropdown from "./dropdown";
import backdrop from "./backdrop";
import followList from "./followList";
import createPost from "./createPost";
import fetchUserPosts from "./fetchPosts";

export default combineReducers({
  auth,
  user,
  dropdown,
  followList,
  createPost,
  backdrop,
  post: fetchUserPosts,
});
