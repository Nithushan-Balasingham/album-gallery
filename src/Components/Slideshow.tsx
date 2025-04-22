// Slideshow.tsx
import React, { useState } from 'react';

interface SlideshowProps {
  photos: any[];
}

const Slideshow: React.FC<SlideshowProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div>
        <button onClick={handlePrevious}>Previous</button>
        <img src={photos[currentIndex]?.urls.full} alt={photos[currentIndex]?.alt_description} />
        <button onClick={handleNext}>Next</button>
      </div>
      <p>{photos[currentIndex]?.alt_description}</p>
    </div>
  );
};

export default Slideshow;
