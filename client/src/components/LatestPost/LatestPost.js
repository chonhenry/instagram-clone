import React, { Fragment } from "react";
import Author from "../Profile/PostDetails/RightSide/Author/Author";
import PostStats from "../Profile/PostDetails/RightSide/PostStats/PostStats";
import WriteComment from "../Profile/PostDetails/RightSide/WriteComment/WriteComment";
import Comments from "./Comments/Comments";
import { connect } from "react-redux";
import "./LatestPost.scss";

const LatestPost = ({ authUser, username, profileImg, caption, postId }) => {
  return (
    <div className="latest-post">
      {authUser && (
        <Fragment>
          <Author
            image={profileImg}
            username={username}
            self={false}
            latest={true}
          />
          {/* <PostStats
            postId={"123456"}
            likes={[]}
            authUsername={authUser.username}
            latest={true}
          /> */}
          <Comments username={username} caption={caption} />
          <div className="date">{postId}</div>
          <WriteComment postId={"123456"} image={profileImg} latest={true} />
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: state.auth.user,
  };
};

export default connect(mapStateToProps)(LatestPost);
