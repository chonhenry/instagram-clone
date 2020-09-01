import React, { useState } from "react";
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

const CreatePostForm = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState([]);

  const onChange = (e) => {
    setCaption(e.target.value);
  };

  const onClick = (e) => {
    console.log(caption);
    console.log(image.length);
  };

  const onUpdateImages = (images) => {
    //a[0].getFileEncodeBase64String()
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
        //files={files}
        allowReorder={true}
        allowMultiple={true}
        onupdatefiles={(images) => onUpdateImages(images)}
        maxFiles={3}
        labelIdle='Drag & Drop your files or <span class="filepon d--label-action">Browse</span>'
        //imageCropAspectRatio="1:1"
        //imageResizeTargetHeight="600px"
      />
      {caption.length !== 0 && image.length !== 0 ? (
        <button className={`post-btn`} onClick={(e) => onClick(e)}>
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

export default CreatePostForm;
