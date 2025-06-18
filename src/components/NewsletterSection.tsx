import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Check, 
  Loader2, 
  ChevronRight, 
  TrendingUp, 
  Award, 
  Handshake,
  X,
  Shield,
  Users,
  Bell,
  Star,
  Sparkles
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const NewsletterSection = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });

  // Load saved submissions from localStorage
  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem('newsletter_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Email validation with enhanced regex
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    
    // Validate
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    if (!gdprAccepted) {
      setEmailError('Please accept the privacy policy to continue');
      return;
    }
    
    // Check for duplicate
    if (submissions.includes(email.toLowerCase())) {
      setEmailError('This email is already subscribed to our newsletter');
      return;
    }
    
    // Simulate submission with realistic timing
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Save to localStorage
      const newSubmissions = [...submissions, email.toLowerCase()];
      setSubmissions(newSubmissions);
      localStorage.setItem('newsletter_submissions', JSON.stringify(newSubmissions));
      
      // Show success
      setIsSubmitting(false);
      setShowSuccess(true);
      setShowConfetti(true);
      
      // Reset form
      setEmail('');
      setGdprAccepted(false);
      
      // Hide success after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setShowConfetti(false);
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      setEmailError('Something went wrong. Please try again.');
    }
  };

  // Enhanced latest news data with more details and LINKED TO NEWS PAGE
  const latestNews = [
    {
      id: 1,
      title: "Record Transfer Window Breaks €500M",
      subtitle: "Elite Sports Agency leads industry with unprecedented deals",
      date: "2 days ago",
      icon: TrendingUp,
      color: "from-green-400 to-blue-500",
      category: "Transfers",
      articleId: 7 // Links to "Winter Transfer Window" article
    },
    {
      id: 2,
      title: "New Academy Opens in South America",
      subtitle: "Expanding our global talent development network",
      date: "1 week ago",
      icon: Award,
      color: "from-yellow-400 to-orange-500",
      category: "Academy",
      articleId: 4 // Links to "Global Expansion" article
    },
    {
      id: 3,
      title: "Strategic Partnership with UEFA",
      subtitle: "Enhancing player development opportunities",
      date: "2 weeks ago",
      icon: Handshake,
      color: "from-purple-400 to-pink-500",
      category: "Partnership",
      articleId: 9 // Links to "Women's Football" article
    }
  ];

  // ENHANCED: Handle news item click to navigate to news page
  const handleNewsClick = (newsItem) => {
    if (onNavigate) {
      // Navigate to news page
      onNavigate('news');
      
      // Optional: You could also scroll to specific article or highlight it
      // This would require additional state management in the NewsPage component
      setTimeout(() => {
        const articleElement = document.getElementById(`article-${newsItem.articleId}`);
        if (articleElement) {
          articleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  };

  // Enhanced Confetti Component
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: `linear-gradient(45deg, ${
              ['#FFD700', '#FF006E', '#9D00FF', '#00D4FF', '#10B981'][i % 5]
            }, ${['#FFA500', '#FF1493', '#8A2BE2', '#00BFFF', '#32CD32'][i % 5]})`,
            left: `${Math.random() * 100}%`,
            top: '-10px'
          }}
          initial={{
            y: -10,
            x: 0,
            rotate: 0,
            scale: 0
          }}
          animate={{
            y: window.innerHeight + 100,
            x: (Math.random() - 0.5) * 200,
            rotate: Math.random() * 720,
            scale: [0, 1, 0.8, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "easeOut",
            delay: Math.random() * 0.5
          }}
        />
      ))}
    </div>
  );

  // Privacy Policy Modal
  const PrivacyModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={() => setShowPrivacyModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full border border-white/20 relative max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setShowPrivacyModal(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-4">Privacy Policy</h3>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              At Elite Sports Agency, we respect your privacy and are committed to protecting your personal data. 
              This privacy notice explains how we collect, use, and protect your information when you subscribe to our newsletter.
            </p>
            <h4 className="text-lg font-semibold text-white">What We Collect</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Email address for newsletter delivery</li>
              <li>Subscription preferences and interaction data</li>
              <li>Technical data for service improvement</li>
            </ul>
            <h4 className="text-lg font-semibold text-white">How We Use Your Data</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Send you our newsletter and updates</li>
              <li>Improve our services and content</li>
              <li>Comply with legal obligations</li>
            </ul>
            <h4 className="text-lg font-semibold text-white">Your Rights</h4>
            <p>
              You can unsubscribe at any time, request data deletion, or contact us for any privacy concerns 
              at privacy@elitesportsagency.com
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section ref={ref} className="relative py-20 md:py-24 lg:py-32 overflow-hidden bg-carbon-black">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden">
              {/* Enhanced Gradient Border Animation */}
              <motion.div
                className="absolute inset-0 opacity-60 rounded-3xl"
                animate={{
                  background: [
                    'linear-gradient(0deg, rgba(255, 215, 0, 0.3), rgba(255, 0, 110, 0.3))',
                    'linear-gradient(120deg, rgba(255, 215, 0, 0.3), rgba(157, 0, 255, 0.3))',
                    'linear-gradient(240deg, rgba(157, 0, 255, 0.3), rgba(0, 212, 255, 0.3))',
                    'linear-gradient(360deg, rgba(0, 212, 255, 0.3), rgba(255, 215, 0, 0.3))'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  padding: '2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              {/* Enhanced Animated Icon */}
              <motion.div
                className="relative w-24 h-24 mx-auto mb-8"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{ rotateY: showSuccess ? 180 : 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front side - Enhanced Envelope */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl" 
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Mail className="w-12 h-12 text-black" />
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-2xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  
                  {/* Back side - Enhanced Check */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl" 
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <Check className="w-12 h-12 text-white" />
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-2xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center mb-8"
              >
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-white">
                  Stay in the Loop
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed font-body">
                  Get exclusive updates on transfers, athlete news, and industry insights delivered to your inbox
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Enhanced Email Input */}
                <div className="relative">
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    placeholder="Enter your email address"
                    className={`w-full px-6 py-4 bg-white/5 border rounded-2xl focus:outline-none transition-all font-body text-white placeholder-gray-400 text-base ${
                      emailError 
                        ? 'border-red-500 focus:border-red-400 bg-red-500/10' 
                        : 'border-white/20 focus:border-yellow-400 focus:bg-white/10'
                    }`}
                    whileFocus={{ scale: 1.02 }}
                    aria-describedby={emailError ? "email-error" : undefined}
                  />
                  
                  {/* Email Validation Icon */}
                  <AnimatePresence>
                    {email && !emailError && validateEmail(email) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Enhanced Error Message */}
                <AnimatePresence>
                  {emailError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl"
                      id="email-error"
                      role="alert"
                    >
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-sm font-body">{emailError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced GDPR Checkbox */}
                <motion.label 
                  className="flex items-start gap-3 cursor-pointer group"
                  whileHover={{ x: 2 }}
                >
                  <div className="relative mt-1">
                    <input
                      type="checkbox"
                      checked={gdprAccepted}
                      onChange={(e) => setGdprAccepted(e.target.checked)}
                      className="sr-only"
                    />
                    <motion.div
                      animate={{
                        backgroundColor: gdprAccepted ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
                        borderColor: gdprAccepted ? '#FFD700' : 'rgba(255, 255, 255, 0.2)'
                      }}
                      className="w-5 h-5 rounded border-2 flex items-center justify-center"
                    >
                      <AnimatePresence>
                        {gdprAccepted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="w-3 h-3 text-black" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  <span className="text-sm text-gray-400 font-body leading-relaxed">
                    I agree to receive marketing emails and accept the{' '}
                    <button 
                      type="button" 
                      onClick={() => setShowPrivacyModal(true)}
                      className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
                    >
                      privacy policy
                    </button>
                  </span>
                </motion.label>

                {/* Enhanced Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !email || !gdprAccepted}
                  className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl font-heading font-bold text-black relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all min-h-[56px]"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Subscribing...</span>
                      </motion.div>
                    ) : showSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <Check className="w-5 h-5" />
                        <span>Successfully Subscribed!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <Bell className="w-5 h-5" />
                        <span>Subscribe Now</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              {/* Enhanced Subscriber Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isIntersecting ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="mt-8 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400 font-body">
                  <Users className="w-4 h-4 text-yellow-400" />
                  <span>
                    Join <span className="text-yellow-400 font-bold">{((submissions.length + 1247) * 1.27).toLocaleString()}</span> industry professionals
                  </span>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-400">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-gray-400">No Spam</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Enhanced Latest News Preview with NAVIGATION LINKS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-400">Latest Updates</span>
              </motion.div>
              
              <h4 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                What You'll Get
              </h4>
              <p className="text-gray-400 text-lg font-body leading-relaxed">
                Stay ahead with exclusive insights and breaking news from the sports industry
              </p>
            </div>
            
            <div className="space-y-4">
              {latestNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  onClick={() => handleNewsClick(news)}
                  className="group flex items-center gap-4 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-yellow-400/50 transition-all cursor-pointer"
                >
                  <div className={`p-4 bg-gradient-to-br ${news.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                    <news.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-1 bg-white/10 rounded-full text-xs font-semibold text-gray-400">
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                    <h5 className="font-heading font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                      {news.title}
                    </h5>
                    <p className="text-sm text-gray-400 font-body">{news.subtitle}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors flex-shrink-0" />
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              onClick={() => onNavigate && onNavigate('news')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-white/10 backdrop-blur-xl rounded-2xl hover:bg-white/20 transition-all font-heading font-semibold text-white border border-white/20 hover:border-yellow-400/50 min-h-[56px]"
            >
              View All News →
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Confetti Effect */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyModal && <PrivacyModal />}
      </AnimatePresence>
    </section>
  );
};

export default NewsletterSection;