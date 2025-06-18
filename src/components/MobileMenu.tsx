import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Home, 
  Users, 
  Briefcase, 
  Newspaper, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Star,
  Zap
} from 'lucide-react';

const MobileMenu = ({ isOpen, onClose, onNavigate, currentPage }) => {
  const menuItems = [
    { icon: Home, label: 'Home', page: 'home', color: 'from-yellow-400 to-orange-500' },
    { icon: Users, label: 'Athletes', page: 'athletes', color: 'from-blue-400 to-purple-500' },
    { icon: Briefcase, label: 'Services', page: 'services', color: 'from-purple-400 to-pink-500' },
    { icon: Newspaper, label: 'News', page: 'news', color: 'from-green-400 to-blue-500' },
    { icon: Mail, label: 'Contact', page: 'contact', color: 'from-pink-400 to-red-500' }
  ];

  const handleNavigation = (page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-carbon-black/90 backdrop-blur-md z-40 md:hidden"
          />

          {/* Enhanced Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-carbon-black/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden font-body"
          >
            <div className="flex flex-col h-full">
              {/* Enhanced Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-yellow-400/10 to-purple-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-black" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-heading font-bold text-white">
                    Menu
                  </h2>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/20"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.button>
              </div>

              {/* Enhanced Navigation Items */}
              <div className="flex-1 px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto">
                <nav className="space-y-3">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.page}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      onClick={() => handleNavigation(item.page)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all font-heading min-h-[44px] text-sm sm:text-base relative overflow-hidden group ${
                        currentPage === item.page
                          ? 'bg-gradient-to-r from-yellow-400 to-purple-500 text-black font-bold shadow-lg'
                          : 'hover:bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Background Animation for Active Item */}
                      {currentPage === item.page && (
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      
                      {/* Icon with Enhanced Styling */}
                      <div className={`relative z-10 p-2 rounded-lg ${
                        currentPage === item.page 
                          ? 'bg-black/20' 
                          : `bg-gradient-to-r ${item.color} opacity-80 group-hover:opacity-100`
                      } transition-all`}>
                        <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          currentPage === item.page ? 'text-black' : 'text-white'
                        }`} />
                      </div>
                      
                      <span className="font-medium relative z-10">{item.label}</span>
                      
                      {/* Active Indicator */}
                      {currentPage === item.page && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 bg-black rounded-full relative z-10"
                        />
                      )}
                    </motion.button>
                  ))}
                </nav>

                {/* Enhanced Quick Actions */}
                <div className="mt-8 space-y-3">
                  <h3 className="text-xs sm:text-sm font-heading font-semibold text-gray-400 uppercase tracking-wider px-2">
                    Quick Actions
                  </h3>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => handleNavigation('athletes')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 hover:border-blue-500/50 transition-all min-h-[44px]"
                  >
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-medium text-sm">View Athletes</span>
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    onClick={() => handleNavigation('contact')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 hover:border-green-500/50 transition-all min-h-[44px]"
                  >
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium text-sm">Get Started</span>
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Contact Info */}
              <div className="p-4 sm:p-6 border-t border-white/10 bg-gradient-to-r from-white/5 to-white/10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Phone className="w-3 h-3 text-black" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-heading font-semibold text-white uppercase tracking-wider">
                      Quick Contact
                    </h3>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <motion.div 
                      className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 font-body hover:text-white transition-colors cursor-pointer"
                      whileHover={{ x: 2 }}
                    >
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      <span>+34 91 123 4567</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 font-body hover:text-white transition-colors cursor-pointer"
                      whileHover={{ x: 2 }}
                    >
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      <span>info@elitesportsagency.com</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 font-body hover:text-white transition-colors cursor-pointer"
                      whileHover={{ x: 2 }}
                    >
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                      <span>Madrid, Spain</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 font-body"
                      whileHover={{ x: 2 }}
                    >
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                      <span>24/7 Available</span>
                    </motion.div>
                  </div>

                  <motion.button
                    onClick={() => handleNavigation('contact')}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full font-heading font-semibold text-black hover:shadow-lg hover:shadow-yellow-400/25 transition-all min-h-[44px] text-sm sm:text-base relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <span className="relative z-10">Get In Touch</span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;