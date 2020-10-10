import React, { Fragment } from "react";
import Author from "../Profile/PostDetails/RightSide/Author/Author";
import PostStats from "../Profile/PostDetails/RightSide/PostStats/PostStats";
import WriteComment from "../Profile/PostDetails/RightSide/WriteComment/WriteComment";
import Comments from "./Comments/Comments";
import Gallery from "./Gallery/Gallery";
import { connect } from "react-redux";
import "./LatestPost.scss";

const LatestPost = ({
  authUser,
  username,
  profileImg,
  caption,
  postId,
  comments,
  date,
  images,
  likes,
}) => {
  const getDate = () => {
    //let tmp = new Date(date.slice(0, 10)).toString().slice(4, 15);
    let time_diff;
    let post_date = new Date(date);
    let now = new Date();
    let second_diff = Math.round((now.getTime() - post_date.getTime()) / 1000);

    if (second_diff < 60) time_diff = `${second_diff} SECONDS AGO`;
    else if (second_diff < 3600)
      time_diff = `${Math.floor(second_diff / 60)} MINUTES AGO`;
    else if (second_diff < 86400)
      time_diff = `${Math.floor(second_diff / 60 / 60)} HOURS AGO`;
    else if (second_diff < 604800)
      time_diff = `${Math.floor(second_diff / 60 / 60 / 24)} DAYS AGO`;
    else time_diff = new Date(date.slice(0, 10)).toString().slice(4, 15);
    //else time_diff = `${Math.floor(second_diff / 60 / 60 / 24 / 7)}w`;

    return time_diff;
  };

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
          <Gallery images={images} />
          <Comments username={username} text={caption} caption={true} />
          {comments.length > 0 &&
            // <Comments username={comments[0].username} text={comments[0].text} />
            comments
              .slice(0, 2)
              .map((comment) => (
                <Comments
                  key={comment._id}
                  username={comment.username}
                  text={comment.text}
                />
              ))}

          <div className="date" onClick={() => console.log(comments)}>
            {getDate()}
          </div>
          <WriteComment postId={postId} image={profileImg} latest={true} />
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

// author--
// poststats
// gallery--
// comments
// date--
// writecomments--
