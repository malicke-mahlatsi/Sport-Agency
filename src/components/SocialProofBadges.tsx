import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Award, 
  ChevronLeft, 
  TrendingUp, 
  Star,
  Trophy,
  Target,
  Zap,
  Eye,
  X
} from 'lucide-react';
import { useIntersectionObserver, useOptimizedScroll } from '../hooks/useIntersectionObserver';

const SocialProofBadges = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMetric, setActiveMetric] = useState(0);
  const [realTimeData, setRealTimeData] = useState({});

  // OPTIMIZED scroll tracking with throttling
  useOptimizedScroll(useCallback((scrollY) => {
    const scrollPercentage = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    setScrollProgress(scrollPercentage);
    setIsVisible(scrollPercentage > 15 && scrollPercentage < 95);
  }, []));

  // Real-time data simulation
  useEffect(() => {
    const updateRealTimeData = () => {
      setRealTimeData({
        activeUsers: 1247 + Math.floor(Math.random() * 50),
        liveViews: 89 + Math.floor(Math.random() * 20),
        todaySignups: 23 + Math.floor(Math.random() * 10)
      });
    };

    updateRealTimeData();
    const interval = setInterval(updateRealTimeData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle through metrics
  useEffect(() => {
    if (!isVisible || isMinimized) return;
    
    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % badges.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isVisible, isMinimized]);

  const badges = [
    {
      id: 'athletes',
      value: 153,
      label: 'Elite Athletes',
      icon: Users,
      color: 'from-yellow-400 to-orange-500',
      detail: 'Across 8 major leagues worldwide',
      realTime: false,
      trend: '+12 this month'
    },
    {
      id: 'countries',
      value: 45,
      label: 'Countries',
      icon: Globe,
      color: 'from-blue-400 to-cyan-500',
      detail: 'Global network spanning continents',
      realTime: false,
      trend: '+3 new markets'
    },
    {
      id: 'experience',
      value: 15,
      label: 'Years Experience',
      icon: Award,
      color: 'from-purple-400 to-pink-500',
      detail: 'Industry-leading expertise since 2009',
      realTime: false,
      trend: 'Established leader'
    },
    {
      id: 'success',
      value: 97,
      suffix: '%',
      label: 'Success Rate',
      icon: Target,
      color: 'from-green-400 to-emerald-500',
      detail: 'Transfer completion rate',
      realTime: false,
      trend: '+2% this year'
    },
    {
      id: 'live-users',
      value: realTimeData.activeUsers || 1247,
      label: 'Active Users',
      icon: Eye,
      color: 'from-red-400 to-pink-500',
      detail: 'Currently browsing our platform',
      realTime: true,
      trend: 'Live now'
    }
  ];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        >
          <div className={`transition-all duration-500 ease-out ${isMinimized ? 'w-16' : 'w-72'}`}>
            {/* OPTIMIZED Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMinimized(!isMinimized)}
              className="absolute -right-3 top-0 w-6 h-6 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 z-10"
              aria-label={isMinimized ? "Expand badges" : "Minimize badges"}
            >
              <motion.div
                animate={{ rotate: isMinimized ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </motion.div>
            </motion.button>

            {/* OPTIMIZED Badges Container */}
            <div className="space-y-3">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: isMinimized ? 1.1 : 1.02, x: 5 }}
                  onClick={() => scrollToSection(badge.id)}
                  className="relative group cursor-pointer"
                >
                  <div className={`bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/30 ${
                    isMinimized ? 'p-3' : 'p-4'
                  } ${activeMetric === index ? 'ring-2 ring-yellow-400/50' : ''}`}>
                    
                    {/* OPTIMIZED Glassmorphism effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className={`relative z-10 ${isMinimized ? 'flex justify-center' : 'flex items-center gap-3'}`}>
                      {/* OPTIMIZED Icon with gradient background */}
                      <motion.div
                        animate={activeMetric === index ? { 
                          y: [0, -3, 0],
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className={`p-2 bg-gradient-to-br ${badge.color} rounded-xl relative overflow-hidden shadow-lg`}
                      >
                        <badge.icon className="w-5 h-5 text-white relative z-10" />
                        
                        {/* Real-time pulse for live data */}
                        {badge.realTime && (
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.3, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-white/20 rounded-xl"
                          />
                        )}
                      </motion.div>
                      
                      {!isMinimized && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <AnimatedCounter
                              end={badge.value}
                              suffix={badge.suffix || ''}
                              duration={1500}
                              className="text-2xl font-bold text-white font-mono"
                            />
                            {badge.realTime && (
                              <motion.div
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-2 h-2 bg-green-400 rounded-full"
                              />
                            )}
                          </div>
                          <p className="text-xs text-gray-400 font-body truncate">{badge.label}</p>
                          <p className="text-xs text-yellow-400 font-semibold truncate">{badge.trend}</p>
                        </div>
                      )}
                    </div>

                    {/* OPTIMIZED Tooltip for minimized state */}
                    {isMinimized && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      >
                        <div className="bg-black/90 backdrop-blur-xl rounded-xl px-4 py-3 whitespace-nowrap border border-white/20 shadow-2xl">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-lg font-bold text-white font-mono">
                              {badge.value}{badge.suffix || ''}
                            </div>
                            {badge.realTime && (
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            )}
                          </div>
                          <div className="text-sm font-semibold text-white">{badge.label}</div>
                          <p className="text-xs text-gray-400">{badge.detail}</p>
                          <p className="text-xs text-yellow-400 font-semibold">{badge.trend}</p>
                        </div>
                        
                        {/* Arrow pointing to badge */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black/90"></div>
                      </motion.div>
                    )}

                    {/* OPTIMIZED Progress indicator for active metric */}
                    {activeMetric === index && !isMinimized && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full"
                        style={{ width: '100%' }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* OPTIMIZED Scroll Progress Indicator */}
            {!isMinimized && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 p-3 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-semibold">Page Progress</span>
                  <span className="text-xs text-yellow-400 font-mono">{Math.round(scrollProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full"
                    style={{ width: `${scrollProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// OPTIMIZED Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', duration = 1500, className = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    setHasAnimated(true);
    const start = 0;
    const increment = end / (duration / 16);
    let current = start;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, [end, duration, hasAnimated]);

  return (
    <span className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default SocialProofBadges;