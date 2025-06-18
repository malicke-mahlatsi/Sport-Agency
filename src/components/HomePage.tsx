import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Globe, Trophy, Users, TrendingUp, Menu, X, Activity, Brain, Zap, Target } from 'lucide-react';
import MobileMenu from './MobileMenu';
import StatisticsDashboard from './StatisticsDashboard';
import AgencyTimeline from './AgencyTimeline';
import TestimonialsSlider from './TestimonialsSlider';
import NewsletterSection from './NewsletterSection';
import FAQSection from './FAQSection';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const HomePage = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsTypingComplete(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { icon: Users, value: 153, label: 'Athletes Managed', suffix: '' },
    { icon: Trophy, value: 547, label: 'Successful Transfers', suffix: '' },
    { icon: Globe, value: 45, label: 'Countries', suffix: '' },
    { icon: TrendingUp, value: 97, label: 'Success Rate', suffix: '%' }
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref: statsRef, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });

  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true);
      
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.value;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = end;
              return newCounters;
            });
            clearInterval(timer);
          } else {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = Math.floor(start);
              return newCounters;
            });
          }
        }, 16);
      });
    }
  }, [isIntersecting, hasAnimated, stats]);

  const handleNavigation = (page) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  // Enhanced AI Dashboard Component with Real Data
  const FuturisticDashboard = () => {
    const [selectedMetric, setSelectedMetric] = useState('performance');
    const [realTimeData, setRealTimeData] = useState([]);
    const [aiInsights, setAiInsights] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const { ref: dashboardRef, isIntersecting: isDashboardVisible } = useIntersectionObserver({ 
      threshold: 0.1,
      triggerOnce: false
    });

    // Generate realistic real-time data
    const generateRealisticData = () => {
      const baseValues = {
        performance: [85, 87, 89, 91, 88, 92, 94, 90, 93, 95, 92, 96],
        market: [78, 82, 85, 88, 84, 90, 87, 92, 89, 94, 91, 93],
        social: [72, 75, 78, 82, 85, 88, 91, 87, 90, 93, 89, 95],
        health: [88, 90, 87, 92, 89, 94, 91, 96, 93, 89, 92, 94]
      };
      
      return baseValues[selectedMetric].map((value, i) => ({
        value: value + Math.floor(Math.random() * 6) - 3, // Add realistic variance
        timestamp: Date.now() - (11 - i) * 5000,
        label: `${i + 1}:00`
      }));
    };

    // Generate realistic AI insights
    const generateRealisticInsights = () => {
      const insights = [
        {
          type: 'opportunity',
          icon: Target,
          color: 'text-green-400',
          bgColor: 'bg-green-400/20',
          borderColor: 'border-green-400/30',
          title: 'TRANSFER OPPORTUNITY',
          message: 'Carlos Rodriguez showing 23% performance increase - optimal transfer window approaching',
          confidence: 94
        },
        {
          type: 'performance',
          icon: TrendingUp,
          color: 'text-blue-400',
          bgColor: 'bg-blue-400/20',
          borderColor: 'border-blue-400/30',
          title: 'PERFORMANCE ALERT',
          message: '5 players exceeding expected metrics this quarter - contract renegotiation recommended',
          confidence: 89
        },
        {
          type: 'market',
          icon: Activity,
          color: 'text-purple-400',
          bgColor: 'bg-purple-400/20',
          borderColor: 'border-purple-400/30',
          title: 'MARKET TREND',
          message: 'Premier League midfielder valuations up 18% - strategic positioning advised',
          confidence: 82
        }
      ];
      return insights;
    };

    useEffect(() => {
      setRealTimeData(generateRealisticData());
      setAiInsights(generateRealisticInsights());

      let animationFrame;
      const updateData = () => {
        setRealTimeData(generateRealisticData());
        if (Math.random() > 0.7) {
          setAiInsights(generateRealisticInsights());
        }
        animationFrame = requestAnimationFrame(() => {
          setTimeout(updateData, 5000); // Update every 5 seconds for realism
        });
      };

      const timeoutId = setTimeout(updateData, 5000);

      return () => {
        clearTimeout(timeoutId);
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [selectedMetric]);

    useEffect(() => {
      if (isDashboardVisible) {
        setIsVisible(true);
      }
    }, [isDashboardVisible]);

    const metrics = [
      { id: 'performance', label: 'PERFORMANCE', color: 'from-blue-500 to-purple-500' },
      { id: 'market', label: 'MARKET', color: 'from-purple-500 to-yellow-500' },
      { id: 'social', label: 'SOCIAL', color: 'from-yellow-500 to-green-500' },
      { id: 'health', label: 'HEALTH', color: 'from-green-500 to-blue-500' }
    ];

    // Generate SVG path for chart
    const generateChartPath = (data) => {
      if (!data.length) return '';
      
      const width = 100;
      const height = 100;
      const points = data.map((point, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (point.value / 100) * height;
        return `${x},${y}`;
      });
      
      return `M ${points.join(' L ')}`;
    };

    return (
      <section 
        ref={dashboardRef} 
        className="sticky top-0 py-24 px-4 sm:px-6 md:px-8 bg-carbon-black min-h-screen flex flex-col justify-center transform-gpu"
        style={{ 
          position: 'sticky',
          zIndex: 1,
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        {/* Enhanced Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(157,0,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(157,0,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] will-change-transform" />
        
        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full will-change-transform"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                AI-Powered Performance Analytics
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 font-body max-w-3xl mx-auto px-4">
              Real-time insights powered by advanced machine learning algorithms
            </p>
          </motion.div>

          {/* Enhanced Metric Selector Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 flex-wrap px-4"
          >
            {metrics.map((metric, index) => (
              <motion.button
                key={metric.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4, ease: "easeOut" }}
                onClick={() => setSelectedMetric(metric.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-mono text-sm smooth-transition relative overflow-hidden transform-gpu min-h-[44px] ${
                  selectedMetric === metric.id
                    ? `bg-gradient-to-r ${metric.color} text-black font-bold`
                    : 'bg-white/5 hover:bg-white/10 border border-white/20 text-white hover-lift'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{metric.label}</span>
                {selectedMetric === metric.id && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
            {/* Enhanced Live Graph */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-2 glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-pulse" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-blue-400">Real-Time Metrics</h3>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    />
                    <span className="text-green-400 text-sm font-mono">LIVE</span>
                  </div>
                </div>

                {/* Enhanced Chart Container */}
                <div className="relative h-48 sm:h-64 bg-black/30 rounded-xl sm:rounded-2xl p-4 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    
                    {/* Animated Chart Path */}
                    <motion.path
                      d={generateChartPath(realTimeData)}
                      fill="url(#chartGradient)"
                      stroke="#00D4FF"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </svg>

                  {/* Enhanced Data Points */}
                  {realTimeData.map((point, index) => (
                    <motion.div
                      key={`${point.timestamp}-${index}`}
                      className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg transform-gpu"
                      style={{
                        left: `${(index / (realTimeData.length - 1)) * 90 + 5}%`,
                        bottom: `${(point.value / 100) * 80 + 10}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1, ease: "easeOut" }}
                      whileHover={{ scale: 1.5 }}
                    />
                  ))}

                  {/* Grid Lines */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-t border-white/10"
                      style={{ bottom: `${i * 20}%` }}
                    />
                  ))}
                </div>

                {/* Enhanced Chart Legend */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-400 font-mono">
                  <span>5 min ago</span>
                  <span className="text-blue-400">Current: {realTimeData[realTimeData.length - 1]?.value || 0}%</span>
                  <span>Now</span>
                </div>
              </div>
            </motion.div>

            {/* Enhanced AI Insights Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-green-500/5 animate-pulse" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-purple-400">AI Insights</h3>
                </div>

                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <motion.div
                      key={`${insight.type}-${index}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.2, duration: 0.5, ease: "easeOut" }}
                      className={`p-4 bg-white/5 rounded-xl border ${insight.borderColor} hover:border-white/20 smooth-transition group relative overflow-hidden hover-lift`}
                    >
                      <div className={`absolute inset-0 ${insight.bgColor} opacity-0 group-hover:opacity-100 smooth-transition`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 ${insight.bgColor} rounded-lg flex items-center justify-center`}>
                            <insight.icon className={`w-4 h-4 ${insight.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`text-sm ${insight.color} font-mono font-bold block truncate`}>
                              {insight.title}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full ${insight.color.replace('text-', 'bg-')} rounded-full`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${insight.confidence}%` }}
                                  transition={{ delay: 1 + index * 0.2, duration: 1, ease: "easeOut" }}
                                />
                              </div>
                              <span className="text-xs text-gray-400 font-mono">{insight.confidence}%</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 font-body leading-relaxed">
                          {insight.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced AI Status Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
                  className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-green-400 animate-pulse" />
                    <div>
                      <p className="text-sm font-mono text-green-400 font-bold">AI ENGINE STATUS</p>
                      <p className="text-xs text-gray-400">Processing 1,247 data points/sec</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Performance Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 px-4"
          >
            {[
              { label: 'Active Scans', value: '1,247', change: '+12%', color: 'text-blue-400' },
              { label: 'AI Predictions', value: '89', change: '+5%', color: 'text-purple-400' },
              { label: 'Market Alerts', value: '23', change: '+18%', color: 'text-yellow-400' },
              { label: 'Success Rate', value: '94.2%', change: '+2.1%', color: 'text-green-400' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4, ease: "easeOut" }}
                className="glass-effect rounded-xl md:rounded-2xl p-4 sm:p-6 text-center hover-lift group border border-white/10 transform-gpu"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-xs sm:text-sm text-gray-400 font-body mb-2 truncate">{metric.label}</p>
                <p className={`text-lg sm:text-2xl font-mono font-bold ${metric.color} mb-1`}>
                  {metric.value}
                </p>
                <p className={`text-xs ${metric.color} font-mono`}>{metric.change}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-carbon-black text-white overflow-x-hidden font-body">
      {/* Enhanced Fixed Navigation */}
      <nav className="fixed top-0 w-full z-[9999] px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="bg-black/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 flex justify-between items-center border border-white/20 smooth-transition max-w-7xl mx-auto">
          <h1 
            className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-white cursor-pointer hover:text-yellow-400 smooth-transition truncate"
            onClick={() => handleNavigation('home')}
          >
            ELITE SPORTS AGENCY
          </h1>
          
          {/* Enhanced Desktop Menu */}
          <div className="hidden md:flex gap-4 lg:gap-6 xl:gap-8 items-center font-heading">
            <button 
              onClick={() => handleNavigation('home')}
              className="text-yellow-400 hover:text-yellow-300 smooth-transition font-semibold px-3 py-2 rounded-lg hover-lift"
              style={{ color: '#FFD700' }}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('athletes')}
              className="text-white hover:text-yellow-400 smooth-transition font-medium px-3 py-2 rounded-lg hover-lift"
            >
              Athletes
            </button>
            <button 
              onClick={() => handleNavigation('services')}
              className="text-white hover:text-yellow-400 smooth-transition font-medium px-3 py-2 rounded-lg hover-lift"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigation('news')}
              className="text-white hover:text-yellow-400 smooth-transition font-medium px-3 py-2 rounded-lg hover-lift"
            >
              News
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="text-white hover:text-yellow-400 smooth-transition font-medium px-3 py-2 rounded-lg hover-lift"
            >
              Contact
            </button>
            <motion.button 
              onClick={() => handleNavigation('contact')}
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full text-black font-semibold transform-gpu min-h-[44px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-2 text-white rounded-lg border border-white/20 smooth-transition min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleNavigation}
        currentPage="home"
      />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-carbon-black/50 via-carbon-black/30 to-carbon-black"></div>
        
        {/* Enhanced Floating Geometric Shapes */}
        <motion.div
          style={{ y: scrollY * 0.5 }}
          className="absolute top-20 right-20 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl transform-gpu opacity-60"
        />
        <motion.div
          style={{ y: scrollY * -0.3 }}
          className="absolute bottom-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full blur-3xl transform-gpu opacity-40"
        />
        <motion.div
          style={{ y: scrollY * 0.2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-3xl transform-gpu opacity-30"
        />

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight"
          >
            <span className="text-white">
              Where Champions
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Begin Their Legacy
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4 leading-relaxed">
              Elite athlete representation with a personal touch. We don't just manage careers, 
              we build dynasties in the world of professional sports.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
          >
            <motion.button 
              onClick={() => handleNavigation('athletes')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full font-heading font-semibold text-black text-base sm:text-lg transform-gpu min-h-[44px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Athletes
            </motion.button>
            <motion.button 
              onClick={() => handleNavigation('contact')}
              className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 rounded-full hover:bg-white/10 smooth-transition backdrop-blur-sm font-heading font-semibold text-white text-base sm:text-lg transform-gpu min-h-[44px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10"
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section ref={statsRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, ease: "easeOut" }}
              className="text-center"
            >
              <div className="glass-effect rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/10 smooth-transition group border border-white/10 hover-lift transform-gpu">
                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-4 text-yellow-400 group-hover:scale-110 smooth-transform" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold mb-2 text-white">
                  {counters[index]}{stat.suffix}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base font-heading">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics Dashboard */}
      <StatisticsDashboard />

      {/* Client Testimonials Slider */}
      <TestimonialsSlider />

      {/* FAQ Section */}
      <FAQSection onNavigate={handleNavigation} />

      {/* Newsletter Section */}
      <NewsletterSection onNavigate={handleNavigation} />

      {/* Agency Timeline */}
      <AgencyTimeline />

      {/* AI-Powered Dashboard */}
      <FuturisticDashboard />
    </div>
  );
};

export default HomePage;