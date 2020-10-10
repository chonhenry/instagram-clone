import React, { useState, useEffect } from "react";
import "./Gallery.scss";

const Gallery = ({ images }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [leftArrow, setLeftArrow] = useState(false);
  const [rightArrow, setRightArrow] = useState(false);

  useEffect(() => {
    if (currentImg === 0) setLeftArrow(false);
    else if (currentImg > 0 && images.length > 0) setLeftArrow(true);

    if (currentImg === images.length - 1) setRightArrow(false);
    else if (currentImg < images.length - 1 && images.length > 0)
      setRightArrow(true);
  }, [currentImg]);

  const onArrowClick = (direction) => {
    if (direction === "left") {
      setCurrentImg((prevCurrentImg) => prevCurrentImg - 1);
    } else {
      setCurrentImg((prevCurrentImg) => prevCurrentImg + 1);
    }
  };

  return (
    <div className="gallery">
      <img
        className="post-images"
        src={`data:image/jpeg;base64,${images[currentImg]}`}
        alt=""
      />

      {leftArrow && (
        <i
          className="fas fa-chevron-circle-left arrow"
          onClick={() => onArrowClick("left")}
        />
      )}

      {rightArrow && (
        <i
          className="fas fa-chevron-circle-right arrow"
          onClick={() => onArrowClick("right")}
        />
      )}
    </div>
  );
};

export default Gallery;
