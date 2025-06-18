import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Briefcase, TrendingUp, Users, Globe, Award, Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ServicesPage = ({ onNavigate }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { ref: servicesRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const services = [
    {
      id: 1,
      icon: Shield,
      title: 'Contract Negotiation',
      description: 'Expert negotiation ensuring maximum value and protection for our athletes',
      features: ['Salary optimization', 'Performance bonuses', 'Image rights', 'Exit clauses'],
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 2,
      icon: Briefcase,
      title: 'Career Management',
      description: 'Strategic planning for long-term success both on and off the field',
      features: ['Transfer strategy', 'Club selection', 'Career milestones', 'Retirement planning'],
      color: 'from-purple-500 to-yellow-500'
    },
    {
      id: 3,
      icon: TrendingUp,
      title: 'Brand Development',
      description: 'Building personal brands that transcend sports',
      features: ['Social media strategy', 'Sponsorship deals', 'Public relations', 'Content creation'],
      color: 'from-yellow-500 to-green-500'
    },
    {
      id: 4,
      icon: Users,
      title: 'Legal Services',
      description: 'Comprehensive legal support for all professional matters',
      features: ['Contract review', 'Dispute resolution', 'Regulatory compliance', 'IP protection'],
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 5,
      icon: Globe,
      title: 'International Network',
      description: 'Global connections opening doors to opportunities worldwide',
      features: ['Club relationships', 'Scout network', 'Media contacts', 'Brand partnerships'],
      color: 'from-yellow-500 to-purple-500'
    },
    {
      id: 6,
      icon: Award,
      title: 'Performance Analysis',
      description: 'Data-driven insights to maximize athletic potential',
      features: ['Match analysis', 'Training optimization', 'Injury prevention', 'Mental coaching'],
      color: 'from-blue-500 to-green-500'
    }
  ];

  const handleNavigation = (page) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <div className="min-h-screen bg-carbon-black text-white overflow-hidden font-body">
      {/* Enhanced Navigation with Better Visibility */}
      <nav className="fixed top-0 w-full z-[9999] px-4 md:px-8 py-6">
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl px-6 md:px-8 py-4 flex justify-between items-center border border-white/20">
          <h1 
            className="text-xl md:text-2xl font-heading font-bold text-white cursor-pointer hover:text-yellow-400 transition-colors"
            onClick={() => handleNavigation('home')}
          >
            ELITE SPORTS AGENCY
          </h1>
          
          {/* Enhanced Desktop Menu with Better Visibility */}
          <div className="hidden md:flex gap-8 items-center font-heading">
            <button 
              onClick={() => handleNavigation('home')}
              className="text-white hover:text-yellow-400 transition-colors font-medium px-3 py-2 rounded-lg"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('athletes')}
              className="text-white hover:text-yellow-400 transition-colors font-medium px-3 py-2 rounded-lg"
            >
              Athletes
            </button>
            <button 
              onClick={() => handleNavigation('services')}
              className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold px-3 py-2 rounded-lg"
              style={{ color: '#FFD700' }}
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigation('news')}
              className="text-white hover:text-yellow-400 transition-colors font-medium px-3 py-2 rounded-lg"
            >
              News
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="text-white hover:text-yellow-400 transition-colors font-medium px-3 py-2 rounded-lg"
            >
              Contact
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full hover:scale-105 transition-transform text-black font-semibold"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white rounded-lg border border-white/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleNavigation}
        currentPage="services"
      />

      <div className="py-24 px-4 md:px-8">
        {/* Enhanced Background Elements */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl transform-gpu animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transform-gpu animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl transform-gpu animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">Our Services</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-body">
              Comprehensive support system designed to elevate careers and maximize potential
            </p>
          </motion.div>

          {/* Services Grid */}
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(service.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group rounded-3xl"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
                tabIndex={0}
                role="article"
                aria-labelledby={`service-${service.id}-title`}
              >
                <motion.div
                  animate={{
                    rotateY: hoveredCard === service.id ? 10 : 0,
                    rotateX: hoveredCard === service.id ? -10 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative h-full bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all transform-gpu"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(0)'
                  }}
                >
                  {/* Enhanced Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-15 rounded-3xl transition-opacity`} />
                  
                  {/* Icon with enhanced gradient */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6 relative overflow-hidden`}>
                    <service.icon className="w-8 h-8 text-white relative z-10" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-50 animate-pulse`} />
                  </div>

                  {/* Content */}
                  <h3 id={`service-${service.id}-title`} className="text-2xl font-heading font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-400 mb-6 font-body">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-3" role="list">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: hoveredCard === service.id ? idx * 0.1 : 0 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                        <span className="text-sm text-gray-300 font-body">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Enhanced Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl animate-pulse`} />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 max-w-4xl mx-auto border border-white/10 relative overflow-hidden">
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 animate-pulse" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-white">Ready to Elevate Your Career?</h2>
                <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-body">
                  Join the elite athletes who trust us with their professional journey
                </p>
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full font-heading font-semibold text-black hover:scale-105 transition-all"
                >
                  Schedule a Consultation
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;