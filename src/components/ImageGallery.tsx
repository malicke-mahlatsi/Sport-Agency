import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Share2, 
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Heart,
  Info
} from 'lucide-react';

interface ImageData {
  id: string;
  src: string;
  thumbnail?: string;
  alt: string;
  title: string;
  description?: string;
  photographer?: string;
  location?: string;
  date?: string;
}

interface ImageGalleryProps {
  images: ImageData[];
  initialIndex?: number;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  initialIndex = 0,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        navigatePrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        navigateNext();
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case ' ':
        e.preventDefault();
        toggleZoom();
        break;
      case 'i':
      case 'I':
        e.preventDefault();
        setShowInfo(!showInfo);
        break;
      case 'r':
      case 'R':
        e.preventDefault();
        setRotation(prev => prev + 90);
        break;
      case '+':
      case '=':
        e.preventDefault();
        zoomIn();
        break;
      case '-':
        e.preventDefault();
        zoomOut();
        break;
    }
  }, [isOpen, currentIndex, isZoomed, showInfo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navigateNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetImageState();
  }, [images.length]);

  const navigatePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetImageState();
  }, [images.length]);

  const resetImageState = () => {
    setIsZoomed(false);
    setZoomLevel(1);
    setRotation(0);
    setShowInfo(false);
  };

  const toggleZoom = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setZoomLevel(1);
    } else {
      setIsZoomed(true);
      setZoomLevel(2);
    }
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
    setIsZoomed(true);
  };

  const zoomOut = () => {
    setZoomLevel(prev => {
      const newLevel = Math.max(prev - 0.5, 1);
      if (newLevel === 1) {
        setIsZoomed(false);
      }
      return newLevel;
    });
  };

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateNext();
      } else {
        navigatePrev();
      }
    }
    
    setTouchStart(null);
  };

  const handleShare = async () => {
    const currentImage = images[currentIndex];
    const shareData = {
      title: currentImage.title,
      text: currentImage.description || currentImage.alt,
      url: window.location.href + '#' + currentImage.id
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareData.url);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareData.url);
    }
  };

  const handleDownload = () => {
    const currentImage = images[currentIndex];
    const link = document.createElement('a');
    link.href = currentImage.src;
    link.download = `${currentImage.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFavorite = (imageId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(imageId)) {
        newFavorites.delete(imageId);
      } else {
        newFavorites.add(imageId);
      }
      return newFavorites;
    });
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    resetImageState();
  };

  // Progressive Image Loading Component
  const ProgressiveImage: React.FC<{
    src: string;
    thumbnail?: string;
    alt: string;
    className?: string;
    onClick?: () => void;
  }> = ({ src, thumbnail, alt, className, onClick }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      const img = new Image();
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
      img.src = src;
    }, [src]);

    return (
      <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
        {/* Low quality placeholder */}
        {thumbnail && !loaded && (
          <img
            src={thumbnail}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover filter blur-sm"
          />
        )}
        
        {/* High quality image */}
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            loaded ? 'opacity-100 filter-none' : 'opacity-0'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Loading state */}
        {!loaded && !error && (
          <div className="absolute inset-0 bg-gray-800/50 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center">
            <span className="text-white text-sm">Failed to load</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 ${className}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openLightbox(index)}
            className="relative aspect-video overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer group bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <ProgressiveImage
              src={image.src}
              thumbnail={image.thumbnail}
              alt={image.alt}
              className="w-full h-full"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="bg-white/20 backdrop-blur-xl rounded-full p-3 sm:p-4 border border-white/30"
              >
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </motion.div>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white text-sm sm:text-base font-semibold truncate">
                {image.title}
              </h3>
              {image.photographer && (
                <p className="text-gray-300 text-xs sm:text-sm truncate">
                  by {image.photographer}
                </p>
              )}
            </div>

            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(image.id);
              }}
              className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-xl rounded-full border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Heart 
                className={`w-4 h-4 ${
                  favorites.has(image.id) 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-white'
                }`} 
              />
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            {/* Main Image Container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-[90vw] max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <motion.img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className={`max-w-full max-h-[80vh] object-contain cursor-${isZoomed ? 'zoom-out' : 'zoom-in'} transition-transform duration-300`}
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                }}
                onClick={toggleZoom}
                drag={isZoomed}
                dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                dragElastic={0.1}
                whileDrag={{ cursor: 'grabbing' }}
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={navigatePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={navigateNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.button>
                </>
              )}
            </motion.div>

            {/* Top Controls */}
            <div className="absolute top-4 right-4 flex gap-3">
              {/* Zoom Controls */}
              <div className="flex gap-2 bg-black/50 backdrop-blur-xl rounded-full p-2 border border-white/20">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={zoomOut}
                  disabled={zoomLevel <= 1}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.button>
                
                <span className="px-3 py-2 text-white text-sm font-mono flex items-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={zoomIn}
                  disabled={zoomLevel >= 4}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.button>
              </div>

              {/* Action Buttons */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRotation(prev => prev + 90)}
                className="p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <RotateCw className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowInfo(!showInfo)}
                className="p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFavorite(images[currentIndex].id)}
                className="p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Heart 
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    favorites.has(images[currentIndex].id) 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-white'
                  }`} 
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDownload}
                className="p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.button>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-xl rounded-full p-2 border border-white/20 max-w-[90vw] overflow-x-auto">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all min-w-[8px] sm:min-w-[12px] ${
                      index === currentIndex
                        ? 'bg-yellow-400 w-6 sm:w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Image Info Panel */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 300 }}
                  className="absolute top-4 left-4 bottom-4 w-80 bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 overflow-y-auto"
                >
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {images[currentIndex].title}
                  </h3>
                  
                  {images[currentIndex].description && (
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {images[currentIndex].description}
                    </p>
                  )}

                  <div className="space-y-3 text-sm">
                    {images[currentIndex].photographer && (
                      <div>
                        <span className="text-gray-400">Photographer:</span>
                        <span className="text-white ml-2">{images[currentIndex].photographer}</span>
                      </div>
                    )}
                    
                    {images[currentIndex].location && (
                      <div>
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white ml-2">{images[currentIndex].location}</span>
                      </div>
                    )}
                    
                    {images[currentIndex].date && (
                      <div>
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white ml-2">{images[currentIndex].date}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Image Counter */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                {images[currentIndex].title}
              </h3>
              <p className="text-gray-400 text-sm">
                {currentIndex + 1} / {images.length}
              </p>
            </div>

            {/* Keyboard Shortcuts Help */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-xl rounded-lg p-3 border border-white/20 text-xs text-gray-400">
              <div className="grid grid-cols-2 gap-2">
                <span>← → Navigate</span>
                <span>Space: Zoom</span>
                <span>Esc: Close</span>
                <span>I: Info</span>
                <span>R: Rotate</span>
                <span>+/- Zoom</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;