import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Star, 
  Trophy, 
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Heart,
  Award,
  Calendar,
  MapPin,
  User
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const { ref: sliderRef, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });
  
  const testimonials = [
    {
      id: 1,
      name: "Carlos Rodriguez",
      position: "Forward",
      team: "Real Madrid",
      nationality: "Spain",
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600",
      quote: "Elite Sports Agency transformed my career completely. Their negotiation skills secured me a dream move to Real Madrid with terms I never imagined possible. The personal attention and strategic planning made all the difference.",
      achievement: "€85M Transfer to Real Madrid",
      rating: 5,
      videoUrl: null,
      joinedDate: "2019",
      location: "Madrid, Spain",
      careerHighlights: ["La Liga Champion 2023", "Golden Boot Winner", "Champions League Top Scorer"],
      socialMedia: { followers: "2.5M", engagement: "8.2%" }
    },
    {
      id: 2,
      name: "João Silva", 
      position: "Midfielder",
      team: "Barcelona",
      nationality: "Portugal",
      image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600",
      quote: "The personal attention and strategic career planning helped me develop from academy player to Champions League winner in just 3 years. They don't just manage careers, they build legacies.",
      achievement: "Champions League Winner 2023",
      rating: 5,
      videoUrl: "testimonial-joao.mp4",
      joinedDate: "2020",
      location: "Barcelona, Spain",
      careerHighlights: ["Champions League Winner", "Best Young Player 2023", "Portuguese International"],
      socialMedia: { followers: "1.8M", engagement: "6.7%" }
    },
    {
      id: 3,
      name: "Marcus Johnson",
      position: "Defender", 
      team: "Manchester United",
      nationality: "England",
      image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600",
      quote: "Elite Sports Agency's global network opened doors I didn't even know existed. From contract negotiations to brand partnerships, they've elevated every aspect of my professional life.",
      achievement: "Premier League Champion 2023",
      rating: 5,
      videoUrl: null,
      joinedDate: "2018",
      location: "Manchester, England",
      careerHighlights: ["Premier League Champion", "England Player of the Year", "UEFA Team of the Year"],
      socialMedia: { followers: "1.2M", engagement: "5.4%" }
    },
    {
      id: 4,
      name: "Alessandro Rossi",
      position: "Goalkeeper",
      team: "AC Milan", 
      nationality: "Italy",
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600",
      quote: "The comprehensive support system at Elite Sports Agency is unmatched. From mental health resources to financial planning, they care about the person behind the player.",
      achievement: "Serie A Golden Glove 2023",
      rating: 5,
      videoUrl: "testimonial-alessandro.mp4",
      joinedDate: "2021",
      location: "Milan, Italy",
      careerHighlights: ["Serie A Golden Glove", "UEFA Goalkeeper of the Year", "Italian International"],
      socialMedia: { followers: "950K", engagement: "4.8%" }
    },
    {
      id: 5,
      name: "Maria Gonzalez",
      position: "Forward",
      team: "Barcelona Femení",
      nationality: "Spain",
      image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600",
      quote: "As one of the first female players they represented, Elite Sports Agency has been instrumental in advancing women's football. They secured groundbreaking contracts that set new standards for the sport.",
      achievement: "First €500K+ Female Contract",
      rating: 5,
      videoUrl: null,
      joinedDate: "2022",
      location: "Barcelona, Spain",
      careerHighlights: ["Women's Champions League Winner", "Ballon d'Or Nominee", "Spanish International Captain"],
      socialMedia: { followers: "1.1M", engagement: "9.1%" }
    },
    {
      id: 6,
      name: "Diego Martinez",
      position: "Winger",
      team: "Manchester City",
      nationality: "Argentina",
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600",
      quote: "The record-breaking transfer to Manchester City was just the beginning. Elite Sports Agency's vision for my career extends far beyond football, building a global brand that will last a lifetime.",
      achievement: "€120M Record Transfer",
      rating: 5,
      videoUrl: "testimonial-diego.mp4",
      joinedDate: "2019",
      location: "Manchester, England",
      careerHighlights: ["Record Transfer Fee", "Premier League Top Scorer", "Argentine International"],
      socialMedia: { followers: "3.2M", engagement: "7.8%" }
    }
  ];

  // OPTIMIZED Auto-play with performance considerations
  useEffect(() => {
    if (isPaused || !isIntersecting) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Reduced from 6s to 5s for better flow
    
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length, isIntersecting]);

  // OPTIMIZED touch gesture handling
  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  }, [touchStart, touchEnd]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const toggleFavorite = (testimonialId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(testimonialId)) {
        newFavorites.delete(testimonialId);
      } else {
        newFavorites.add(testimonialId);
      }
      return newFavorites;
    });
  };

  const handleShare = async (testimonial) => {
    const shareData = {
      title: `${testimonial.name} - ${testimonial.team}`,
      text: `"${testimonial.quote.substring(0, 100)}..." - ${testimonial.name}`,
      url: window.location.href + '#testimonial-' + testimonial.id
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

  return (
    <section 
      ref={sliderRef}
      className="py-20 md:py-24 lg:py-32 relative overflow-hidden bg-carbon-black"
    >
      {/* OPTIMIZED Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* OPTIMIZED Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200, duration: 0.3 }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10"
          >
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Client Success Stories</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
              Champions Speak
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-body">
            Hear directly from the world-class athletes who trust us with their careers
          </p>
        </motion.div>

        {/* COMPLETELY OPTIMIZED Testimonials Container */}
        <div className="relative max-w-6xl mx-auto">
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* OPTIMIZED Main Testimonial Display */}
            <div className="relative min-h-[500px] mb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.98 }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0"
                >
                  <TestimonialCard 
                    testimonial={testimonials[currentIndex]} 
                    isVideoPlaying={isVideoPlaying}
                    setIsVideoPlaying={setIsVideoPlaying}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.has(testimonials[currentIndex].id)}
                    onShare={handleShare}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* OPTIMIZED Navigation Arrows */}
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute left-4 md:-left-20 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all border border-white/20 hover:border-yellow-400/50 group min-h-[56px] min-w-[56px] flex items-center justify-center z-30 gpu-accelerated"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute right-4 md:-right-20 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all border border-white/20 hover:border-yellow-400/50 group min-h-[56px] min-w-[56px] flex items-center justify-center z-30 gpu-accelerated"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
            </motion.button>

            {/* OPTIMIZED Play/Pause Control */}
            <motion.button
              onClick={() => setIsPaused(!isPaused)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute bottom-4 right-4 p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all border border-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center z-30 gpu-accelerated"
              aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
            >
              {isPaused ? (
                <Play className="w-5 h-5 text-white" />
              ) : (
                <Pause className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>

          {/* COMPLETELY FIXED Progress Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative h-3 bg-white/20 rounded-full overflow-hidden transition-all hover:bg-white/30 min-h-[44px] min-w-[44px] flex items-center justify-center group gpu-accelerated"
                style={{ width: index === currentIndex ? '48px' : '24px' }}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {index === currentIndex && (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full"
                  />
                )}
                
                {/* Hover tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl rounded-lg px-3 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-40">
                  {testimonials[index].name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Testimonial Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-gray-400 text-lg font-body">
            <span className="text-yellow-400 font-bold">{currentIndex + 1}</span> of <span className="text-yellow-400 font-bold">{testimonials.length}</span> success stories
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// COMPLETELY OPTIMIZED Testimonial Card Component
const TestimonialCard = ({ 
  testimonial, 
  isVideoPlaying, 
  setIsVideoPlaying, 
  isMuted, 
  setIsMuted,
  onToggleFavorite,
  isFavorite,
  onShare
}) => (
  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 lg:p-12 border border-white/10 max-w-6xl mx-auto relative overflow-hidden gpu-accelerated">
    {/* OPTIMIZED Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/3 via-purple-500/3 to-blue-500/3" />
    
    <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
      {/* OPTIMIZED Athlete Image Section */}
      <motion.div
        initial={{ scale: 0, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, duration: 0.4 }}
        className="relative flex-shrink-0"
      >
        <div className="relative">
          {/* OPTIMIZED Main Image */}
          <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 p-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500">
            <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
              <img
                src={testimonial.image}
                alt={`${testimonial.name} - ${testimonial.position} at ${testimonial.team}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* OPTIMIZED Video Play Button */}
              {testimonial.videoUrl && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center group backdrop-blur-sm"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors border border-white/30">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
                  </div>
                </motion.button>
              )}
            </div>
          </div>
          
          {/* OPTIMIZED Achievement Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", duration: 0.3 }}
            className="absolute -bottom-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 border-4 border-black shadow-2xl"
          >
            <Trophy className="w-6 h-6 text-black" />
          </motion.div>
          
          {/* OPTIMIZED Nationality Flag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30"
          >
            <span className="text-xs font-bold text-white">{testimonial.nationality.substring(0, 2).toUpperCase()}</span>
          </motion.div>
        </div>
        
        {/* OPTIMIZED Social Media Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="mt-6 grid grid-cols-2 gap-3 text-center"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/10">
            <div className="text-lg font-bold text-yellow-400 font-mono">{testimonial.socialMedia.followers}</div>
            <div className="text-xs text-gray-400">Followers</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/10">
            <div className="text-lg font-bold text-blue-400 font-mono">{testimonial.socialMedia.engagement}</div>
            <div className="text-xs text-gray-400">Engagement</div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* OPTIMIZED Content Section */}
      <div className="flex-1 text-center lg:text-left">
        {/* Quote Section */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full flex items-center justify-center"
          >
            <Quote className="w-6 h-6 text-black" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-300 italic relative z-10 leading-relaxed font-body"
          >
            {testimonial.quote}
          </motion.p>
        </div>

        {/* Achievement Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-purple-500/20 rounded-full mb-6 border border-yellow-400/30"
        >
          <Award className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-semibold text-yellow-400">
            {testimonial.achievement}
          </span>
        </motion.div>

        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="mb-6"
        >
          <h4 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">{testimonial.name}</h4>
          <p className="text-yellow-400 text-lg md:text-xl font-semibold mb-2">
            {testimonial.position} • {testimonial.team}
          </p>
          
          {/* Additional Info */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Client since {testimonial.joinedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{testimonial.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Career Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="mb-6"
        >
          <h5 className="text-lg font-semibold text-white mb-3">Career Highlights</h5>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {testimonial.careerHighlights.map((highlight, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm border border-white/20"
              >
                {highlight}
              </span>
            ))}
          </div>
        </motion.div>

        {/* OPTIMIZED Star Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="flex gap-2 mb-6 justify-center lg:justify-start"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotate: -90, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.05, type: "spring", stiffness: 200, duration: 0.3 }}
            >
              <Star className={`w-6 h-6 ${
                i < testimonial.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-white/20'
              }`} />
            </motion.div>
          ))}
        </motion.div>

        {/* OPTIMIZED Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="flex gap-3 justify-center lg:justify-start flex-wrap"
        >
          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            onClick={() => onToggleFavorite(testimonial.id)}
            className={`p-3 rounded-full backdrop-blur-xl border transition-all min-h-[44px] min-w-[44px] flex items-center justify-center gpu-accelerated ${
              isFavorite
                ? 'bg-red-500/30 border-red-400 text-red-400'
                : 'bg-white/10 border-white/20 text-white hover:border-red-400/50 hover:text-red-400'
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            onClick={() => onShare(testimonial)}
            className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:border-blue-400/50 hover:text-blue-400 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center gpu-accelerated"
            aria-label="Share testimonial"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>

          {/* Video Controls */}
          {testimonial.videoUrl && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:border-purple-400/50 hover:text-purple-400 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center gpu-accelerated"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  </div>
);

export default TestimonialsSlider;