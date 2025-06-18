import React from 'react';
import { motion } from 'framer-motion';

// Enhanced shimmer animation
const shimmerVariants = {
  initial: { x: '-100%' },
  animate: { x: '100%' },
};

const shimmerTransition = {
  repeat: Infinity,
  duration: 1.5,
  ease: 'linear',
};

// Progressive Image Loading Component
export const ProgressiveImage = ({ src, alt, className, placeholder }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PC9zdmc+');

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${
          imageLoaded ? 'filter-none' : 'filter blur-sm'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-800/50 animate-pulse" />
      )}
    </div>
  );
};

// Enhanced Athlete Card Skeleton
export const AthleteCardSkeleton = () => (
  <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden transform-gpu">
    <div className="aspect-[3/4] bg-gray-800/50 relative overflow-hidden">
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={shimmerTransition}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      
      {/* Skeleton avatar */}
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-gray-700/50 rounded-full relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ ...shimmerTransition, delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>
      
      {/* Skeleton badge */}
      <div className="absolute top-4 right-4 w-8 h-6 bg-gray-700/50 rounded-full relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ ...shimmerTransition, delay: 0.4 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>
    </div>
    
    <div className="p-6 space-y-3">
      {/* Name skeleton */}
      <div className="h-6 bg-gray-800/50 rounded-lg relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ ...shimmerTransition, delay: 0.1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>
      
      {/* Position skeleton */}
      <div className="h-4 bg-gray-800/50 rounded-lg w-3/4 relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ ...shimmerTransition, delay: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>
      
      {/* Value skeleton */}
      <div className="h-5 bg-gray-800/50 rounded-lg w-1/2 relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ ...shimmerTransition, delay: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>
      
      {/* Stats skeleton */}
      <div className="flex gap-4 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1">
            <div className="h-3 bg-gray-800/50 rounded mb-1 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                transition={{ ...shimmerTransition, delay: 0.6 + i * 0.1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </div>
            <div className="h-2 bg-gray-800/50 rounded w-2/3 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                transition={{ ...shimmerTransition, delay: 0.8 + i * 0.1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Enhanced News Card Skeleton
export const NewsCardSkeleton = () => (
  <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden transform-gpu">
    <div className="aspect-[16/10] bg-gray-800/50 relative overflow-hidden">
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={shimmerTransition}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      
      {/* Category badge skeleton */}
      <div className="absolute top-4 left-4 w-16 h-6 bg-gray-700/50 rounded-full relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ ...shimmerTransition, delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>
    </div>
    
    <div className="p-6 space-y-4">
      {/* Meta info skeleton */}
      <div className="flex gap-4">
        <div className="h-3 bg-gray-800/50 rounded w-20 relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ ...shimmerTransition, delay: 0.1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>
        <div className="h-3 bg-gray-800/50 rounded w-16 relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ ...shimmerTransition, delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>
      </div>
      
      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-6 bg-gray-800/50 rounded relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ ...shimmerTransition, delay: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>
        <div className="h-6 bg-gray-800/50 rounded w-3/4 relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ ...shimmerTransition, delay: 0.4 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`h-3 bg-gray-800/50 rounded ${i === 3 ? 'w-2/3' : 'w-full'} relative overflow-hidden`}>
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ ...shimmerTransition, delay: 0.5 + i * 0.1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </div>
        ))}
      </div>
      
      {/* Read more skeleton */}
      <div className="h-4 bg-gray-800/50 rounded w-24 relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ ...shimmerTransition, delay: 0.8 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>
    </div>
  </div>
);

// Service Card Skeleton
export const ServiceCardSkeleton = () => (
  <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 transform-gpu">
    {/* Icon skeleton */}
    <div className="w-16 h-16 bg-gray-800/50 rounded-2xl mb-6 relative overflow-hidden">
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={shimmerTransition}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
    
    {/* Title skeleton */}
    <div className="h-7 bg-gray-800/50 rounded-lg mb-4 relative overflow-hidden">
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={{ ...shimmerTransition, delay: 0.1 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
    
    {/* Description skeleton */}
    <div className="space-y-2 mb-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`h-4 bg-gray-800/50 rounded ${i === 3 ? 'w-3/4' : 'w-full'} relative overflow-hidden`}>
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ ...shimmerTransition, delay: 0.2 + i * 0.1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>
      ))}
    </div>
    
    {/* Features skeleton */}
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-2 h-2 bg-gray-800/50 rounded-full relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ ...shimmerTransition, delay: 0.5 + i * 0.1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </div>
          <div className="h-3 bg-gray-800/50 rounded flex-1 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ ...shimmerTransition, delay: 0.6 + i * 0.1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Dashboard Metric Skeleton
export const DashboardMetricSkeleton = () => (
  <div className="glass-effect rounded-xl md:rounded-2xl responsive-p-sm text-center border border-white/10 transform-gpu">
    {/* Label skeleton */}
    <div className="h-4 bg-gray-800/50 rounded mb-2 relative overflow-hidden">
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={shimmerTransition}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
    
    {/* Value skeleton */}
    <div className="h-8 bg-gray-800/50 rounded mb-1 relative overflow-hidden">
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={{ ...shimmerTransition, delay: 0.2 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
    
    {/* Change skeleton */}
    <div className="h-3 bg-gray-800/50 rounded w-1/2 mx-auto relative overflow-hidden">
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={{ ...shimmerTransition, delay: 0.4 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
  </div>
);

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', color = 'yellow' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    yellow: 'border-yellow-400',
    blue: 'border-blue-400',
    purple: 'border-purple-400',
    green: 'border-green-400'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full`}
    />
  );
};

// Pulse Loading Component
export const PulseLoader = ({ count = 3, color = 'yellow' }) => {
  const colorClasses = {
    yellow: 'bg-yellow-400',
    blue: 'bg-blue-400',
    purple: 'bg-purple-400',
    green: 'bg-green-400'
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut'
          }}
          className={`w-2 h-2 rounded-full ${colorClasses[color]}`}
        />
      ))}
    </div>
  );
};