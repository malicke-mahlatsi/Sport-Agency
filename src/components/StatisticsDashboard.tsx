import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Trophy, 
  Globe, 
  TrendingUp, 
  Target,
  Award,
  MapPin,
  BarChart3,
  Activity,
  Zap,
  Star,
  Calendar,
  DollarSign,
  Briefcase,
  Shield
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const StatisticsDashboard = () => {
  const { ref: dashboardRef, isIntersecting } = useIntersectionObserver({ 
    threshold: 0.2,
    triggerOnce: true 
  });

  // OPTIMIZED Counter Component with reduced animation complexity
  const AnimatedCounter = ({ 
    end, 
    prefix = '', 
    suffix = '', 
    duration = 1500, 
    delay = 0,
    icon: Icon,
    label,
    color = 'yellow',
    description = ''
  }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    const colorClasses = {
      yellow: 'from-yellow-400 to-orange-500',
      blue: 'from-blue-400 to-purple-500',
      green: 'from-green-400 to-blue-500',
      purple: 'from-purple-400 to-pink-500'
    };

    useEffect(() => {
      if (!isIntersecting || hasAnimated) return;
      
      setHasAnimated(true);
      const start = 0;
      const increment = end / (duration / 16);
      let current = start;
      
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          current += increment;
          if (current >= end) {
            setCount(end);
            clearInterval(interval);
          } else {
            setCount(Math.floor(current));
          }
        }, 16);
      }, delay);
      
      return () => clearTimeout(timer);
    }, [isIntersecting, end, duration, delay, hasAnimated]);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={isIntersecting ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: delay / 1000, duration: 0.4, ease: "easeOut" }}
        className="text-center group"
      >
        {/* OPTIMIZED Icon with reduced animation complexity */}
        <motion.div
          animate={isIntersecting ? {
            scale: [1, 1.05, 1]
          } : {}}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: delay / 1000 + 1,
            ease: "easeInOut"
          }}
          className={`inline-flex p-6 rounded-3xl bg-gradient-to-br ${colorClasses[color]} mb-6 relative overflow-hidden shadow-2xl gpu-accelerated`}
        >
          <Icon className="w-10 h-10 text-white relative z-10" />
          
          {/* Simplified Background Glow */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-50`}
            animate={{
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* OPTIMIZED Animated Counter */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isIntersecting ? { scale: 1 } : {}}
          transition={{ 
            type: "spring", 
            delay: delay / 1000 + 0.2,
            stiffness: 200,
            damping: 15,
            duration: 0.3
          }}
          className={`text-6xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent mb-3 font-mono relative gpu-accelerated`}
        >
          {prefix}{count.toLocaleString()}{suffix}
        </motion.div>

        {/* OPTIMIZED Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isIntersecting ? { opacity: 1 } : {}}
          transition={{ delay: delay / 1000 + 0.3, duration: 0.3 }}
        >
          <p className="text-lg text-gray-400 font-heading font-semibold mb-2">
            {label}
          </p>
          {description && (
            <p className="text-sm text-gray-500 font-body">
              {description}
            </p>
          )}
        </motion.div>
      </motion.div>
    );
  };

  // OPTIMIZED Circular Progress Ring
  const CircularProgress = ({ percentage, label, color, delay = 0, description = '', trend = null }) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    
    const colorGradients = {
      yellow: { from: '#FFD700', to: '#FF8C00' },
      blue: { from: '#3B82F6', to: '#8B5CF6' },
      green: { from: '#10B981', to: '#3B82F6' },
      purple: { from: '#8B5CF6', to: '#EC4899' }
    };

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: delay / 1000, duration: 0.4 }}
        className="relative w-48 h-48 mx-auto group"
      >
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          
          {/* Progress Circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={`url(#${color}Gradient)`}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={isIntersecting ? { 
              strokeDashoffset: circumference - (circumference * percentage) / 100 
            } : {}}
            transition={{ 
              duration: 2, 
              ease: "easeOut",
              delay: delay / 1000 + 0.3
            }}
          />
          
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id={`${color}Gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorGradients[color].from} />
              <stop offset="100%" stopColor={colorGradients[color].to} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isIntersecting ? { scale: 1 } : {}}
            transition={{ 
              delay: delay / 1000 + 0.5,
              type: "spring",
              stiffness: 200,
              duration: 0.3
            }}
            className="text-4xl font-bold text-white font-mono mb-1"
          >
            {percentage}%
          </motion.div>
          
          {trend && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isIntersecting ? { opacity: 1 } : {}}
              transition={{ delay: delay / 1000 + 0.6, duration: 0.3 }}
              className={`text-xs font-semibold ${trend > 0 ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}
            >
              <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(trend)}%
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isIntersecting ? { opacity: 1 } : {}}
            transition={{ delay: delay / 1000 + 0.7, duration: 0.3 }}
            className="text-sm text-gray-400 text-center font-body"
          >
            {label}
          </motion.div>
        </div>

        {/* OPTIMIZED Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={isIntersecting ? {
            boxShadow: [
              `0 0 15px ${colorGradients[color].from}30`,
              `0 0 25px ${colorGradients[color].from}40`,
              `0 0 15px ${colorGradients[color].from}30`
            ]
          } : {}}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            delay: delay / 1000 + 1
          }}
        />
      </motion.div>
    );
  };

  // OPTIMIZED World Map with reduced complexity
  const WorldMapDots = () => {
    const locations = [
      { 
        city: 'Madrid', 
        x: '48%', 
        y: '35%', 
        players: 28, 
        color: 'yellow',
        country: 'Spain',
        value: '€450M',
        office: 'Headquarters'
      },
      { 
        city: 'London', 
        x: '47%', 
        y: '30%', 
        players: 22, 
        color: 'blue',
        country: 'England',
        value: '€380M',
        office: 'Regional Hub'
      },
      { 
        city: 'Milan', 
        x: '51%', 
        y: '37%', 
        players: 18, 
        color: 'green',
        country: 'Italy',
        value: '€290M',
        office: 'Serie A Office'
      },
      { 
        city: 'Munich', 
        x: '52%', 
        y: '32%', 
        players: 15, 
        color: 'purple',
        country: 'Germany',
        value: '€220M',
        office: 'Bundesliga Hub'
      },
      { 
        city: 'Paris', 
        x: '48%', 
        y: '32%', 
        players: 24, 
        color: 'yellow',
        country: 'France',
        value: '€340M',
        office: 'Ligue 1 Center'
      },
      { 
        city: 'Barcelona', 
        x: '47%', 
        y: '38%', 
        players: 20, 
        color: 'blue',
        country: 'Spain',
        value: '€310M',
        office: 'La Liga Office'
      }
    ];

    const colorClasses = {
      yellow: 'bg-yellow-400',
      blue: 'bg-blue-400',
      green: 'bg-green-400',
      purple: 'bg-purple-400'
    };

    const [hoveredLocation, setHoveredLocation] = useState(null);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative w-full h-96 bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 gpu-accelerated"
      >
        {/* Simplified World Map Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/3 w-1/3 h-1/3 bg-white/20 rounded-full transform rotate-12" />
          <div className="absolute top-1/3 left-1/4 w-1/2 h-1/4 bg-white/20 rounded-full" />
        </div>
        
        {/* OPTIMIZED Location Dots */}
        {locations.map((location, index) => (
          <motion.div
            key={location.city}
            initial={{ scale: 0, opacity: 0 }}
            animate={isIntersecting ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="absolute group cursor-pointer"
            style={{ left: location.x, top: location.y }}
            onMouseEnter={() => setHoveredLocation(location)}
            onMouseLeave={() => setHoveredLocation(null)}
          >
            {/* OPTIMIZED Main Dot */}
            <motion.div
              animate={isIntersecting ? { 
                scale: [1, 1.2, 1]
              } : {}}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              className={`w-4 h-4 ${colorClasses[location.color]} rounded-full relative z-10 shadow-lg border-2 border-white/30 gpu-accelerated`}
            />
            
            {/* OPTIMIZED Pulse Effect */}
            <motion.div
              animate={isIntersecting ? {
                scale: [1, 2.5, 1],
                opacity: [0.6, 0, 0.6]
              } : {}}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              className={`absolute inset-0 ${colorClasses[location.color]} rounded-full`}
            />
            
            {/* OPTIMIZED City Info Card */}
            <AnimatePresence>
              {hoveredLocation?.city === location.city && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-xl rounded-2xl p-4 whitespace-nowrap border border-white/20 shadow-2xl z-50"
                >
                  <div className="text-center">
                    <h4 className="text-white font-bold text-lg mb-1">{location.city}</h4>
                    <p className="text-gray-400 text-sm mb-3">{location.country} • {location.office}</p>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white/10 rounded-lg p-2">
                        <div className="text-yellow-400 font-bold">{location.players}</div>
                        <div className="text-gray-400">Players</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2">
                        <div className="text-green-400 font-bold">{location.value}</div>
                        <div className="text-gray-400">Portfolio</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow pointing to dot */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* OPTIMIZED Stats Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="relative">
              <div className="text-2xl font-bold text-yellow-400 font-mono">6</div>
              <div className="text-xs text-gray-400">Major Cities</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 font-mono">153</div>
              <div className="text-xs text-gray-400">Active Players</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 font-mono">€2.37B</div>
              <div className="text-xs text-gray-400">Total Portfolio</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 font-mono">45</div>
              <div className="text-xs text-gray-400">Countries</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // OPTIMIZED Animated Bar Chart
  const AnimatedBarChart = ({ data, title, subtitle = '', valuePrefix = '', valueSuffix = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 gpu-accelerated"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-heading font-bold mb-2 text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="text-gray-400 text-sm font-body">{subtitle}</p>
        )}
      </div>
      
      <div className="flex items-end justify-center gap-6 h-64">
        {data.map((item, index) => (
          <div key={item.year} className="flex flex-col items-center flex-1 max-w-20">
            {/* OPTIMIZED Bar */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={isIntersecting ? { 
                height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%`,
                opacity: 1
              } : {}}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.8,
                ease: "easeOut"
              }}
              className="w-full bg-gradient-to-t from-yellow-400 via-purple-500 to-blue-500 rounded-t-2xl relative overflow-hidden shadow-lg border border-white/20 gpu-accelerated"
            >
              {/* Data Point Indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isIntersecting ? { scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
              />
            </motion.div>
            
            {/* OPTIMIZED Value Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-base font-bold text-white font-mono bg-black/70 backdrop-blur-xl rounded-lg px-3 py-1 border border-white/20"
            >
              {valuePrefix}{item.value}{valueSuffix}
            </motion.div>
            
            {/* OPTIMIZED Year Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isIntersecting ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.6, duration: 0.3 }}
              className="mt-4 text-sm text-gray-400 font-body text-center font-semibold"
            >
              {item.year}
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Real Data Sets
  const mainStats = [
    { 
      icon: Users, 
      value: 153, 
      suffix: '', 
      label: 'Elite Athletes', 
      color: 'yellow', 
      delay: 0,
      description: 'Across 8 major leagues'
    },
    { 
      icon: Trophy, 
      value: 547, 
      suffix: '', 
      label: 'Successful Transfers', 
      color: 'blue', 
      delay: 100,
      description: 'Since 2019'
    },
    { 
      icon: Globe, 
      value: 45, 
      suffix: '', 
      label: 'Countries Worldwide', 
      color: 'green', 
      delay: 200,
      description: 'Global presence'
    },
    { 
      icon: TrendingUp, 
      value: 97, 
      suffix: '%', 
      label: 'Success Rate', 
      color: 'purple', 
      delay: 300,
      description: 'Client satisfaction'
    }
  ];

  const progressStats = [
    { 
      percentage: 94, 
      label: 'Client Satisfaction', 
      color: 'yellow', 
      delay: 400,
      description: 'Based on 2024 survey',
      trend: 3
    },
    { 
      percentage: 89, 
      label: 'Contract Success', 
      color: 'blue', 
      delay: 500,
      description: 'Negotiation win rate',
      trend: 5
    },
    { 
      percentage: 92, 
      label: 'Market Growth', 
      color: 'green', 
      delay: 600,
      description: 'Portfolio value increase',
      trend: 8
    },
    { 
      percentage: 87, 
      label: 'Global Reach', 
      color: 'purple', 
      delay: 700,
      description: 'International expansion',
      trend: 12
    }
  ];

  const transferData = [
    { year: '2020', value: 45 },
    { year: '2021', value: 67 },
    { year: '2022', value: 89 },
    { year: '2023', value: 124 },
    { year: '2024', value: 156 }
  ];

  const valueData = [
    { year: '2020', value: 1.2 },
    { year: '2021', value: 1.8 },
    { year: '2022', value: 2.4 },
    { year: '2023', value: 3.1 },
    { year: '2024', value: 4.2 }
  ];

  return (
    <section 
      ref={dashboardRef}
      className="py-24 px-8 bg-carbon-black relative overflow-hidden"
    >
      {/* OPTIMIZED Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* OPTIMIZED Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-heading font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Performance Analytics
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-body">
            Real-time insights and comprehensive statistics showcasing our global impact in sports representation
          </p>
        </motion.div>

        {/* OPTIMIZED Main Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {mainStats.map((stat, index) => (
            <AnimatedCounter
              key={index}
              end={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
              color={stat.color}
              delay={stat.delay}
              duration={1500}
              description={stat.description}
            />
          ))}
        </div>

        {/* OPTIMIZED Progress Rings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-24"
        >
          <h3 className="text-4xl font-heading font-bold text-center mb-16 text-white">
            Key Performance Indicators
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {progressStats.map((stat, index) => (
              <CircularProgress
                key={index}
                percentage={stat.percentage}
                label={stat.label}
                color={stat.color}
                delay={stat.delay}
                description={stat.description}
                trend={stat.trend}
              />
            ))}
          </div>
        </motion.div>

        {/* OPTIMIZED World Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-24"
        >
          <h3 className="text-4xl font-heading font-bold text-center mb-16 text-white">
            Global Presence
          </h3>
          <WorldMapDots />
        </motion.div>

        {/* OPTIMIZED Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <AnimatedBarChart 
            data={transferData} 
            title="Annual Transfers Completed"
            subtitle="Successful player transfers by year"
            valueSuffix=" transfers"
          />
          <AnimatedBarChart 
            data={valueData} 
            title="Portfolio Value Growth"
            subtitle="Total client portfolio value in billions"
            valuePrefix="€"
            valueSuffix="B"
          />
        </div>

        {/* OPTIMIZED Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 max-w-4xl mx-auto relative overflow-hidden gpu-accelerated">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/3 to-purple-500/3" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-heading font-bold mb-6 text-white">
                Ready to Join Our Success Story?
              </h3>
              <p className="text-lg text-gray-400 mb-8 font-body">
                Become part of our elite network and experience world-class sports representation
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full font-heading font-semibold text-black hover:shadow-lg hover:shadow-yellow-400/25 transition-all text-lg gpu-accelerated"
              >
                Get Started Today
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsDashboard;