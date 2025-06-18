import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  TrendingUp, 
  Award, 
  Users, 
  Building, 
  Star,
  Trophy,
  Target,
  Zap,
  Calendar,
  MapPin
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const AgencyTimeline = () => {
  const [filter, setFilter] = useState('all');
  
  const timelineData = [
    {
      year: 2024,
      title: "Global Expansion Initiative",
      description: "Opened offices in South America and Asia, establishing presence in 12 new countries with dedicated scouting networks.",
      type: "expansion",
      icon: Globe,
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: { offices: 12, scouts: 45, players: 28 }
    },
    {
      year: 2023,
      title: "Record-Breaking Transfer Window",
      description: "Facilitated €500M in total transfer values, including three transfers exceeding €100M each.",
      type: "transfer",
      icon: TrendingUp,
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: { transfers: 45, value: "€500M", records: 3 }
    },
    {
      year: 2023,
      title: "FIFA Agent of the Year",
      description: "Recognized by FIFA as the leading sports agency for innovation in player development and career management.",
      type: "award",
      icon: Award,
      image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: { awards: 5, recognition: "FIFA", category: "Innovation" }
    },
    {
      year: 2022,
      title: "Youth Academy Launch",
      description: "Established Elite Youth Academy with state-of-the-art facilities, producing 15 professional players in first year.",
      type: "expansion",
      icon: Users,
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: { graduates: 15, facilities: 3, programs: 8 }
    },
    {
      year: 2022,
      title: "Champions League Success",
      description: "Our clients secured 8 Champions League titles across different clubs, showcasing our global talent network.",
      type: "award",
      icon: Trophy,
      image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: { titles: 8, players: 24, clubs: 6 }
    },
    {
      year: 2021,
      title: "Digital Platform Revolution",
      description: "Launched AI-powered scouting platform and virtual reality training programs for enhanced player development.",
      type: "expansion",
      icon: Zap,
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: { technology: "AI+VR", efficiency: "+300%", coverage: "Global" }
    },
    {
      year: 2021,
      title: "Billion Euro Milestone",
      description: "Reached €1 billion in cumulative transfer values, establishing ourselves as industry leaders.",
      type: "transfer",
      icon: Target,
      image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: { milestone: "€1B", growth: "+250%", market: "Leader" }
    },
    {
      year: 2020,
      title: "European Excellence Award",
      description: "Received European Sports Agency Excellence Award for outstanding contribution to football development.",
      type: "award",
      icon: Star,
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: { award: "Excellence", region: "Europe", impact: "Outstanding" }
    },
    {
      year: 2020,
      title: "Pandemic Resilience Program",
      description: "Launched comprehensive support program for athletes during COVID-19, maintaining 100% client retention.",
      type: "expansion",
      icon: Building,
      image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: { retention: "100%", support: "24/7", programs: 12 }
    },
    {
      year: 2019,
      title: "Premier League Dominance",
      description: "Secured record 25 transfers to Premier League clubs, establishing strong partnerships with top-tier teams.",
      type: "transfer",
      icon: TrendingUp,
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: { transfers: 25, league: "Premier", partnerships: 12 }
    }
  ];

  const filteredEvents = filter === 'all' 
    ? timelineData 
    : timelineData.filter(event => event.type === filter);

  const filterTypes = [
    { id: 'all', label: 'All Events', color: 'from-yellow-400 to-orange-500' },
    { id: 'transfer', label: 'Transfers', color: 'from-green-400 to-blue-500' },
    { id: 'award', label: 'Awards', color: 'from-purple-400 to-pink-500' },
    { id: 'expansion', label: 'Expansion', color: 'from-blue-400 to-purple-500' }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-carbon-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto font-body">
            Milestones and achievements that define our legacy in sports representation
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 flex-wrap"
        >
          {filterTypes.map(type => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(type.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full capitalize transition-all font-heading font-semibold text-sm sm:text-base min-h-[44px] ${
                filter === type.id
                  ? `bg-gradient-to-r ${type.color} text-black shadow-lg`
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              {type.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line - Hidden on Mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 via-purple-500 to-blue-500 rounded-full" />

          {/* Mobile Line - Left Side */}
          <div className="md:hidden absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 via-purple-500 to-blue-500 rounded-full" />

          {/* Events */}
          <AnimatePresence mode="wait">
            <motion.div layout className="space-y-8 sm:space-y-12 md:space-y-16">
              {filteredEvents.map((event, index) => (
                <TimelineEvent 
                  key={`${event.year}-${event.title}`} 
                  event={event} 
                  index={index} 
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const TimelineEvent = ({ event, index }) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });
  const isEven = index % 2 === 0;

  const typeColors = {
    transfer: 'from-green-400 to-blue-500',
    award: 'from-purple-400 to-pink-500',
    expansion: 'from-blue-400 to-purple-500'
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={{ 
        opacity: isIntersecting ? 1 : 0, 
        x: isIntersecting ? 0 : (isEven ? -100 : 100) 
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative flex items-center ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col md:mb-0 mb-8`}
    >
      {/* Content Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`w-full md:w-5/12 ${
          isEven ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'
        } mb-6 md:mb-0`}
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 hover:border-yellow-400/50 transition-all group">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <motion.div 
              className={`p-2 sm:p-3 bg-gradient-to-br ${typeColors[event.type] || 'from-yellow-400 to-orange-500'} rounded-xl sm:rounded-2xl relative overflow-hidden`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <event.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <motion.div 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 font-mono"
                whileHover={{ scale: 1.1 }}
              >
                {event.year}
              </motion.div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-400 capitalize font-body">
                  {event.type}
                </span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold mb-3 sm:mb-4 text-white group-hover:text-yellow-400 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-400 mb-4 sm:mb-6 font-body text-sm sm:text-base leading-relaxed">
            {event.description}
          </p>
          
          {/* Image */}
          {event.image && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="mb-4 sm:mb-6 overflow-hidden rounded-xl sm:rounded-2xl"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-32 sm:h-40 md:h-48 object-cover"
                loading="lazy"
              />
            </motion.div>
          )}

          {/* Stats */}
          {event.stats && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-3 sm:gap-4"
            >
              {Object.entries(event.stats).map(([key, value], idx) => (
                <div key={key} className="text-center bg-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/10">
                  <div className="text-sm sm:text-base md:text-lg font-bold text-white font-mono">
                    {value}
                  </div>
                  <div className="text-xs text-gray-400 capitalize font-body">
                    {key}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Timeline Node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isIntersecting ? 1 : 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className={`absolute ${
          // Mobile positioning
          'left-6 md:left-1/2'
        } transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br ${
          typeColors[event.type] || 'from-yellow-400 to-orange-500'
        } rounded-full border-4 border-carbon-black z-20 shadow-lg`}
      >
        {/* Pulsing Effect */}
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.7, 0.3, 0.7]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${
            typeColors[event.type] || 'from-yellow-400 to-orange-500'
          } rounded-full`}
        />

        {/* Inner Glow */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 10px rgba(255, 215, 0, 0.5)',
              '0 0 20px rgba(255, 215, 0, 0.8)',
              '0 0 10px rgba(255, 215, 0, 0.5)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
        />
      </motion.div>

      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block w-5/12" />

      {/* Connection Line to Next Event */}
      {index < 9 && (
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isIntersecting ? { pathLength: 1, opacity: 0.3 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2"
        >
          <svg width="2" height="64" className="overflow-visible">
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="64"
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 215, 0, 0.5)" />
                <stop offset="50%" stopColor="rgba(157, 0, 255, 0.5)" />
                <stop offset="100%" stopColor="rgba(0, 212, 255, 0.5)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AgencyTimeline;