import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Loader2, Check, X } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// 1. OPTIMIZED Progressive Image Component
export const ProgressiveImage = memo(({ 
  src, 
  alt, 
  className, 
  lowQualitySrc,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMzMzIiByeD0iNCIvPgo8L3N2Zz4K"
}) => {
  const [imageSrc, setImageSrc] = useState(lowQualitySrc || placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting && !isLoaded && !hasError) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setHasError(true);
      };
      img.src = src;
    }
  }, [isIntersecting, src, isLoaded, hasError]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${
          !isLoaded ? 'filter blur-sm scale-110' : 'filter-none scale-100'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* OPTIMIZED Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-800/50 animate-pulse flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center">
          <div className="text-center">
            <X className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <span className="text-white text-sm">Failed to load</span>
          </div>
        </div>
      )}
    </div>
  );
});

// 2. OPTIMIZED Enhanced Skeleton Screens
export const EnhancedSkeleton = memo(({ type = 'card', className = '' }) => {
  const skeletonTypes = {
    card: (
      <div className={`bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 ${className}`}>
        <div className="animate-pulse">
          <div className="h-48 bg-gray-800/50 rounded-xl mb-4 relative overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </div>
          <div className="h-6 bg-gray-800/50 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-800/50 rounded w-1/2 mb-4" />
          <div className="flex gap-2">
            <div className="h-8 bg-gray-800/50 rounded-full w-20" />
            <div className="h-8 bg-gray-800/50 rounded-full w-20" />
          </div>
        </div>
      </div>
    ),
    text: (
      <div className={`animate-pulse space-y-2 ${className}`}>
        <div className="h-4 bg-gray-800/50 rounded w-full" />
        <div className="h-4 bg-gray-800/50 rounded w-3/4" />
        <div className="h-4 bg-gray-800/50 rounded w-1/2" />
      </div>
    ),
    metric: (
      <div className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800/50 rounded w-1/2 mb-2" />
          <div className="h-12 bg-gray-800/50 rounded w-3/4" />
        </div>
      </div>
    ),
    athlete: (
      <div className={`bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden ${className}`}>
        <div className="aspect-[3/4] bg-gray-800/50 relative overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>
        <div className="p-6 space-y-3">
          <div className="h-6 bg-gray-800/50 rounded" />
          <div className="h-4 bg-gray-800/50 rounded w-3/4" />
          <div className="h-5 bg-gray-800/50 rounded w-1/2" />
        </div>
      </div>
    )
  };

  return skeletonTypes[type] || skeletonTypes.card;
});

// 3. OPTIMIZED Virtual Scrolling for Large Lists
export const VirtualScrollContainer = memo(({ 
  items, 
  itemHeight = 400, 
  renderItem, 
  className = '',
  buffer = 3 
}) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 12 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
      const end = Math.min(
        items.length,
        Math.ceil((scrollTop + viewportHeight) / itemHeight) + buffer
      );
      
      setVisibleRange({ start, end });
    };

    const throttledScroll = throttle(handleScroll, 16); // 60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [items.length, itemHeight, buffer]);

  const visibleItems = items.slice(visibleRange.start, visibleRange.end);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  return (
    <div 
      ref={containerRef} 
      style={{ height: totalHeight, position: 'relative' }}
      className={className}
    >
      <div
        style={{ transform: `translateY(${offsetY}px)` }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {visibleItems.map((item, index) => renderItem(item, visibleRange.start + index))}
      </div>
    </div>
  );
});

// 4. OPTIMIZED Page Transition Component
export const PageTransition = memo(({ children, pageKey }) => {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
});

// 5. OPTIMIZED SEO Meta Component
export const SEOMeta = memo(({ title, description, image, url }) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Elite Sports Agency`;
    
    // Update meta tags
    const metaTags = {
      description,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:card': 'summary_large_image'
    };
    
    Object.entries(metaTags).forEach(([name, content]) => {
      let element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    });
  }, [title, description, image, url]);

  return null;
});

// 6. OPTIMIZED Back to Top with Progress
export const BackToTopWithProgress = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    }, 16);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full shadow-lg hover:scale-110 transition-transform relative overflow-hidden group"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          {/* OPTIMIZED Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="3"
              fill="none"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              stroke="white"
              strokeWidth="3"
              fill="none"
              strokeDasharray={151}
              strokeDashoffset={151 - (151 * scrollProgress) / 100}
              strokeLinecap="round"
              transition={{ duration: 0.1 }}
            />
          </svg>
          
          <ChevronUp className="w-6 h-6 text-black absolute inset-0 m-auto group-hover:scale-110 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
});

// 7. OPTIMIZED Loading Bar Component
export const LoadingBar = memo(({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 z-[10000] origin-left"
        />
      )}
    </AnimatePresence>
  );
});

// 8. OPTIMIZED Intersection Observer Hook for Lazy Loading
export const LazySection = memo(({ children, className = '', threshold = 0.1 }) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold });
  
  return (
    <div ref={ref} className={className}>
      {isIntersecting ? children : <EnhancedSkeleton type="card" />}
    </div>
  );
});

// 9. OPTIMIZED Error Boundary Component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-carbon-black flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <X className="w-8 h-8 text-red-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full font-semibold text-black hover:scale-105 transition-transform"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 10. OPTIMIZED Performance Monitor Component
export const PerformanceMonitor = memo(() => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0
  });

  useEffect(() => {
    // FPS monitoring
    let frames = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frames * 1000) / (currentTime - lastTime))
        }));
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    measureFPS();

    // Memory monitoring
    if ('memory' in performance) {
      const updateMemory = () => {
        setMetrics(prev => ({
          ...prev,
          memory: Math.round(performance.memory.usedJSHeapSize / 1048576)
        }));
      };
      
      const memoryInterval = setInterval(updateMemory, 5000);
      return () => clearInterval(memoryInterval);
    }

    // Load time
    window.addEventListener('load', () => {
      setMetrics(prev => ({
        ...prev,
        loadTime: Math.round(performance.now())
      }));
    });
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 backdrop-blur-xl rounded-lg p-3 text-xs text-white font-mono border border-white/20 z-50">
      <div>FPS: {metrics.fps}</div>
      <div>Memory: {metrics.memory}MB</div>
      <div>Load: {metrics.loadTime}ms</div>
    </div>
  );
});

// Utility Functions
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export default {
  ProgressiveImage,
  EnhancedSkeleton,
  VirtualScrollContainer,
  PageTransition,
  SEOMeta,
  BackToTopWithProgress,
  LoadingBar,
  LazySection,
  ErrorBoundary,
  PerformanceMonitor
};