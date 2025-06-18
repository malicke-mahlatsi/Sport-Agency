import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Briefcase, 
  Newspaper, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const Footer = ({ onNavigate }) => {
  const quickLinks = [
    { icon: Home, label: 'Home', page: 'home' },
    { icon: Users, label: 'Athletes', page: 'athletes' },
    { icon: Briefcase, label: 'Services', page: 'services' },
    { icon: Newspaper, label: 'News', page: 'news' },
    { icon: Mail, label: 'Contact', page: 'contact' }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' }
  ];

  return (
    <footer className="bg-carbon-black/50 backdrop-blur-xl border-t border-white/10 mt-20 font-body">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-heading font-bold holographic-text mb-4"
            >
              ELITE SPORTS AGENCY
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mb-6 max-w-md font-body"
            >
              Where Champions Begin Their Legacy. Elite athlete representation with a personal touch, 
              building dynasties in professional sports worldwide.
            </motion.p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 text-gray-400"
              >
                <MapPin className="w-4 h-4 text-electric-gold neon-glow" />
                <span className="text-sm font-body">Paseo de la Castellana, 95, Madrid, Spain</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 text-gray-400"
              >
                <Phone className="w-4 h-4 text-electric-gold neon-glow" />
                <span className="text-sm font-body">+34 91 123 4567</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 text-gray-400"
              >
                <Mail className="w-4 h-4 text-electric-gold neon-glow" />
                <span className="text-sm font-body">info@elitesportsagency.com</span>
              </motion.div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-heading font-semibold mb-6"
            >
              Quick Links
            </motion.h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.page}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onNavigate(link.page)}
                  className="flex items-center gap-3 text-gray-400 hover:text-electric-gold transition-colors group w-full text-left font-body"
                >
                  <link.icon className="w-4 h-4 group-hover:text-electric-gold group-hover:neon-glow transition-colors" />
                  <span className="text-sm">{link.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Social Media & CTA */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-heading font-semibold mb-6"
            >
              Follow Us
            </motion.h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="p-3 bg-white/5 rounded-full hover:bg-electric-gold/20 transition-colors border border-white/10 hover:border-electric-gold/50 cyber-border"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              onClick={() => onNavigate('contact')}
              className="w-full px-6 py-3 btn-primary rounded-full font-heading font-semibold text-carbon-black hover:scale-105 transition-all hover:shadow-lg hover:shadow-electric-gold/25"
            >
              Get Started
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm font-body">
            © 2024 Elite Sports Agency. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400 font-body">
            <button className="hover:text-electric-gold transition-colors">Privacy Policy</button>
            <button className="hover:text-electric-gold transition-colors">Terms of Service</button>
            <button className="hover:text-electric-gold transition-colors">Cookie Policy</button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;