import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Briefcase, 
  MessageSquare, 
  MapPin, 
  Phone, 
  Clock, 
  Send,
  Menu,
  X,
  Loader2,
  Check,
  Mic,
  MicOff,
  Sparkles,
  Zap
} from 'lucide-react';
import MobileMenu from './MobileMenu';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ContactPage = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errors, setErrors] = useState({});
  const [formStage, setFormStage] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const { ref: formRef, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });

  // Voice recognition setup
  const recognition = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (currentField) {
          setFormData(prev => ({
            ...prev,
            [currentField]: transcript
          }));
        }
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [currentField]);

  const roles = [
    { value: '', label: 'Select your role' },
    { value: 'player', label: 'Professional Player' },
    { value: 'coach', label: 'Coach/Manager' },
    { value: 'club', label: 'Club Representative' },
    { value: 'media', label: 'Media/Press' },
    { value: 'other', label: 'Other' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Madrid Office',
      details: [
        'Paseo de la Castellana, 95',
        '28046 Madrid, Spain',
        'European Headquarters'
      ],
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: [
        '+34 91 123 4567 (Main)',
        '+34 91 123 4568 (Emergency)',
        'Available 24/7 for clients'
      ],
      color: 'from-green-500 to-yellow-500'
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [
        'info@elitesportsagency.com',
        'transfers@elitesportsagency.com',
        'media@elitesportsagency.com'
      ],
      color: 'from-purple-500 to-yellow-500'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: [
        'Monday - Friday: 9:00 - 20:00',
        'Saturday: 10:00 - 16:00',
        'Sunday: Emergency only'
      ],
      color: 'from-yellow-500 to-blue-500'
    }
  ];

  const handleNavigation = (page) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  // COMPLETELY FIXED INPUT HANDLER - Works for all input types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const startVoiceInput = (fieldName) => {
    if (recognition.current && !isListening) {
      setCurrentField(fieldName);
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopVoiceInput = () => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setShowConfetti(true);
    setFormData({ name: '', email: '', role: '', message: '' });
    setFormStage(0);
    
    // Hide success message and confetti after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setShowConfetti(false);
    }, 5000);
  };

  const nextStage = () => {
    if (formStage < 2) {
      setFormStage(formStage + 1);
    }
  };

  const prevStage = () => {
    if (formStage > 0) {
      setFormStage(formStage - 1);
    }
  };

  // Enhanced Confetti Component
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: window.innerHeight + 10,
            rotate: 360,
            x: Math.random() * window.innerWidth
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "easeOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );

  // COMPLETELY FIXED INPUT COMPONENT - Works perfectly for all input types
  const FormInput = ({ 
    type, 
    name, 
    value, 
    onChange, 
    placeholder, 
    icon: Icon, 
    error, 
    label,
    voiceEnabled = true,
    rows = null,
    options = null
  }) => {
    // Handle select dropdown
    if (options) {
      return (
        <div className="relative">
          <div className="relative">
            <Icon className="absolute left-4 top-4 text-gray-400 w-5 h-5 z-10" />
            <select
              name={name}
              value={value}
              onChange={onChange}
              onFocus={() => setFocusedField(name)}
              onBlur={() => setFocusedField('')}
              className={`w-full pl-12 pr-4 py-4 bg-black/50 border rounded-2xl focus:outline-none backdrop-blur-xl font-body text-white text-base appearance-none ${
                error 
                  ? 'border-red-500 focus:border-red-400' 
                  : 'border-white/20 focus:border-yellow-400'
              }`}
              aria-describedby={error ? `${name}-error` : undefined}
            >
              {options.map(option => (
                <option key={option.value} value={option.value} className="bg-black text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Floating label */}
          {(value || focusedField === name) && (
            <label className="absolute left-4 -top-2 text-sm text-yellow-400 bg-black px-2 rounded">
              {label}
            </label>
          )}
          
          {error && <p className="text-red-400 text-sm mt-2 font-body" role="alert" id={`${name}-error`}>{error}</p>}
        </div>
      );
    }

    // Handle textarea or input
    const InputComponent = rows ? 'textarea' : 'input';
    
    return (
      <div className="relative">
        <div className="relative">
          <Icon className="absolute left-4 top-4 text-gray-400 w-5 h-5 z-10" />
          <InputComponent
            type={rows ? undefined : type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField('')}
            rows={rows}
            className={`w-full pl-12 pr-16 py-4 bg-black/50 border rounded-2xl focus:outline-none backdrop-blur-xl font-body text-white placeholder-gray-400 text-base resize-none ${
              error 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-white/20 focus:border-yellow-400'
            }`}
            placeholder={placeholder}
            aria-describedby={error ? `${name}-error` : undefined}
          />
          
          {voiceEnabled && recognition.current && (
            <button
              type="button"
              onClick={() => {
                isListening && currentField === name ? stopVoiceInput() : startVoiceInput(name);
              }}
              className={`absolute right-4 top-4 p-2 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isListening && currentField === name
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white'
              }`}
            >
              {isListening && currentField === name ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        
        {/* Floating label */}
        {(value || focusedField === name) && (
          <label className="absolute left-4 -top-2 text-sm text-yellow-400 bg-black px-2 rounded">
            {label}
          </label>
        )}
        
        {error && <p className="text-red-400 text-sm mt-2 font-body" role="alert" id={`${name}-error`}>{error}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-carbon-black text-white overflow-hidden font-body">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[9999] px-4 md:px-8 py-6">
        <div className="bg-black/90 backdrop-blur-xl rounded-2xl px-8 py-4 flex justify-between items-center border border-white/20 max-w-7xl mx-auto">
          <h1 
            className="text-2xl font-heading font-bold text-white cursor-pointer hover:text-yellow-400 transition-colors"
            onClick={() => handleNavigation('home')}
          >
            ELITE SPORTS AGENCY
          </h1>
          
          {/* Desktop Menu */}
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
              className="text-white hover:text-yellow-400 transition-colors font-medium px-3 py-2 rounded-lg"
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
              className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold px-3 py-2 rounded-lg"
              style={{ color: '#FFD700' }}
            >
              Contact
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full hover:scale-105 transition-transform text-black font-semibold min-h-[44px]"
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
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleNavigation}
        currentPage="contact"
      />

      <div className="py-24 px-4 md:px-8">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-heading font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">Get In Touch</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-body">
              Ready to take your career to the next level? Let's discuss how we can help you achieve your goals.
            </p>
          </div>

          {/* Success Message with Confetti */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="mb-8 max-w-4xl mx-auto"
              >
                <div className="bg-white/10 backdrop-blur-xl border border-green-500/30 rounded-3xl p-8 text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-heading font-bold text-green-400 mb-3">Message Sent Successfully!</h3>
                    <p className="text-gray-300 font-body text-lg">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confetti Animation */}
          {showConfetti && <Confetti />}

          {/* Main Content Grid */}
          <div ref={formRef} className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="relative">
              {/* Multi-Stage Form */}
              <form
                className="relative z-10 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20"
                onSubmit={handleSubmit}
              >
                {/* Progress Indicator */}
                <div className="flex justify-between mb-8">
                  {[0, 1, 2].map((stage) => (
                    <div key={stage} className="flex-1 mx-2">
                      <div className="relative">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                            style={{ width: formStage >= stage ? '100%' : '0%' }}
                          />
                        </div>
                        <div
                          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                            formStage >= stage 
                              ? 'bg-blue-500 border-blue-500' 
                              : 'bg-white/20 border-white/20'
                          }`}
                        >
                          {formStage > stage ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-sm font-mono text-white">{stage + 1}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Form Stages */}
                {formStage === 0 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Let's start with the basics</h3>
                      <p className="text-base text-gray-400">Tell us who you are</p>
                    </div>
                    
                    <FormInput
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      icon={User}
                      error={errors.name}
                      label="Full Name"
                    />
                    
                    <FormInput
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      icon={Mail}
                      error={errors.email}
                      label="Email Address"
                    />
                    
                    <button
                      type="button"
                      onClick={nextStage}
                      disabled={!formData.name || !formData.email}
                      className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] text-base"
                    >
                      Continue <Zap className="w-4 h-4 inline ml-2" />
                    </button>
                  </div>
                )}

                {formStage === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Briefcase className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">What's your role?</h3>
                      <p className="text-base text-gray-400">Help us understand your background</p>
                    </div>
                    
                    <FormInput
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      icon={Briefcase}
                      error={errors.role}
                      label="Your Role"
                      options={roles}
                      voiceEnabled={false}
                    />
                    
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={prevStage}
                        className="flex-1 py-4 border border-white/20 rounded-2xl text-white font-bold hover:bg-white/10 min-h-[44px] text-base"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStage}
                        disabled={!formData.role}
                        className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] text-base"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {formStage === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Tell us your story</h3>
                      <p className="text-base text-gray-400">Share your goals and how we can help</p>
                    </div>
                    
                    <FormInput
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your goals and how we can help..."
                      icon={MessageSquare}
                      error={errors.message}
                      label="Your Message"
                      rows={6}
                    />
                    
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={prevStage}
                        className="flex-1 py-4 border border-white/20 rounded-2xl text-white font-bold hover:bg-white/10 min-h-[44px] text-base"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.message}
                        className="flex-1 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 inline mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="glass-effect rounded-3xl p-8 hover:border-white/20 border border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${info.color} flex-shrink-0 relative overflow-hidden`}>
                      <info.icon className="w-6 h-6 text-white relative z-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-semibold mb-3 text-white">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-400 font-body text-base">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Voice Input Info */}
              {recognition.current && (
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Mic className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-heading font-semibold text-purple-400">Voice Input Available</h3>
                  </div>
                  <p className="text-gray-300 text-base font-body">
                    Click the microphone icon next to any input field to use voice input. 
                    Speak clearly and we'll transcribe your message automatically.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;