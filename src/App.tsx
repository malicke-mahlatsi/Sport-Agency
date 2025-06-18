import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary, LoadingBar, BackToTopWithProgress, PerformanceMonitor } from './components/PerformanceOptimizations';
import SocialProofBadges from './components/SocialProofBadges';
import PrintStyles from './components/PrintStyles';
import ScrollToTop from './components/ScrollToTop';
import { useReducedMotion } from './hooks/useIntersectionObserver';

// OPTIMIZED Lazy loading for better performance
const HomePage = lazy(() => import('./components/HomePage'));
const AthletesPortfolio = lazy(() => import('./components/AthletesPortfolio'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const NewsPage = lazy(() => import('./components/NewsPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const Footer = lazy(() => import('./components/Footer'));

// OPTIMIZED Custom Cursor Component with reduced complexity
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' || 
        e.target.tagName === 'A' || 
        e.target.closest('button') || 
        e.target.closest('a') ||
        e.target.classList.contains('cursor-pointer') ||
        e.target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* OPTIMIZED Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[10000] mix-blend-difference hidden md:block gpu-accelerated"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 500, 
          damping: 28,
          mass: 0.5
        }}
      >
        <div className="w-8 h-8 bg-white rounded-full opacity-80" />
      </motion.div>

      {/* OPTIMIZED Trailing effect */}
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden md:block gpu-accelerated"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 1.2 : isClicking ? 0.6 : 1,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 150, 
          damping: 20,
          mass: 0.8
        }}
      >
        <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-60" />
      </motion.div>

      {/* OPTIMIZED Outer ring for hover effect */}
      <motion.div
        className="fixed pointer-events-none z-[9998] hidden md:block gpu-accelerated"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 0.3 : 0,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 30
        }}
      >
        <div className="w-10 h-10 border-2 border-yellow-400 rounded-full" />
      </motion.div>
    </>
  );
};

// OPTIMIZED Page Transition Wrapper
const PageTransition = ({ children, pageKey }) => {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <motion.div
      key={pageKey}
      initial={{ 
        opacity: 0,
        scale: 0.98,
        y: 10
      }}
      animate={{ 
        opacity: 1,
        scale: 1,
        y: 0
      }}
      exit={{ 
        opacity: 0,
        scale: 1.02,
        y: -10
      }}
      transition={{ 
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

// OPTIMIZED Loading Component
const LoadingFallback = () => (
  <div className="min-h-screen bg-carbon-black flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full"
    />
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // OPTIMIZED navigation with loading states
  const handleNavigation = (page) => {
    if (page === currentPage) return;

    setIsLoading(true);

    // Simulate loading time for smooth transitions
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 200); // Reduced from 300ms for better performance
  };

  // OPTIMIZED Preload next page content
  useEffect(() => {
    const preloadPages = ['home', 'athletes', 'services', 'news', 'contact'];
    preloadPages.forEach(page => {
      if (page !== currentPage) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = `#${page}`;
        document.head.appendChild(link);
      }
    });
  }, [currentPage]);

  const renderPage = () => {
    const pageProps = { onNavigate: handleNavigation };
    
    switch (currentPage) {
      case 'home':
        return (
          <PageTransition pageKey="home">
            <HomePage {...pageProps} />
          </PageTransition>
        );
      case 'athletes':
        return (
          <PageTransition pageKey="athletes">
            <AthletesPortfolio {...pageProps} />
          </PageTransition>
        );
      case 'services':
        return (
          <PageTransition pageKey="services">
            <ServicesPage {...pageProps} />
          </PageTransition>
        );
      case 'news':
        return (
          <PageTransition pageKey="news">
            <NewsPage {...pageProps} />
          </PageTransition>
        );
      case 'contact':
        return (
          <PageTransition pageKey="contact">
            <ContactPage {...pageProps} />
          </PageTransition>
        );
      default:
        return (
          <PageTransition pageKey="home">
            <HomePage {...pageProps} />
          </PageTransition>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-carbon-black text-white overflow-x-hidden">
        {/* OPTIMIZED Custom Cursor */}
        <CustomCursor />
        
        {/* OPTIMIZED Loading Bar */}
        <LoadingBar isLoading={isLoading} />
        
        {/* OPTIMIZED Social Proof Badges */}
        <SocialProofBadges />
        
        {/* OPTIMIZED Page Content with Transitions */}
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait" initial={false}>
            {renderPage()}
          </AnimatePresence>
        </Suspense>
        
        {/* OPTIMIZED Footer */}
        <Suspense fallback={null}>
          <Footer onNavigate={handleNavigation} />
        </Suspense>
        
        {/* OPTIMIZED Back to Top */}
        <BackToTopWithProgress />
        
        {/* Print Styles */}
        <PrintStyles />
        
        {/* Performance Monitor (dev only) */}
        <PerformanceMonitor />
        
        {/* OPTIMIZED Skip Navigation Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-400 text-black px-4 py-2 rounded-lg z-[10002] font-semibold transition-all focus:scale-105"
        >
          Skip to main content
        </a>
      </div>
    </ErrorBoundary>
  );
}

export default App;