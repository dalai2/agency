'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images?: string[];
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images = [], 
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Placeholder images if none provided
  const displayImages = images.length > 0 
    ? images 
    : [
        '/placeholder-screenshot-1.jpg',
        '/placeholder-screenshot-2.jpg',
        '/placeholder-screenshot-3.jpg',
        '/placeholder-screenshot-4.jpg',
      ];

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality (optional, can be disabled)
  useEffect(() => {
    const interval = setInterval(() => {
      // Auto-play disabled by default - uncomment to enable
      // goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Image Container */}
      <div 
        className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image */}
        <div className="relative w-full h-full">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Screenshot ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.parentElement?.querySelector('.placeholder-content');
                  if (placeholder) {
                    (placeholder as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div className="placeholder-content absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200" style={{ display: image.startsWith('/placeholder') ? 'flex' : 'none' }}>
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">📸</div>
                  <div className="text-sm font-medium">Screenshot {index + 1}</div>
                  <div className="text-xs mt-1">Add your image here</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Slide Counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
            {currentIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Dot Indicators */}
      {displayImages.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-200 rounded-full ${
                index === currentIndex
                  ? 'bg-primary w-8 h-2'
                  : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;

