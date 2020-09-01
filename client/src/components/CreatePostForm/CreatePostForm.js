import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "./CreatePostForm.scss";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginImageCrop,
  FilePondPluginImageResize
);

const CreatePostForm = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log(username);
  }, []);

  const onChange = (e) => {
    setCaption(e.target.value);
  };

  const onClick = async (e) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = { caption, image };
      await axios.post("/api/posts", body, config);
      //useHistory().push("/henrychon");
    } catch (err) {
      console.log(err.response.data.errors);
    }
  };

  const onUpdateImages = (images) => {
    let base64 = images.map((image) => image.getFileEncodeBase64String());
    setImage(base64);
  };

  return (
    <div className="create-post-form">
      <div className="create-post-title">Create Post</div>
      <textarea
        className="caption-textarea"
        placeholder="Write a caption..."
        onChange={(e) => onChange(e)}
        value={caption}
      />
      <FilePond
        allowReorder={true}
        allowMultiple={true}
        onupdatefiles={(images) => onUpdateImages(images)}
        maxFiles={3}
        labelIdle="Upload up to 3 images"
      />
      {caption.length !== 0 && image.length !== 0 ? (
        <button
          className={`post-btn`}
          onClick={(e) => {
            onClick(e);
            history.push(`/${username}`);
          }}
        >
          Post
        </button>
      ) : (
        <button className={"post-btn post-btn-disabled"} disabled>
          Post
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.user.username,
  };
};

export default connect(mapStateToProps)(CreatePostForm);
