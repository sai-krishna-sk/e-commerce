import React, { useEffect, useRef, useState } from 'react';

const InfiniteImageCarousel = ({ images = [] }) => {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const positionRef = useRef(0); // Store position in a ref to persist across renders
  
  // Fallback if no images provided
  const defaultImages = [
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
  ];
  
  // Use provided images or defaults - ensuring we have many images
  const displayImages = images.length > 0 ? [...images, ...images, ...images] : defaultImages;
  
  // Triple the images to create the infinite effect and ensure extra length
  const duplicatedImages = [...displayImages, ...displayImages];
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    // Animation function for continuous movement
    let animationId;
    
    const animate = () => {
      if (!isPaused) {
        // Update the persistent position reference
        positionRef.current -= 0.7;
        
        // Reset position when first set of images has passed
        const singleSetWidth = carousel.scrollWidth / 2;
        if (Math.abs(positionRef.current) >= singleSetWidth) {
          positionRef.current = 0;
        }
        
        carousel.style.transform = `translateX(${positionRef.current}px)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationId = requestAnimationFrame(animate);
    
    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);
  
  return (
    <div 
      className="w-full overflow-hidden py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredIndex(null); // Reset hover state when leaving carousel
      }}
    >
      <div 
        ref={carouselRef}
        className="flex"
        style={{ willChange: 'transform' }}
      >
        {/* Duplicate images for infinite effect */}
        {duplicatedImages.map((image, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 h-120 w-72 mx-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:z-10 rounded-lg relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Base image */}
            <img 
              src={image} 
              alt={`Carousel image ${index % displayImages.length + 1}`}
              className="w-full h-full object-cover rounded-lg transition-all duration-300"
              style={{
                boxShadow: hoveredIndex === index ? '0 0 12px 4px rgba(217, 144, 144, 0.6)' : '0 0 0 transparent',
              }}
            />
            
            {/* Rose overlay with conditional opacity */}
            <div 
              className="absolute inset-0 rounded-lg transition-all duration-300 ease-in-out"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 192, 203, 0.5) 0%, rgba(217, 144, 144, 0.7) 200%)',
                opacity: hoveredIndex !== null ? (hoveredIndex === index ? 0 : 0.65) : 0,
                pointerEvents: 'none' // Ensures the overlay doesn't interfere with mouse events
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteImageCarousel;