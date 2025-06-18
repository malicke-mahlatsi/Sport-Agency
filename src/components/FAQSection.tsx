import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  Plus, 
  HelpCircle, 
  Users, 
  Building, 
  Briefcase, 
  Mail,
  ThumbsUp,
  ThumbsDown,
  Filter,
  ChevronDown,
  Star,
  Clock,
  Zap,
  Award,
  Globe,
  Phone,
  Calendar,
  DollarSign,
  Shield,
  Target,
  TrendingUp
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FAQSection = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItem, setOpenItem] = useState(null);
  const [helpfulVotes, setHelpfulVotes] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { ref: faqRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  // Load votes from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem('faq_votes');
    if (savedVotes) {
      setHelpfulVotes(JSON.parse(savedVotes));
    }
  }, []);

  const faqData = [
    {
      id: 1,
      category: 'athletes',
      question: 'How do I join Elite Sports Agency?',
      answer: 'To join our agency, you can submit your profile through our contact form or be scouted by our talent identification team. We review all applications and look for talented athletes who show exceptional promise, strong character, and professional dedication. Our scouts actively identify emerging talent across various leagues worldwide, from youth academies to professional clubs.',
      keywords: ['join', 'apply', 'submit', 'profile', 'scout', 'talent'],
      popularity: 95,
      lastUpdated: '2024-01-15',
      helpful: 89,
      notHelpful: 3
    },
    {
      id: 2,
      category: 'athletes',
      question: 'What percentage does the agency take from transfers?',
      answer: 'Our commission structure is competitive and transparent, typically ranging from 5-10% depending on the deal size, complexity, and services provided. We believe in fair partnerships that benefit both the athlete and the agency. For youth players and first professional contracts, we often work with reduced rates to support emerging talent.',
      keywords: ['percentage', 'commission', 'fee', 'cost', 'transfer', 'money'],
      popularity: 92,
      lastUpdated: '2024-01-10',
      helpful: 156,
      notHelpful: 8
    },
    {
      id: 3,
      category: 'athletes',
      question: 'Do you represent youth players?',
      answer: 'Yes, we have a dedicated youth development program for promising players from age 16 onwards. We provide comprehensive guidance on education, training, career planning, and personal development while ensuring full compliance with FIFA regulations and local laws regarding youth representation.',
      keywords: ['youth', 'young', 'junior', 'academy', 'development', 'education'],
      popularity: 88,
      lastUpdated: '2024-01-12',
      helpful: 134,
      notHelpful: 5
    },
    {
      id: 4,
      category: 'clubs',
      question: 'How can clubs contact you about a player?',
      answer: 'Clubs can reach out through our dedicated club portal, contact our transfer department directly at transfers@elitesportsagency.com, or call our main office. We maintain strong relationships with clubs worldwide and facilitate smooth, professional negotiations while protecting our clients\' interests.',
      keywords: ['club', 'contact', 'transfer', 'negotiate', 'portal', 'email'],
      popularity: 85,
      lastUpdated: '2024-01-08',
      helpful: 98,
      notHelpful: 2
    },
    {
      id: 5,
      category: 'clubs',
      question: 'Do you provide player scouting reports?',
      answer: 'We provide comprehensive scouting reports for all our represented athletes, including detailed performance analytics, injury history, character assessments, tactical analysis, and market valuation. These reports help clubs make informed decisions and are updated regularly throughout the season.',
      keywords: ['scouting', 'report', 'analytics', 'performance', 'data', 'analysis'],
      popularity: 82,
      lastUpdated: '2024-01-14',
      helpful: 76,
      notHelpful: 4
    },
    {
      id: 6,
      category: 'services',
      question: 'What services do you offer beyond contract negotiation?',
      answer: 'Our comprehensive services include brand development, social media management, financial planning, legal support, performance analysis, mental health support, career transition planning, image rights management, sponsorship deals, and post-career planning. We provide 360-degree career management.',
      keywords: ['services', 'brand', 'financial', 'legal', 'support', 'management'],
      popularity: 90,
      lastUpdated: '2024-01-11',
      helpful: 187,
      notHelpful: 6
    },
    {
      id: 7,
      category: 'services',
      question: 'Do you help with image rights and sponsorships?',
      answer: 'Absolutely. We have a dedicated commercial department that handles image rights, sponsorship deals, brand partnerships, and endorsement opportunities. We work to maximize our athletes\' commercial potential while protecting their personal brand and ensuring all deals align with their values and career goals.',
      keywords: ['image rights', 'sponsorship', 'commercial', 'brand', 'endorsement', 'deals'],
      popularity: 87,
      lastUpdated: '2024-01-09',
      helpful: 143,
      notHelpful: 7
    },
    {
      id: 8,
      category: 'contact',
      question: 'What are your office hours?',
      answer: 'Our main office operates Monday-Friday 9:00-20:00, Saturday 10:00-16:00. However, we provide 24/7 emergency support for our clients through our dedicated hotline. Different time zones are covered by our international offices to ensure global support.',
      keywords: ['hours', 'open', 'time', 'schedule', 'emergency', 'support'],
      popularity: 75,
      lastUpdated: '2024-01-13',
      helpful: 67,
      notHelpful: 3
    },
    {
      id: 9,
      category: 'contact',
      question: 'Do you have offices in other countries?',
      answer: 'Yes, we have offices in Madrid (HQ), London, Milan, São Paulo, Buenos Aires, and Munich. We also have representatives in major football markets worldwide including Paris, Amsterdam, and Barcelona to provide local support and maintain strong regional relationships.',
      keywords: ['office', 'location', 'country', 'international', 'global', 'worldwide'],
      popularity: 78,
      lastUpdated: '2024-01-07',
      helpful: 89,
      notHelpful: 2
    },
    {
      id: 10,
      category: 'athletes',
      question: 'How long are your agency contracts?',
      answer: 'Our standard representation contracts are typically 2-3 years, but we offer flexibility based on individual circumstances and career stages. We believe in building long-term partnerships based on trust, mutual success, and shared goals rather than binding athletes unnecessarily.',
      keywords: ['contract', 'duration', 'length', 'term', 'agreement', 'partnership'],
      popularity: 83,
      lastUpdated: '2024-01-06',
      helpful: 112,
      notHelpful: 5
    },
    {
      id: 11,
      category: 'services',
      question: 'Do you provide mental health support?',
      answer: 'Yes, mental health is a priority. We have qualified sports psychologists on staff and partnerships with mental health professionals. We provide counseling, stress management, performance psychology, and 24/7 crisis support to ensure our athletes\' wellbeing both on and off the field.',
      keywords: ['mental health', 'psychology', 'counseling', 'wellbeing', 'support', 'stress'],
      popularity: 86,
      lastUpdated: '2024-01-05',
      helpful: 198,
      notHelpful: 4
    },
    {
      id: 12,
      category: 'athletes',
      question: 'Can you help with visa and work permits?',
      answer: 'Absolutely. We have a dedicated legal team that handles visa applications, work permits, and all immigration-related matters for international transfers. We work with immigration lawyers in multiple countries to ensure smooth transitions for our athletes.',
      keywords: ['visa', 'work permit', 'immigration', 'legal', 'international', 'transfer'],
      popularity: 81,
      lastUpdated: '2024-01-04',
      helpful: 94,
      notHelpful: 3
    },
    {
      id: 13,
      category: 'clubs',
      question: 'What is your transfer success rate?',
      answer: 'We maintain a 97% success rate for completed transfer negotiations. This high success rate comes from thorough preparation, understanding all parties\' needs, and our extensive network of club relationships built over years of professional service.',
      keywords: ['success rate', 'transfer', 'statistics', 'completion', 'negotiation'],
      popularity: 89,
      lastUpdated: '2024-01-03',
      helpful: 167,
      notHelpful: 5
    },
    {
      id: 14,
      category: 'services',
      question: 'Do you offer financial planning services?',
      answer: 'Yes, we provide comprehensive financial planning including investment advice, tax planning, pension setup, property investment guidance, and wealth management. Our financial advisors specialize in athlete finances and understand the unique challenges of sports careers.',
      keywords: ['financial planning', 'investment', 'tax', 'pension', 'wealth', 'money'],
      popularity: 84,
      lastUpdated: '2024-01-02',
      helpful: 145,
      notHelpful: 8
    },
    {
      id: 15,
      category: 'contact',
      question: 'How quickly do you respond to inquiries?',
      answer: 'We aim to respond to all inquiries within 24 hours during business days. Urgent matters are handled immediately, and our clients have access to priority support channels. Emergency situations receive immediate attention regardless of time or day.',
      keywords: ['response time', 'inquiry', 'urgent', 'emergency', 'support', 'contact'],
      popularity: 77,
      lastUpdated: '2024-01-01',
      helpful: 78,
      notHelpful: 2
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle, color: 'from-yellow-400 to-orange-500' },
    { id: 'athletes', label: 'For Athletes', icon: Users, color: 'from-blue-400 to-purple-500' },
    { id: 'clubs', label: 'For Clubs', icon: Building, color: 'from-green-400 to-blue-500' },
    { id: 'services', label: 'About Services', icon: Briefcase, color: 'from-purple-400 to-pink-500' },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'from-pink-400 to-red-500' }
  ];

  const sortOptions = [
    { id: 'popular', label: 'Most Popular', icon: Star },
    { id: 'recent', label: 'Recently Updated', icon: Clock },
    { id: 'helpful', label: 'Most Helpful', icon: ThumbsUp },
    { id: 'alphabetical', label: 'A-Z', icon: Filter }
  ];

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.length > 1) {
      const suggestions = [];
      
      // Question suggestions
      faqData.forEach(faq => {
        if (faq.question.toLowerCase().includes(searchTerm.toLowerCase())) {
          suggestions.push({
            type: 'question',
            text: faq.question,
            id: faq.id
          });
        }
      });
      
      // Keyword suggestions
      const keywords = [...new Set(faqData.flatMap(faq => faq.keywords))];
      keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(searchTerm.toLowerCase())) {
          suggestions.push({
            type: 'keyword',
            text: keyword,
            id: `keyword-${keyword}`
          });
        }
      });
      
      setSearchSuggestions(suggestions.slice(0, 5));
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Filter and sort FAQs
  const filteredFAQs = useMemo(() => {
    let filtered = faqData.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch = !searchTerm || 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });

    // Sort FAQs
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        break;
      case 'helpful':
        filtered.sort((a, b) => b.helpful - a.helpful);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.question.localeCompare(b.question));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, activeCategory, sortBy]);

  // Highlight search term in text
  const highlightText = (text, term) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-400/30 text-yellow-400 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleHelpfulVote = (faqId, isHelpful) => {
    const newVotes = {
      ...helpfulVotes,
      [faqId]: isHelpful
    };
    setHelpfulVotes(newVotes);
    localStorage.setItem('faq_votes', JSON.stringify(newVotes));
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'question') {
      setSearchTerm('');
      setOpenItem(suggestion.id);
      setShowSuggestions(false);
    } else {
      setSearchTerm(suggestion.text);
      setShowSuggestions(false);
    }
  };

  return (
    <section ref={faqRef} className="py-20 md:py-24 lg:py-32 relative overflow-hidden bg-carbon-black">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-yellow-500/8 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isIntersecting ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10"
          >
            <HelpCircle className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Support Center</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-body">
            Find answers to common questions about our services, processes, and how we can help you
          </p>
        </motion.div>

        {/* Enhanced Search Bar with Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="Search questions, keywords, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 focus:border-blue-400 focus:outline-none transition-all font-body text-white placeholder-gray-400 text-base"
              aria-label="Search FAQ"
            />
            {searchTerm && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          {/* Search Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden z-50"
              >
                {searchSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
                  >
                    {suggestion.type === 'question' ? (
                      <HelpCircle className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Search className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-white text-sm">{suggestion.text}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-heading font-semibold text-sm min-h-[44px] ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-black`
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
                <span className="ml-1 px-2 py-1 bg-black/20 rounded-full text-xs">
                  {category.id === 'all' ? faqData.length : faqData.filter(faq => faq.category === category.id).length}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Sort and Filter Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all border border-white/20 min-h-[44px]"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-semibold">Sort</span>
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>

            <div className="text-sm text-gray-400 font-body">
              <span className="text-white font-bold">{filteredFAQs.length}</span> questions found
            </div>
          </div>
        </motion.div>

        {/* Sort Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="flex flex-wrap gap-3 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                {sortOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSortBy(option.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-semibold min-h-[44px] ${
                      sortBy === option.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    <option.icon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: isIntersecting ? index * 0.05 : 0, duration: 0.4 }}
                >
                  <FAQItem
                    faq={faq}
                    isOpen={openItem === faq.id}
                    onToggle={() => setOpenItem(openItem === faq.id ? null : faq.id)}
                    highlightText={highlightText}
                    searchTerm={searchTerm}
                    helpfulVote={helpfulVotes[faq.id]}
                    onHelpfulVote={handleHelpfulVote}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-2 text-white">No questions found</h3>
                <p className="text-gray-400 mb-6 font-body">
                  Try adjusting your search terms or browse all categories
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full font-heading font-semibold text-black hover:shadow-lg transition-all"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center p-8 md:p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 relative overflow-hidden"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-pulse" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">Still have questions?</h3>
            </div>
            <p className="text-gray-400 mb-8 font-body text-lg max-w-2xl mx-auto">
              Our expert team is here to help. Get personalized assistance and detailed answers to your specific questions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate && onNavigate('contact')}
                className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full font-heading font-semibold text-black hover:shadow-lg hover:shadow-blue-400/25 transition-all text-lg"
              >
                Contact Support
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-xl rounded-full font-heading font-semibold text-white hover:bg-white/20 transition-all border border-white/20 text-lg flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call +34 91 123 4567
              </motion.button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 font-mono">24/7</div>
                <div className="text-sm text-gray-400">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 font-mono">&lt;1hr</div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 font-mono">98%</div>
                <div className="text-sm text-gray-400">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced FAQ Item Component
const FAQItem = ({ faq, isOpen, onToggle, highlightText, searchTerm, helpfulVote, onHelpfulVote }) => {
  const getCategoryColor = (category) => {
    const colors = {
      athletes: 'text-blue-400 bg-blue-400/20 border-blue-400/30',
      clubs: 'text-green-400 bg-green-400/20 border-green-400/30',
      services: 'text-purple-400 bg-purple-400/20 border-purple-400/30',
      contact: 'text-pink-400 bg-pink-400/20 border-pink-400/30'
    };
    return colors[category] || 'text-gray-400 bg-gray-400/20 border-gray-400/30';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all group">
      {/* FAQ Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex-1 pr-4">
          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getCategoryColor(faq.category)}`}>
              {faq.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>Updated {formatDate(faq.lastUpdated)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>{faq.popularity}% popular</span>
            </div>
          </div>
          
          <h3 className="text-lg md:text-xl font-heading font-semibold text-white group-hover:text-blue-400 transition-colors">
            {highlightText(faq.question, searchTerm)}
          </h3>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="shrink-0 p-2"
        >
          <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
        </motion.div>
      </button>
      
      {/* FAQ Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-gray-300 mb-6 font-body leading-relaxed text-base">
                  {highlightText(faq.answer, searchTerm)}
                </p>
                
                {/* Keywords */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Related Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {faq.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Helpful Voting */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400 font-semibold">Was this helpful?</span>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onHelpfulVote(faq.id, true)}
                        className={`p-2 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                          helpfulVote === true 
                            ? 'bg-green-500/30 text-green-400 border border-green-400/50' 
                            : 'bg-white/10 hover:bg-white/20 text-gray-400 hover:text-green-400 border border-white/20'
                        }`}
                        aria-label="Mark as helpful"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onHelpfulVote(faq.id, false)}
                        className={`p-2 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                          helpfulVote === false 
                            ? 'bg-red-500/30 text-red-400 border border-red-400/50' 
                            : 'bg-white/10 hover:bg-white/20 text-gray-400 hover:text-red-400 border border-white/20'
                        }`}
                        aria-label="Mark as not helpful"
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Helpful Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3 text-green-400" />
                      <span>{faq.helpful}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsDown className="w-3 h-3 text-red-400" />
                      <span>{faq.notHelpful}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQSection;