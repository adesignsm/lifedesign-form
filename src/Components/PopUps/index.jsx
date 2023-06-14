import React, { useEffect, useState } from "react";
import "./index.css";

import image1 from "../../Assets/Media/PopUps/image1.png";
import image2 from "../../Assets/Media/PopUps/image2.png";
import image3 from "../../Assets/Media/PopUps/image3.png";
import image4 from "../../Assets/Media/PopUps/image4.png";
import image5 from "../../Assets/Media/PopUps/image5.png";
import image6 from "../../Assets/Media/PopUps/image6.png";
import image7 from "../../Assets/Media/PopUps/image7.png";
import image8 from "../../Assets/Media/PopUps/image8.png";
import image9 from "../../Assets/Media/PopUps/image9.png";
import image10 from "../../Assets/Media/PopUps/image10.png";
import image11 from "../../Assets/Media/PopUps/image11.png";
import image12 from "../../Assets/Media/PopUps/image12.png";
import image13 from "../../Assets/Media/PopUps/image13.png";
import image14 from "../../Assets/Media/PopUps/image14.png";
import image15 from "../../Assets/Media/PopUps/image15.png";

const PopUps = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imagePaths = [
        image1, image2, image3, image4, image5, image6, image7, image8, image9, 
        image10, image11, image12, image13, image14, image15
    ];

    const generateRandomImage = () => {
        const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        const image = (
            <img key={Date.now()} src={randomImagePath} alt="Pop-up Image"className="pop-up-image"
            style={{
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `rotate(${Math.random() * 360}deg)`
            }}
            />
        );
        setImages((prevImages) => [...prevImages, image]);

        const nextDelay = Math.random() * 6000 + 3000;
        setTimeout(generateRandomImage, nextDelay);
    };
    generateRandomImage();
  }, []);

  const handleMouseDown = () => {
    let imagesRemaining = images.length;
    const interval = setInterval(() => {
      if (imagesRemaining > 0) {
        setImages((prevImages) => prevImages.slice(1));
        imagesRemaining--;
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  window.onmousedown = () => {
    handleMouseDown();
  }

  return (
    <div id="popups-container">
        {images}
    </div>
  )
};

export default PopUps;