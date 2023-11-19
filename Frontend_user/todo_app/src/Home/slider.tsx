

import React, { useState, useEffect } from 'react';

type CarouselProps = {
  children: React.ReactNode;
  interval?: number;
};

const Carousel: React.FC<CarouselProps> = ({ children, interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % React.Children.count(children));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + React.Children.count(children)) % React.Children.count(children));
  };

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {React.Children.map(children, (child, index) => (
          <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={index}>
            {child}
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" onClick={prevSlide}>
        &lt; {/* Use &lt; for "<" symbol */}
      </button>
      <button className="carousel-control-next" onClick={nextSlide}>
        &gt; {/* Use &gt; for ">" symbol */}
      </button>
    </div>
  );
};

export default Carousel;

