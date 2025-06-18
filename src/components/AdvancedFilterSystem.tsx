import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Filter,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Zap,
  TrendingUp,
  Users,
  Globe,
  Calendar,
  DollarSign,
  Star,
  Award,
  Target
} from 'lucide-react';

const AdvancedFilterSystem = ({ athletes, onFilterChange, className = "" }) => {
  const [filters, setFilters] = useState({
    positions: [],
    ageRange: [18, 35],
    marketValueRange: [0, 100],
    nationalities: [],
    teams: [],
    searchTerm: '',
    performanceRange: [0, 100],
    joinedDateRange: [2015, 2024]
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterPresets, setFilterPresets] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Extract unique values for filters
  const positions = [...new Set(athletes.map(a => a.position))];
  const nationalities = [...new Set(athletes.map(a => a.nationality))].sort();
  const teams = [...new Set(athletes.map(a => a.team))].sort();
  
  // Calculate active filters
  useEffect(() => {
    let count = 0;
    if (filters.positions.length > 0) count++;
    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 35) count++;
    if (filters.marketValueRange[0] !== 0 || filters.marketValueRange[1] !== 100) count++;
    if (filters.nationalities.length > 0) count++;
    if (filters.teams.length > 0) count++;
    if (filters.searchTerm) count++;
    if (filters.performanceRange[0] !== 0 || filters.performanceRange[1] !== 100) count++;
    if (filters.joinedDateRange[0] !== 2015 || filters.joinedDateRange[1] !== 2024) count++;
    setActiveFilterCount(count);
  }, [filters]);

  // Generate search suggestions
  useEffect(() => {
    if (filters.searchTerm.length > 0) {
      const suggestions = [];
      
      // Name suggestions
      athletes.forEach(athlete => {
        if (athlete.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
          suggestions.push({
            type: 'name',
            value: athlete.name,
            icon: Users,
            label: `Player: ${athlete.name}`
          });
        }
      });
      
      // Team suggestions
      teams.forEach(team => {
        if (team.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
          suggestions.push({
            type: 'team',
            value: team,
            icon: Award,
            label: `Team: ${team}`
          });
        }
      });
      
      // Position suggestions
      positions.forEach(position => {
        if (position.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
          suggestions.push({
            type: 'position',
            value: position,
            icon: Target,
            label: `Position: ${position}`
          });
        }
      });
      
      setSearchSuggestions(suggestions.slice(0, 6));
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [filters.searchTerm, athletes, teams, positions]);

  // Apply filters with performance optimization
  const filteredAthletes = useMemo(() => {
    return athletes.filter(athlete => {
      // Position filter
      if (filters.positions.length > 0 && !filters.positions.includes(athlete.position)) {
        return false;
      }
      
      // Age filter
      if (athlete.age < filters.ageRange[0] || athlete.age > filters.ageRange[1]) {
        return false;
      }
      
      // Market value filter
      const value = parseInt(athlete.marketValue.replace(/[€M]/g, ''));
      if (value < filters.marketValueRange[0] || value > filters.marketValueRange[1]) {
        return false;
      }
      
      // Nationality filter
      if (filters.nationalities.length > 0 && !filters.nationalities.includes(athlete.nationality)) {
        return false;
      }
      
      // Team filter
      if (filters.teams.length > 0 && !filters.teams.includes(athlete.team)) {
        return false;
      }
      
      // Performance filter
      if (athlete.performance < filters.performanceRange[0] || athlete.performance > filters.performanceRange[1]) {
        return false;
      }
      
      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          athlete.name.toLowerCase().includes(searchLower) ||
          athlete.team.toLowerCase().includes(searchLower) ||
          athlete.position.toLowerCase().includes(searchLower) ||
          athlete.nationality.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [athletes, filters]);

  // Update parent component
  useEffect(() => {
    onFilterChange(filteredAthletes);
  }, [filteredAthletes, onFilterChange]);

  const clearAllFilters = useCallback(() => {
    setIsAnimating(true);
    setFilters({
      positions: [],
      ageRange: [18, 35],
      marketValueRange: [0, 100],
      nationalities: [],
      teams: [],
      searchTerm: '',
      performanceRange: [0, 100],
      joinedDateRange: [2015, 2024]
    });
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  const applyPreset = useCallback((preset) => {
    setIsAnimating(true);
    setFilters(preset.filters);
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  const handleSuggestionClick = useCallback((suggestion) => {
    setFilters(prev => ({ ...prev, searchTerm: suggestion.value }));
    setShowSuggestions(false);
  }, []);

  // Filter presets
  useEffect(() => {
    setFilterPresets([
      {
        name: 'Top Performers',
        icon: Star,
        color: 'from-yellow-400 to-orange-500',
        filters: {
          ...filters,
          performanceRange: [90, 100],
          marketValueRange: [50, 100]
        }
      },
      {
        name: 'Young Talents',
        icon: TrendingUp,
        color: 'from-green-400 to-blue-500',
        filters: {
          ...filters,
          ageRange: [18, 23],
          performanceRange: [75, 100]
        }
      },
      {
        name: 'Premier League',
        icon: Award,
        color: 'from-purple-400 to-pink-500',
        filters: {
          ...filters,
          teams: ['Manchester City', 'Manchester United', 'Liverpool', 'Arsenal', 'Chelsea']
        }
      },
      {
        name: 'High Value',
        icon: DollarSign,
        color: 'from-blue-400 to-purple-500',
        filters: {
          ...filters,
          marketValueRange: [70, 100]
        }
      }
    ]);
  }, [filters]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Enhanced Search Bar with Suggestions */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
          <input
            type="text"
            placeholder="Search athletes by name, team, position, or nationality..."
            value={filters.searchTerm}
            onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 focus:border-yellow-400 focus:outline-none transition-all font-body text-white placeholder-gray-400 text-base"
            aria-label="Search athletes"
          />
          {filters.searchTerm && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setFilters(prev => ({ ...prev, searchTerm: '' }))}
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
                  key={`${suggestion.type}-${suggestion.value}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
                >
                  <suggestion.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-sm">{suggestion.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Controls Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all border border-white/20 min-h-[44px]"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-semibold">Advanced Filters</span>
            {activeFilterCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 px-2 py-1 bg-yellow-400 text-black rounded-full text-xs font-bold min-w-[24px] h-6 flex items-center justify-center"
              >
                {activeFilterCount}
              </motion.span>
            )}
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>

          {activeFilterCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors text-sm font-semibold"
            >
              <RotateCcw className="w-4 h-4" />
              Clear All
            </motion.button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400 font-body">
            Showing <span className="text-white font-bold">{filteredAthletes.length}</span> of{' '}
            <span className="text-white font-bold">{athletes.length}</span> athletes
          </div>
          
          {filteredAthletes.length > 0 && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 text-green-400 text-sm"
            >
              <Zap className="w-4 h-4" />
              <span>Live Results</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Filter Presets */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 flex-wrap"
      >
        {filterPresets.map((preset, index) => (
          <motion.button
            key={preset.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyPreset(preset)}
            className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${preset.color} rounded-full text-black font-semibold text-sm hover:shadow-lg transition-all min-h-[44px]`}
          >
            <preset.icon className="w-4 h-4" />
            <span>{preset.name}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Active Filter Pills */}
      <AnimatePresence>
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {filters.positions.map(position => (
              <FilterPill
                key={`position-${position}`}
                label={`Position: ${position}`}
                onRemove={() => setFilters(prev => ({
                  ...prev,
                  positions: prev.positions.filter(p => p !== position)
                }))}
                color="blue"
              />
            ))}
            
            {filters.nationalities.map(nationality => (
              <FilterPill
                key={`nationality-${nationality}`}
                label={`Country: ${nationality}`}
                onRemove={() => setFilters(prev => ({
                  ...prev,
                  nationalities: prev.nationalities.filter(n => n !== nationality)
                }))}
                color="green"
              />
            ))}
            
            {filters.teams.map(team => (
              <FilterPill
                key={`team-${team}`}
                label={`Team: ${team}`}
                onRemove={() => setFilters(prev => ({
                  ...prev,
                  teams: prev.teams.filter(t => t !== team)
                }))}
                color="purple"
              />
            ))}
            
            {(filters.ageRange[0] !== 18 || filters.ageRange[1] !== 35) && (
              <FilterPill
                label={`Age: ${filters.ageRange[0]}-${filters.ageRange[1]}`}
                onRemove={() => setFilters(prev => ({ ...prev, ageRange: [18, 35] }))}
                color="yellow"
              />
            )}
            
            {(filters.marketValueRange[0] !== 0 || filters.marketValueRange[1] !== 100) && (
              <FilterPill
                label={`Value: €${filters.marketValueRange[0]}M-€${filters.marketValueRange[1]}M`}
                onRemove={() => setFilters(prev => ({ ...prev, marketValueRange: [0, 100] }))}
                color="yellow"
              />
            )}
            
            {(filters.performanceRange[0] !== 0 || filters.performanceRange[1] !== 100) && (
              <FilterPill
                label={`Performance: ${filters.performanceRange[0]}-${filters.performanceRange[1]}%`}
                onRemove={() => setFilters(prev => ({ ...prev, performanceRange: [0, 100] }))}
                color="green"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"
            >
              {/* Position Filter */}
              <FilterSection title="Position" icon={Target}>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {positions.map(position => (
                    <CheckboxFilter
                      key={position}
                      label={position}
                      checked={filters.positions.includes(position)}
                      onChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({
                            ...prev,
                            positions: [...prev.positions, position]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            positions: prev.positions.filter(p => p !== position)
                          }));
                        }
                      }}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Age Range Slider */}
              <FilterSection title="Age Range" icon={Calendar}>
                <div className="space-y-4">
                  <div className="text-center text-sm text-gray-400">
                    {filters.ageRange[0]} - {filters.ageRange[1]} years
                  </div>
                  <DualRangeSlider
                    min={18}
                    max={35}
                    values={filters.ageRange}
                    onChange={(values) => setFilters(prev => ({ ...prev, ageRange: values }))}
                    color="blue"
                  />
                </div>
              </FilterSection>

              {/* Market Value Slider */}
              <FilterSection title="Market Value" icon={DollarSign}>
                <div className="space-y-4">
                  <div className="text-center text-sm text-gray-400">
                    €{filters.marketValueRange[0]}M - €{filters.marketValueRange[1]}M
                  </div>
                  <DualRangeSlider
                    min={0}
                    max={100}
                    values={filters.marketValueRange}
                    onChange={(values) => setFilters(prev => ({ ...prev, marketValueRange: values }))}
                    color="yellow"
                  />
                </div>
              </FilterSection>

              {/* Performance Range */}
              <FilterSection title="Performance" icon={TrendingUp}>
                <div className="space-y-4">
                  <div className="text-center text-sm text-gray-400">
                    {filters.performanceRange[0]}% - {filters.performanceRange[1]}%
                  </div>
                  <DualRangeSlider
                    min={0}
                    max={100}
                    values={filters.performanceRange}
                    onChange={(values) => setFilters(prev => ({ ...prev, performanceRange: values }))}
                    color="green"
                  />
                </div>
              </FilterSection>

              {/* Nationality Filter */}
              <FilterSection title="Nationality" icon={Globe}>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {nationalities.map(nationality => (
                    <CheckboxFilter
                      key={nationality}
                      label={nationality}
                      checked={filters.nationalities.includes(nationality)}
                      onChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({
                            ...prev,
                            nationalities: [...prev.nationalities, nationality]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            nationalities: prev.nationalities.filter(n => n !== nationality)
                          }));
                        }
                      }}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Team Filter */}
              <FilterSection title="Team" icon={Award}>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {teams.map(team => (
                    <CheckboxFilter
                      key={team}
                      label={team}
                      checked={filters.teams.includes(team)}
                      onChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({
                            ...prev,
                            teams: [...prev.teams, team]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            teams: prev.teams.filter(t => t !== team)
                          }));
                        }
                      }}
                    />
                  ))}
                </div>
              </FilterSection>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results Message */}
      {filteredAthletes.length === 0 && activeFilterCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"
        >
          <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No athletes found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your filters to see more results</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAllFilters}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full text-black font-semibold hover:shadow-lg transition-all"
          >
            Clear All Filters
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

// Filter Pill Component
const FilterPill = ({ label, onRemove, color = 'yellow' }) => {
  const colorClasses = {
    yellow: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30',
    blue: 'bg-blue-400/20 text-blue-400 border-blue-400/30',
    green: 'bg-green-400/20 text-green-400 border-green-400/30',
    purple: 'bg-purple-400/20 text-purple-400 border-purple-400/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`inline-flex items-center gap-2 px-3 py-2 backdrop-blur-xl rounded-full text-sm border ${colorClasses[color]}`}
    >
      <span className="font-medium">{label}</span>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={onRemove}
        className="hover:opacity-70 transition-opacity min-h-[20px] min-w-[20px] flex items-center justify-center"
      >
        <X className="w-3 h-3" />
      </motion.button>
    </motion.div>
  );
};

// Filter Section Component
const FilterSection = ({ title, icon: Icon, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-5 h-5 text-yellow-400" />
      <h4 className="text-lg font-semibold text-white">{title}</h4>
    </div>
    {children}
  </div>
);

// Checkbox Filter Component
const CheckboxFilter = ({ label, checked, onChange }) => (
  <motion.label
    whileHover={{ x: 2 }}
    className="flex items-center gap-3 cursor-pointer group"
  >
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <motion.div
        animate={{
          backgroundColor: checked ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
          borderColor: checked ? '#FFD700' : 'rgba(255, 255, 255, 0.2)'
        }}
        className="w-5 h-5 rounded border-2 flex items-center justify-center"
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="w-2 h-2 bg-black rounded-sm"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    <span className="text-sm text-white group-hover:text-yellow-400 transition-colors">
      {label}
    </span>
  </motion.label>
);

// Enhanced Dual Range Slider Component
const DualRangeSlider = ({ min, max, values, onChange, color = 'yellow' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState(null);

  const colorClasses = {
    yellow: 'bg-yellow-400',
    blue: 'bg-blue-400',
    green: 'bg-green-400',
    purple: 'bg-purple-400'
  };

  const handleMouseDown = (thumbIndex) => {
    setIsDragging(true);
    setActiveThumb(thumbIndex);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveThumb(null);
  };

  const getPercentage = (value) => ((value - min) / (max - min)) * 100;

  return (
    <div className="relative px-2">
      {/* Track */}
      <div className="relative h-2 bg-white/10 rounded-full">
        {/* Active range */}
        <motion.div
          className={`absolute h-full ${colorClasses[color]} rounded-full`}
          style={{
            left: `${getPercentage(values[0])}%`,
            width: `${getPercentage(values[1]) - getPercentage(values[0])}%`
          }}
          animate={{
            boxShadow: isDragging 
              ? `0 0 20px ${color === 'yellow' ? '#FFD700' : '#3B82F6'}40`
              : `0 0 10px ${color === 'yellow' ? '#FFD700' : '#3B82F6'}20`
          }}
        />
        
        {/* Min thumb */}
        <motion.div
          className={`absolute w-6 h-6 ${colorClasses[color]} rounded-full border-2 border-white cursor-pointer transform -translate-y-1/2 -translate-x-1/2`}
          style={{ left: `${getPercentage(values[0])}%`, top: '50%' }}
          whileHover={{ scale: 1.2 }}
          whileDrag={{ scale: 1.3 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDragStart={() => handleMouseDown(0)}
          onDragEnd={handleMouseUp}
          onDrag={(event, info) => {
            const rect = event.target.parentElement.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(100, (info.point.x - rect.left) / rect.width * 100));
            const newValue = Math.round(min + (percentage / 100) * (max - min));
            if (newValue <= values[1]) {
              onChange([newValue, values[1]]);
            }
          }}
        />
        
        {/* Max thumb */}
        <motion.div
          className={`absolute w-6 h-6 ${colorClasses[color]} rounded-full border-2 border-white cursor-pointer transform -translate-y-1/2 -translate-x-1/2`}
          style={{ left: `${getPercentage(values[1])}%`, top: '50%' }}
          whileHover={{ scale: 1.2 }}
          whileDrag={{ scale: 1.3 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDragStart={() => handleMouseDown(1)}
          onDragEnd={handleMouseUp}
          onDrag={(event, info) => {
            const rect = event.target.parentElement.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(100, (info.point.x - rect.left) / rect.width * 100));
            const newValue = Math.round(min + (percentage / 100) * (max - min));
            if (newValue >= values[0]) {
              onChange([values[0], newValue]);
            }
          }}
        />
      </div>
      
      {/* Value labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default AdvancedFilterSystem;