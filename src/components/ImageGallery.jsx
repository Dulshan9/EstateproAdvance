import { useState } from 'react';
import '../styles.css';

function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`image-gallery ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="gallery-main">
        <button 
          className="nav-btn prev-btn" 
          onClick={prevImage}
          aria-label="Previous image"
        >
          ‹
        </button>
        
        <div className="main-image-container" onClick={toggleFullscreen}>
          <img 
            src={`${import.meta.env.BASE_URL}${images[currentIndex].replace(/^\/+/, '')}`} 
            alt={`Property view ${currentIndex + 1}`}
            className="main-image"
          />
          <div className="image-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
        
        <button 
          className="nav-btn next-btn" 
          onClick={nextImage}
          aria-label="Next image"
        >
          ›
        </button>

        <button 
          className="fullscreen-btn"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? '✕' : '⛶'}
        </button>
      </div>

      <div className="thumbnail-strip">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`thumbnail-container ${index === currentIndex ? 'active' : ''}`}
            onClick={() => selectImage(index)}
          >
            <img 
                src={`${import.meta.env.BASE_URL}${image.replace(/^\/+/, '')}`} 
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail"
            />
          </div>
        ))}
      </div>

      {isFullscreen && (
        <div className="fullscreen-overlay" onClick={toggleFullscreen}>
          <div className="fullscreen-content">
            <img 
              src={`${import.meta.env.BASE_URL}${images[currentIndex].replace(/^\/+/, '')}`} 
              alt="Fullscreen view"
              className="fullscreen-image"
            />
            <div className="fullscreen-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;