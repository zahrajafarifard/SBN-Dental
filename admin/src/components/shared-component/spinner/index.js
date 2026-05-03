import Img1 from "../../../assets/icons/indicator.svg";
import React, { useState, useEffect } from "react";
import "./ImageSpinner.css"; // Import the CSS file for styling

const Spinner = () => {
  const [activeImage, setActiveImage] = useState(-1);
  const [repeats, setRepeats] = useState(0);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  // List of images you want to display
  const images = [Img1, Img1, Img1];

  useEffect(() => {
    if (repeats < 5) {
      const interval = setInterval(() => {
        setActiveImage((prevImage) => {
          const nextImage = prevImage + 1;
          if (nextImage >= images.length) {
            setRepeats((prevRepeats) => prevRepeats + 1);
            return -1;
          }
          return nextImage;
        });
      }, 500); // Change image every 1 second
      return () => clearInterval(interval);
    } else {
      setIsAnimationFinished(true);

      // ???????????????????????

      setTimeout(() => {
        setRepeats(0);
        setActiveImage(-1);
        setIsAnimationFinished(false);
      }, 1000);
    }
  }, [activeImage, repeats]);

  return (
    <div
      style={{ direction: "ltr" }}
      className={`spinner-container ${isAnimationFinished ? "final" : ""}`}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`spinner-${index}`}
          className={`spinner-image ${activeImage === index ? "active" : ""} ${
            isAnimationFinished ? "finished" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default Spinner;
