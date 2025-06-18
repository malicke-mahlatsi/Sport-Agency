import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, TrendingUp, TrendingDown, X, Menu, Phone, Star, Eye, BarChart3, Sparkles, Zap, Camera, Heart, Share2, User } from 'lucide-react';
import MobileMenu from './MobileMenu';
import AdvancedFilterSystem from './AdvancedFilterSystem';
import { AthleteCardSkeleton } from './LoadingSkeleton';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import ImageGallery from './ImageGallery';

const AthletesPortfolio = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const [showGallery, setShowGallery] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid');
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const { ref: gridRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const athletes = [
    {
      id: 1,
      name: 'Carlos Rodriguez',
      position: 'Forward',
      team: 'Real Madrid',
      nationality: 'Spain',
      age: 24,
      marketValue: '€85M',
      previousValue: '€75M',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { goals: 28, assists: 12, matches: 38 },
      achievements: ['La Liga Champion 2023', 'Golden Boot 2023', 'UEFA Best Forward'],
      rank: 1,
      featured: true,
      performance: 95,
      socialMedia: { followers: '2.5M', engagement: '8.2%' },
      contract: { expires: '2027', value: '€12M/year' },
      gallery: [
        {
          id: 'carlos-1',
          src: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1200',
          thumbnail: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300',
          alt: 'Carlos Rodriguez in action',
          title: 'Champions League Final Goal',
          description: 'Carlos scoring the winning goal in the Champions League final against Manchester City.',
          photographer: 'Elite Sports Media',
          location: 'Wembley Stadium, London',
          date: 'June 10, 2023'
        },
        {
          id: 'carlos-2',
          src: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=1200',
          thumbnail: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=300',
          alt: 'Carlos Rodriguez training',
          title: 'Pre-Season Training',
          description: 'Intensive training session preparing for the new season.',
          photographer: 'Real Madrid Media',
          location: 'Valdebebas Training Ground',
          date: 'July 15, 2023'
        }
      ]
    },
    {
      id: 2,
      name: 'João Silva',
      position: 'Midfielder',
      team: 'Barcelona',
      nationality: 'Portugal',
      age: 22,
      marketValue: '€65M',
      previousValue: '€58M',
      image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { goals: 12, assists: 22, matches: 42 },
      achievements: ['Champions League Winner', 'Best Young Player 2023'],
      rank: 2,
      performance: 88,
      socialMedia: { followers: '1.8M', engagement: '6.7%' },
      contract: { expires: '2026', value: '€8M/year' },
      gallery: [
        {
          id: 'joao-1',
          src: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=1200',
          thumbnail: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=300',
          alt: 'João Silva match action',
          title: 'El Clasico Performance',
          description: 'Outstanding midfield performance in the historic El Clasico victory.',
          photographer: 'Barcelona Media',
          location: 'Camp Nou, Barcelona',
          date: 'October 28, 2023'
        }
      ]
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      position: 'Defender',
      team: 'Manchester United',
      nationality: 'England',
      age: 26,
      marketValue: '€45M',
      previousValue: '€48M',
      image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { goals: 3, assists: 8, matches: 35 },
      achievements: ['Premier League Champion', 'England Player of the Year'],
      rank: 3,
      performance: 82,
      socialMedia: { followers: '1.2M', engagement: '5.4%' },
      contract: { expires: '2025', value: '€6M/year' },
      gallery: [
        {
          id: 'marcus-1',
          src: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=1200',
          thumbnail: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=300',
          alt: 'Marcus Johnson defending',
          title: 'Premier League Title Celebration',
          description: 'Celebrating the Premier League title with teammates at Old Trafford.',
          photographer: 'Manchester United Media',
          location: 'Old Trafford, Manchester',
          date: 'May 21, 2023'
        }
      ]
    },
    {
      id: 4,
      name: 'Alessandro Rossi',
      position: 'Goalkeeper',
      team: 'AC Milan',
      nationality: 'Italy',
      age: 28,
      marketValue: '€35M',
      previousValue: '€32M',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { saves: 142, cleanSheets: 18, matches: 38 },
      achievements: ['Serie A Golden Glove', 'UEFA Goalkeeper of the Year'],
      rank: 4,
      performance: 90,
      socialMedia: { followers: '950K', engagement: '4.8%' },
      contract: { expires: '2026', value: '€5M/year' },
      gallery: [
        {
          id: 'alessandro-1',
          src: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1200',
          thumbnail: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300',
          alt: 'Alessandro Rossi save',
          title: 'Crucial Penalty Save',
          description: 'Match-winning penalty save in the Serie A title decider.',
          photographer: 'AC Milan Media',
          location: 'San Siro, Milan',
          date: 'May 28, 2023'
        }
      ]
    },
    {
      id: 5,
      name: 'Maria Gonzalez',
      position: 'Forward',
      team: 'Barcelona Femení',
      nationality: 'Spain',
      age: 23,
      marketValue: '€25M',
      previousValue: '€20M',
      image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { goals: 32, assists: 15, matches: 35 },
      achievements: ['Champions League Winner', 'Ballon d\'Or Nominee'],
      rank: 5,
      performance: 93,
      socialMedia: { followers: '1.1M', engagement: '9.1%' },
      contract: { expires: '2026', value: '€500K/year' },
      gallery: []
    },
    {
      id: 6,
      name: 'Diego Martinez',
      position: 'Winger',
      team: 'Manchester City',
      nationality: 'Argentina',
      age: 25,
      marketValue: '€75M',
      previousValue: '€65M',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { goals: 22, assists: 18, matches: 40 },
      achievements: ['Premier League Winner', 'Argentine International'],
      rank: 6,
      performance: 89,
      socialMedia: { followers: '2.1M', engagement: '7.3%' },
      contract: { expires: '2028', value: '€10M/year' },
      gallery: []
    }
  ];

  const handleNavigation = (page) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const addToCompare = (athleteId) => {
    if (compareList.length < 3 && !compareList.includes(athleteId)) {
      setCompareList([...compareList, athleteId]);
      
      setButtonStates(prev => ({
        ...prev,
        [`compare-${athleteId}`]: 'success'
      }));
      
      setTimeout(() => {
        setButtonStates(prev => ({
          ...prev,
          [`compare-${athleteId}`]: null
        }));
      }, 1000);
    }
  };

  const removeFromCompare = (athleteId) => {
    setCompareList(compareList.filter(id => id !== athleteId));
  };

  const toggleFavorite = (athleteId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(athleteId)) {
        newFavorites.delete(athleteId);
      } else {
        newFavorites.add(athleteId);
      }
      return newFavorites;
    });
  };

  const handleViewProfile = (athlete) => {
    setButtonStates(prev => ({
      ...prev,
      [`view-${athlete.id}`]: 'loading'
    }));
    
    setTimeout(() => {
      setSelectedAthlete(athlete);
      setButtonStates(prev => ({
        ...prev,
        [`view-${athlete.id}`]: null
      }));
    }, 800);
  };

  const handleViewGallery = (athlete) => {
    setSelectedAthlete(athlete);
    setShowGallery(true);
  };

  const handleContact = (athleteId) => {
    setButtonStates(prev => ({
      ...prev,
      [`contact-${athleteId}`]: 'success'
    }));
    
    setTimeout(() => {
      setButtonStates(prev => ({
        ...prev,
        [`contact-${athleteId}`]: null
      }));
      onNavigate('contact');
    }, 1000);
  };

  const handleShare = async (athlete) => {
    const shareData = {
      title: `${athlete.name} - ${athlete.position}`,
      text: `Check out ${athlete.name}, ${athlete.position} at ${athlete.team}. Market value: ${athlete.marketValue}`,
      url: window.location.href + '#athlete-' + athlete.id
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        navigator.clipboard.writeText(shareData.url);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
    }
  };

  // Enhanced Performance Ring Component
  const PerformanceRing = ({ performance, size = 'sm' }) => {
    const radius = size === 'sm' ? 16 : 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (performance / 100) * circumference;

    return (
      <div className={`relative ${size === 'sm' ? 'w-8 h-8' : 'w-12 h-12'}`}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={performance >= 90 ? '#10B981' : performance >= 75 ? '#F59E0B' : '#EF4444'}
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-mono font-bold ${size === 'sm' ? 'text-xs' : 'text-sm'} text-white`}>
            {performance}
          </span>
        </div>
      </div>
    );
  };

  // Market Value Trend Indicator
  const TrendIndicator = ({ currentValue, previousValue }) => {
    const current = parseFloat(currentValue.replace(/[€M]/g, ''));
    const previous = parseFloat(previousValue.replace(/[€M]/g, ''));
    const change = ((current - previous) / previous) * 100;
    const isPositive = change >= 0;
    
    return (
      <motion.div 
        className={`flex items-center gap-1 text-xs sm:text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          animate={{ y: isPositive ? [-2, 0, -2] : [2, 0, 2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isPositive ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />}
        </motion.div>
        <span className="font-bold font-mono">{Math.abs(change).toFixed(1)}%</span>
      </motion.div>
    );
  };

  // Enhanced Featured Badge Component
  const FeaturedBadge = ({ featured }) => {
    if (!featured) return null;
    
    return (
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 20px rgba(255, 215, 0, 0.5)',
            '0 0 40px rgba(255, 215, 0, 0.8)',
            '0 0 20px rgba(255, 215, 0, 0.5)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border border-yellow-300 z-20 shadow-lg"
      >
        <span className="text-xs font-bold text-black flex items-center gap-1">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-2 h-2 sm:w-3 sm:h-3" />
          </motion.div>
          <span className="hidden sm:inline">FEATURED</span>
          <span className="sm:hidden">★</span>
        </span>
      </motion.div>
    );
  };

  // Enhanced Quick Stats Overlay Component
  const QuickStatsOverlay = ({ athlete, isVisible }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20,
        scale: isVisible ? 1 : 0.9
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute inset-x-3 sm:inset-x-4 top-3 sm:top-4 bg-black/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/30 shadow-2xl"
    >
      {/* Performance Ring */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs sm:text-sm font-semibold text-white">Performance</span>
        <PerformanceRing performance={athlete.performance} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center mb-3">
        {Object.entries(athlete.stats).map(([key, value], index) => (
          <motion.div 
            key={key}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className={`text-sm sm:text-base md:text-lg font-bold font-mono ${
              index === 0 ? 'text-yellow-400' : 
              index === 1 ? 'text-blue-400' : 'text-green-400'
            }`}>
              {value}
            </div>
            <div className="text-xs text-gray-400 capitalize font-body">{key}</div>
          </motion.div>
        ))}
      </div>

      {/* Social Media Stats */}
      <div className="flex justify-between text-xs text-gray-400">
        <span>{athlete.socialMedia.followers} followers</span>
        <span>{athlete.socialMedia.engagement} engagement</span>
      </div>
    </motion.div>
  );

  // Enhanced Action Buttons Component
  const ActionButtons = ({ athlete, isVisible }) => (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent"
    >
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {/* Enhanced View Profile Button */}
        <motion.button 
          onClick={() => handleViewProfile(athlete)}
          disabled={buttonStates[`view-${athlete.id}`] === 'loading'}
          className="flex-1 relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full text-xs sm:text-sm font-bold transition-all duration-300 min-h-[44px] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 25px rgba(255, 215, 0, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: buttonStates[`view-${athlete.id}`] === 'loading' 
              ? 'linear-gradient(45deg, #3B82F6, #8B5CF6)' 
              : undefined
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          
          <div className="relative z-10 flex items-center gap-1 sm:gap-2">
            {buttonStates[`view-${athlete.id}`] === 'loading' ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full"
                />
                <span className="hidden sm:inline">Loading...</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">View Profile</span>
                <span className="sm:hidden">View</span>
              </>
            )}
          </div>
        </motion.button>

        {/* PORTFOLIO BUTTON - Same style as news page author icons */}
        <motion.button 
          onClick={() => handleViewProfile(athlete)}
          className="relative overflow-hidden backdrop-blur-xl rounded-full text-xs sm:text-sm transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
            border: '2px solid #FFD700',
            color: '#000000'
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)"
          }}
          whileTap={{ scale: 0.9 }}
          title="View Portfolio"
        >
          <User className="w-3 h-3 sm:w-4 sm:h-4" />
        </motion.button>

        {/* Gallery Button */}
        {athlete.gallery && athlete.gallery.length > 0 && (
          <motion.button 
            onClick={() => handleViewGallery(athlete)}
            className="relative overflow-hidden backdrop-blur-xl rounded-full text-xs sm:text-sm transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg bg-purple-500/20 text-purple-400 border-2 border-purple-400/50 hover:bg-purple-500/30 hover:border-purple-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.button>
        )}

        {/* Favorite Button */}
        <motion.button 
          onClick={() => toggleFavorite(athlete.id)}
          className={`relative overflow-hidden backdrop-blur-xl rounded-full text-xs sm:text-sm transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg ${
            favorites.has(athlete.id) 
              ? 'bg-red-500/30 text-red-400 border-2 border-red-400' 
              : 'bg-white/20 text-white border-2 border-white/30 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-400'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-3 h-3 sm:w-4 sm:h-4 ${favorites.has(athlete.id) ? 'fill-current' : ''}`} 
          />
        </motion.button>

        {/* Share Button */}
        <motion.button 
          onClick={() => handleShare(athlete)}
          className="relative overflow-hidden backdrop-blur-xl rounded-full text-xs sm:text-sm transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg bg-white/20 text-white border-2 border-white/30 hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
        </motion.button>

        {/* Enhanced Compare Button */}
        <motion.button 
          onClick={() => addToCompare(athlete.id)}
          disabled={compareList.includes(athlete.id) || compareList.length >= 3}
          className={`relative overflow-hidden backdrop-blur-xl rounded-full text-xs sm:text-sm transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg ${
            compareList.includes(athlete.id) 
              ? 'bg-green-500/30 text-green-400 border-2 border-green-400' 
              : buttonStates[`compare-${athlete.id}`] === 'success'
              ? 'bg-green-500/30 text-green-400 border-2 border-green-400'
              : 'bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 hover:border-white/50'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          whileHover={{ scale: compareList.includes(athlete.id) ? 1 : 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={buttonStates[`compare-${athlete.id}`] === 'success' ? {
              scale: [1, 1.2, 1],
              rotate: [0, 360, 0]
            } : {}}
            transition={{ duration: 0.6 }}
          >
            {compareList.includes(athlete.id) || buttonStates[`compare-${athlete.id}`] === 'success' ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-400"
              >
                ✓
              </motion.div>
            ) : (
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
            )}
          </motion.div>
        </motion.button>

        {/* Enhanced Contact Button */}
        <motion.button 
          onClick={() => handleContact(athlete.id)}
          className={`relative overflow-hidden backdrop-blur-xl rounded-full text-xs sm:text-sm transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg ${
            buttonStates[`contact-${athlete.id}`] === 'success'
              ? 'bg-blue-500/30 text-blue-400 border-2 border-blue-400'
              : 'bg-white/20 text-white border-2 border-white/30 hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-400'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={buttonStates[`contact-${athlete.id}`] === 'success' ? {
              scale: [1, 1.3, 1],
              rotate: [0, 15, -15, 0]
            } : {}}
            transition={{ duration: 0.8 }}
          >
            {buttonStates[`contact-${athlete.id}`] === 'success' ? (
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            ) : (
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
            )}
          </motion.div>
        </motion.button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="mt-2 text-center sm:hidden"
      >
        <span className="text-xs text-gray-400 font-body">Tap to interact</span>
      </motion.div>
    </motion.div>
  );

  const AthleteModal = ({ athlete, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-4xl w-full border border-white/20 relative max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <img
              src={athlete.image}
              alt={`${athlete.name} - ${athlete.position} at ${athlete.team}`}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl sm:rounded-2xl"
              loading="lazy"
            />
            
            {/* Enhanced Performance Metrics */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <PerformanceRing performance={athlete.performance} size="lg" />
                <p className="text-sm text-gray-400 mt-2">Performance</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-white mb-2">Contract</h4>
                <p className="text-xs text-gray-400">Expires: {athlete.contract.expires}</p>
                <p className="text-xs text-yellow-400">{athlete.contract.value}</p>
              </div>
            </div>
            
            {/* Gallery Preview */}
            {athlete.gallery && athlete.gallery.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white">Photo Gallery</h4>
                  <button
                    onClick={() => handleViewGallery(athlete)}
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    View All ({athlete.gallery.length})
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {athlete.gallery.slice(0, 3).map((image, index) => (
                    <div
                      key={image.id}
                      className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleViewGallery(athlete)}
                    >
                      <img
                        src={image.thumbnail || image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-2 text-white">{athlete.name}</h2>
            <p className="text-yellow-400 text-lg sm:text-xl mb-4 sm:mb-6 font-heading">{athlete.position} • {athlete.team}</p>
            
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="font-body text-white text-sm sm:text-base">{athlete.nationality}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="font-body text-white text-sm sm:text-base">{athlete.age} years old</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">{athlete.marketValue}</span>
                  <TrendIndicator currentValue={athlete.marketValue} previousValue={athlete.previousValue} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {Object.entries(athlete.stats).map(([key, value]) => (
                <div key={key} className="bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-white/10">
                  <p className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-white">{value}</p>
                  <p className="text-xs sm:text-sm text-gray-400 capitalize font-body">{key}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-3 text-white">Achievements</h3>
              <div className="space-y-2">
                {athlete.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-gray-300 font-body text-sm sm:text-base">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-carbon-black text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 font-body">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[9999] px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        <div className="bg-black/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 flex justify-between items-center border border-white/20 max-w-7xl mx-auto">
          <h1 
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-heading font-bold text-white cursor-pointer hover:text-yellow-400 transition-colors truncate"
            onClick={() => handleNavigation('home')}
          >
            ELITE SPORTS AGENCY
          </h1>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-2 lg:gap-4 xl:gap-6 items-center font-heading">
            <button 
              onClick={() => handleNavigation('home')}
              className="text-white hover:text-yellow-400 transition-colors font-medium px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('athletes')}
              className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base"
              style={{ color: '#FFD700' }}
            >
              Athletes
            </button>
            <button 
              onClick={() => handleNavigation('services')}
              className="text-white hover:text-yellow-400 transition-colors font-medium px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigation('news')}
              className="text-white hover:text-yellow-400 transition-colors font-medium px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base"
            >
              News
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="text-white hover:text-yellow-400 transition-colors font-medium px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base"
            >
              Contact
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="px-3 sm:px-4 lg:px-6 py-2 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full hover:scale-105 transition-transform text-black font-semibold text-sm lg:text-base min-h-[44px]"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white rounded-lg border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleNavigation}
        currentPage="athletes"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">Our Athletes</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 font-body">Representing the finest talent in world football</p>
        </motion.div>

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="text-sm font-semibold text-white">Compare Athletes ({compareList.length}/3):</span>
                <div className="flex gap-2 flex-wrap">
                  {compareList.map(id => {
                    const athlete = athletes.find(a => a.id === id);
                    return (
                      <motion.div 
                        key={id} 
                        className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <span className="text-xs text-white">{athlete?.name}</span>
                        <button
                          onClick={() => removeFromCompare(id)}
                          className="text-red-400 hover:text-red-300 min-h-[24px] min-w-[24px] flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => setCompareList([])}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm hover:bg-red-500/30 transition-colors min-h-[44px]"
              >
                Clear All
              </button>
            </div>
          </motion.div>
        )}

        {/* Advanced Filter System */}
        <AdvancedFilterSystem 
          athletes={athletes}
          onFilterChange={setFilteredAthletes}
          className="mb-8 sm:mb-10 md:mb-12"
        />

        {/* Athletes Grid */}
        <motion.div 
          ref={gridRef}
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AthleteCardSkeleton />
                </motion.div>
              ))
            ) : (
              filteredAthletes.map((athlete, index) => (
                <motion.div
                  key={athlete.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: isIntersecting ? index * 0.1 : 0 }}
                  onHoverStart={() => setHoveredCard(athlete.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group cursor-pointer rounded-2xl sm:rounded-3xl"
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${athlete.name}`}
                >
                  {/* ULTRA-RESPONSIVE ATHLETE CARD CONTAINER */}
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-yellow-400/50 transition-all h-full flex flex-col transform-gpu">
                    {/* Enhanced Badge System */}
                    <FeaturedBadge featured={athlete.featured} />
                    
                    {/* Rank Badge */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-yellow-400/20 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 border border-yellow-400/50 z-10">
                      <span className="text-xs sm:text-sm font-mono font-bold text-yellow-400">#{athlete.rank}</span>
                    </div>

                    {/* Nationality Badge */}
                    <div className="absolute top-3 sm:top-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 z-10">
                      <span className="text-xs sm:text-sm font-body text-white">{athlete.nationality}</span>
                    </div>

                    {/* Favorite Button */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(athlete.id);
                      }}
                      className={`absolute top-3 sm:top-4 right-12 sm:right-16 p-2 backdrop-blur-md rounded-full border z-10 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                        favorites.has(athlete.id)
                          ? 'bg-red-500/30 border-red-400 text-red-400'
                          : 'bg-black/50 border-white/20 text-white hover:text-red-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${favorites.has(athlete.id) ? 'fill-current' : ''}`} />
                    </motion.button>

                    {/* Image with Enhanced Parallax Effect - RESPONSIVE ASPECT RATIO */}
                    <div className="aspect-[3/4] overflow-hidden relative flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={athlete.image}
                          alt={`${athlete.name} - ${athlete.position} at ${athlete.team}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      
                      {/* Enhanced Quick Stats Overlay */}
                      <QuickStatsOverlay athlete={athlete} isVisible={hoveredCard === athlete.id} />
                      
                      {/* Enhanced Action Buttons */}
                      <ActionButtons athlete={athlete} isVisible={hoveredCard === athlete.id} />
                    </div>
                    
                    {/* Enhanced Content - RESPONSIVE PADDING AND TYPOGRAPHY */}
                    <div className="p-4 sm:p-6 flex-grow flex flex-col justify-end">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold mb-1 text-white line-clamp-2">{athlete.name}</h3>
                      <p className="text-gray-300 mb-2 text-xs sm:text-sm md:text-base font-body line-clamp-1">{athlete.position} • {athlete.team}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-yellow-400 font-mono font-semibold text-sm sm:text-base md:text-lg lg:text-xl">{athlete.marketValue}</p>
                        <TrendIndicator currentValue={athlete.marketValue} previousValue={athlete.previousValue} />
                      </div>
                      
                      {/* Performance Indicator */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">Performance</span>
                        <PerformanceRing performance={athlete.performance} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {!isLoading && filteredAthletes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-heading">No athletes found matching your criteria</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAthlete && !showGallery && (
          <AthleteModal
            athlete={selectedAthlete}
            onClose={() => setSelectedAthlete(null)}
          />
        )}
      </AnimatePresence>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {selectedAthlete && showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl"
          >
            <div className="absolute top-4 left-4 z-50">
              <button
                onClick={() => {
                  setShowGallery(false);
                  setSelectedAthlete(null);
                }}
                className="p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-colors border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-black/50 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
                <h2 className="text-white font-semibold">{selectedAthlete.name} - Photo Gallery</h2>
              </div>
            </div>

            <div className="pt-20 pb-4 px-4 h-full">
              <ImageGallery 
                images={selectedAthlete.gallery || []} 
                initialIndex={0}
                className="h-full flex items-center justify-center"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AthletesPortfolio;