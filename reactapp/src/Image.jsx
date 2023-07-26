import React from 'react';
import {  IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';



const images = [
  'http://metropolitanhost.com/themes/themeforest/html/quickmunch/assets/img/about/blog/1920x700/banner-6.jpg',
  'http://metropolitanhost.com/themes/themeforest/html/quickmunch/assets/img/about/blog/1920x700/banner-5.jpg',
  'http://metropolitanhost.com/themes/themeforest/html/quickmunch/assets/img/about/blog/1920x700/banner-4.jpg',

];

const Image = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Automatic sliding interval
  React.useEffect(() => {
    const slideInterval = setInterval(handleNextSlide, 3000); // Change slide every 3 seconds
    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column',  }}>
      <div style={{ display: 'flex' }}>
        <IconButton onClick={handlePrevSlide}>
          <ArrowBack />
        </IconButton>
        <img
          src={images[activeIndex]}
          alt={`Image ${activeIndex + 1}`}
          style={{ width: '100%', height: '500px', objectFit: 'cover'}}
        />
        <IconButton onClick={handleNextSlide}>
          <ArrowForward />
        </IconButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              width: activeIndex === index ? '20px' : '8px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: activeIndex === index ? 'primary' : 'grey',
              margin: '0 2px',
              cursor: 'pointer',
            }}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
  
  
};

export default Image;