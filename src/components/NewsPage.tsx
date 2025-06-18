import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Menu, X, Search, User, Tag } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { NewsCardSkeleton } from './LoadingSkeleton';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const NewsPage = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { ref: articlesRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const articles = [
    {
      id: 1,
      title: 'Record-Breaking Transfer: Martinez Joins Premier League Giants',
      excerpt: 'In a groundbreaking deal worth €120M, our client Diego Martinez completes his move to Manchester City, setting new records in the transfer market and establishing himself as one of the most valuable players in world football.',
      content: `In what has been described as the transfer of the decade, Diego Martinez has officially joined Manchester City in a record-breaking €120 million deal that has sent shockwaves through the football world.

The 24-year-old forward, who has been with Elite Sports Agency since 2019, becomes the most expensive signing in Premier League history, surpassing previous records and cementing his status as one of the world's elite players.

"This transfer represents everything we stand for at Elite Sports Agency," said our CEO during the announcement. "Diego's journey from a promising young talent to a global superstar exemplifies our commitment to nurturing and developing world-class athletes."

The deal includes performance-based bonuses that could see the total value reach €150 million, making it one of the largest transfers in football history. Martinez will wear the number 10 jersey and is expected to make his debut in the upcoming Champions League fixture.

Manchester City's manager expressed his excitement: "Diego brings a unique combination of pace, technical ability, and goal-scoring prowess that will elevate our team to new heights. We're thrilled to welcome him to the City family."

The transfer negotiations, which lasted six months, involved complex discussions around image rights, performance clauses, and future transfer options. Our legal team worked tirelessly to ensure Diego's interests were protected while facilitating this historic move.

This signing marks Manchester City's statement of intent for the upcoming season, as they look to reclaim the Premier League title and make a strong push in European competitions.`,
      category: 'transfers',
      date: '2024-01-15',
      readTime: '5 min read',
      author: 'Sarah Johnson',
      authorRole: 'Senior Sports Journalist',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      tags: ['Premier League', 'Transfer Record', 'Manchester City']
    },
    {
      id: 2,
      title: 'Elite Youth Academy: Nurturing the Next Generation of Football Stars',
      excerpt: 'Our comprehensive development program has produced 15 professional players this season, with 8 securing contracts at top-tier clubs across Europe, showcasing our commitment to youth development.',
      content: `The Elite Sports Agency Youth Academy continues to set the standard for player development, with an unprecedented 15 graduates securing professional contracts this season alone.

Located in our state-of-the-art facility in Madrid, the academy combines cutting-edge training methods with academic excellence, ensuring our young athletes develop both on and off the pitch.

"We don't just create footballers; we develop well-rounded individuals who can succeed in any environment," explains our Head of Youth Development, Carlos Mendez.

The academy's holistic approach includes:
- Technical skill development with former professional players
- Physical conditioning tailored to each player's needs
- Mental health support and sports psychology
- Academic education in partnership with local schools
- Life skills training and career guidance

This year's standout graduate, 18-year-old Miguel Santos, recently signed with Valencia CF after an impressive season with our academy team. "The academy gave me everything I needed to succeed," Santos commented. "The coaches, the facilities, the support system – it's world-class."

Our academy has partnerships with over 20 professional clubs across Europe, providing clear pathways for our graduates to transition into professional football. The success rate speaks for itself: 78% of our graduates secure professional contracts within two years of leaving the academy.

The facility features six full-size pitches, a modern gymnasium, recovery pools, and residential accommodation for international students. We currently house 120 young athletes aged 14-18 from 25 different countries.`,
      category: 'academy',
      date: '2024-01-12',
      readTime: '4 min read',
      author: 'Michael Rodriguez',
      authorRole: 'Academy Correspondent',
      image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Youth Development', 'Academy', 'Player Development']
    },
    {
      id: 3,
      title: 'Behind the Scenes: The Art of Multi-Million Euro Negotiations',
      excerpt: 'An exclusive look at how we secured a €85M deal for Carlos Rodriguez, including the strategic planning, negotiation tactics, and relationship building that made this transfer possible.',
      content: `The world of football transfers is often shrouded in mystery, but today we're pulling back the curtain on one of our most successful negotiations: Carlos Rodriguez's €85 million move to Real Madrid.

The process began 18 months before the transfer was announced. Our scouting network identified Real Madrid's need for a versatile forward, while Carlos was entering the final two years of his contract with his previous club.

"Successful transfers are like chess games," explains our Chief Negotiator, Elena Vasquez. "You need to think several moves ahead and understand all parties' motivations."

The negotiation involved multiple stakeholders:
- The selling club seeking maximum value
- Real Madrid wanting the best deal structure
- Carlos's personal preferences and career goals
- Image rights and commercial considerations
- FIFA regulations and transfer windows

Our strategy focused on creating a win-win scenario. We structured the deal with performance-based bonuses that satisfied the selling club's valuation while giving Real Madrid flexibility in their payment structure.

The breakthrough came during a face-to-face meeting in Monaco, where all parties agreed on a base fee of €65 million with €20 million in achievable bonuses. The deal also included a 15% sell-on clause and Champions League appearance bonuses.

"The key is building trust," Vasquez notes. "These relationships often span decades, and reputation is everything in this business."

The transfer was completed just hours before the deadline, with Carlos signing a six-year contract that makes him one of the highest-paid players in La Liga.`,
      category: 'insights',
      date: '2024-01-10',
      readTime: '7 min read',
      author: 'David Thompson',
      authorRole: 'Transfer Specialist',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Negotiations', 'Transfer Strategy', 'Real Madrid']
    },
    {
      id: 4,
      title: 'Global Expansion: Elite Sports Agency Opens Three New Offices',
      excerpt: 'Elite Sports Agency announces the opening of three new offices across Brazil, Argentina, and Colombia to better serve Latin American talent and expand our global reach.',
      content: `Elite Sports Agency is proud to announce our expansion into South America with the opening of three new offices in São Paulo, Buenos Aires, and Bogotá.

This strategic expansion represents our commitment to identifying and developing talent from one of football's most passionate regions. South America has produced some of the world's greatest players, and we're excited to be part of that legacy.

"Latin America is a hotbed of football talent," says our Global Expansion Director, Maria Santos. "By establishing a physical presence in these key markets, we can better serve local players and provide them with world-class representation."

Each office will be staffed with local experts who understand the unique challenges and opportunities in their respective markets:

São Paulo Office:
- Covers Brazil and surrounding regions
- Led by former Brazilian international João Silva
- Focus on youth development and European transfers

Buenos Aires Office:
- Serves Argentina, Uruguay, and Paraguay
- Headed by renowned agent Carlos Mendoza
- Specializes in South American league transfers

Bogotá Office:
- Covers Colombia, Venezuela, and Ecuador
- Managed by former Colombian national team coach Luis Herrera
- Emphasis on developing local talent pipelines

The expansion includes partnerships with local academies, scouting networks, and youth development programs. We've already identified 50 promising young players across the three regions.

"This isn't just about signing players," Santos explains. "We're investing in communities, supporting local football development, and creating opportunities for young athletes to achieve their dreams."

The offices are expected to be fully operational by March 2024, with plans to represent over 100 South American players within the first year.`,
      category: 'expansion',
      date: '2024-01-08',
      readTime: '3 min read',
      author: 'Ana Gutierrez',
      authorRole: 'International Correspondent',
      image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Global Expansion', 'South America', 'New Offices']
    },
    {
      id: 5,
      title: 'Data Analytics Revolution: How AI is Transforming Player Scouting',
      excerpt: 'Discover how advanced analytics and artificial intelligence are revolutionizing our approach to identifying and developing the next generation of football superstars.',
      content: `The future of football scouting is here, and it's powered by artificial intelligence and advanced data analytics. Elite Sports Agency has invested heavily in cutting-edge technology that's revolutionizing how we identify and develop talent.

Our proprietary AI system, dubbed "Scout AI," analyzes over 10,000 data points per player, including:
- Technical skills and ball control metrics
- Physical attributes and fitness levels
- Tactical awareness and decision-making
- Mental resilience and pressure handling
- Injury risk assessment and prevention

"Traditional scouting relied heavily on subjective observations," explains our Head of Analytics, Dr. James Mitchell. "While human insight remains crucial, data analytics provides objective measurements that help us make more informed decisions."

The system has already identified several breakthrough talents, including 16-year-old sensation Alex Petrov, who was flagged by our AI before any major club had noticed him. Six months later, he's being courted by Barcelona and Manchester United.

Our analytics platform processes data from:
- Match footage analysis using computer vision
- GPS tracking during training and games
- Biometric monitoring for fitness and health
- Social media sentiment analysis
- Academic performance tracking

The technology doesn't replace human scouts but enhances their capabilities. Our scouts now arrive at matches with detailed analytical reports, allowing them to focus on specific aspects of a player's performance.

"AI helps us cast a wider net," Mitchell notes. "We can now monitor players in lower leagues and smaller countries that might have been overlooked in the past."

The investment in technology has paid dividends: our success rate in identifying future stars has increased by 340% since implementing the AI system two years ago.

Looking ahead, we're developing predictive models that can forecast a player's potential career trajectory, helping us make better long-term investment decisions.`,
      category: 'insights',
      date: '2024-01-05',
      readTime: '6 min read',
      author: 'Dr. Rebecca Chen',
      authorRole: 'Technology Correspondent',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['AI Technology', 'Data Analytics', 'Player Scouting']
    },
    {
      id: 6,
      title: 'Academy Graduate Miguel Santos Signs First Professional Contract',
      excerpt: 'Rising star Miguel Santos, 18, signs his first professional contract with Valencia CF after an outstanding season with our elite development program.',
      content: `Miguel Santos's journey from our youth academy to professional football exemplifies the success of Elite Sports Agency's development philosophy.

The 18-year-old midfielder signed a four-year contract with Valencia CF yesterday, becoming the 15th academy graduate to secure a professional deal this season.

"Miguel represents everything we strive for in our academy," says Youth Development Director Carlos Mendez. "He's technically gifted, mentally strong, and has the character to succeed at the highest level."

Santos joined our academy at age 14 from a local club in Seville. His progression through our ranks has been remarkable:

Year 1-2: Foundation development focusing on technical skills
Year 3: Introduction to tactical concepts and physical conditioning
Year 4: Integration with senior academy team and match experience
Year 5: Professional preparation and club trials

"The academy didn't just improve my football," Santos reflects. "They taught me how to be a professional, how to handle pressure, and how to balance football with education."

Valencia CF's sporting director praised the academy's work: "Miguel arrives with exceptional preparation. His technical ability, combined with his maturity and professionalism, made him an easy choice for us."

The contract includes performance-based bonuses and a clear pathway to the first team. Santos is expected to start with Valencia's B team before progressing to the senior squad.

"This is just the beginning," Santos says. "My dream is to play for Spain and compete in the Champions League. The academy has given me the foundation to achieve those goals."

Our academy's success rate continues to impress: 78% of graduates secure professional contracts within two years, with many going on to represent their national teams.

Santos will continue to work with our agency as he begins his professional career, ensuring he receives the support and guidance needed to reach his full potential.`,
      category: 'academy',
      date: '2024-01-03',
      readTime: '4 min read',
      author: 'Patricia Morales',
      authorRole: 'Youth Development Reporter',
      image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Academy Graduate', 'Valencia CF', 'Professional Contract']
    },
    {
      id: 7,
      title: 'Winter Transfer Window: Record-Breaking Activity Across Europe',
      excerpt: 'Our agency facilitated 12 major transfers this winter window, with a combined value exceeding €300M across Europe\'s top leagues, setting new industry standards.',
      content: `The January transfer window has been our most successful to date, with Elite Sports Agency facilitating 12 major transfers worth over €300 million combined.

The standout moves include:
- Diego Martinez to Manchester City (€120M)
- Carlos Rodriguez to Real Madrid (€85M)
- Alessandro Rossi to AC Milan (€45M)
- João Silva to Barcelona (€35M)

"This window demonstrated our ability to operate at the highest level across multiple leagues simultaneously," says Transfer Director Elena Vasquez.

The success wasn't just about big-money moves. We also facilitated several strategic transfers for younger players:
- Three academy graduates secured moves to top-tier clubs
- Five loan deals that provide crucial development opportunities
- Two permanent transfers for players seeking regular first-team football

Our approach focuses on finding the right fit for each player, not just the highest fee. This philosophy has resulted in a 95% success rate for player satisfaction with their new clubs.

Key factors in our success:
- Extensive network of club relationships
- Deep understanding of each league's requirements
- Comprehensive player preparation and support
- Innovative deal structuring and negotiation tactics

The winter window also saw us expand our women's football representation, with three female players securing moves to top European clubs. This reflects our commitment to growing the women's game.

"Every transfer tells a story," Vasquez explains. "Our job is to ensure that story has a happy ending for all parties involved."

Looking ahead to the summer window, we're already in advanced discussions for several high-profile moves that could eclipse this window's success.

The transfers have also strengthened our relationships with clubs across Europe, positioning us perfectly for future negotiations and opportunities.`,
      category: 'transfers',
      date: '2024-01-01',
      readTime: '5 min read',
      author: 'Roberto Fernandez',
      authorRole: 'Transfer Market Analyst',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Transfer Window', 'Record Breaking', 'European Football']
    },
    {
      id: 8,
      title: 'Mental Health in Professional Sports: A Comprehensive Approach',
      excerpt: 'Our comprehensive approach to athlete mental health and wellbeing, featuring insights from our sports psychology team and the innovative programs we\'ve developed.',
      content: `Mental health in professional sports has never been more important, and Elite Sports Agency is leading the industry with our comprehensive wellness programs.

Our dedicated sports psychology team, led by Dr. Sarah Williams, works with every client to ensure they have the mental tools needed to succeed at the highest level.

"Physical talent alone isn't enough in modern football," Dr. Williams explains. "Mental resilience, emotional intelligence, and psychological preparation are just as crucial for success."

Our mental health program includes:

Individual Counseling:
- One-on-one sessions with qualified sports psychologists
- Personalized coping strategies for pressure situations
- Goal setting and motivation techniques
- Stress management and relaxation methods

Group Workshops:
- Team building and communication skills
- Leadership development programs
- Conflict resolution training
- Media training and public speaking

Performance Psychology:
- Pre-match mental preparation routines
- Visualization and mental rehearsal techniques
- Concentration and focus training
- Confidence building exercises

Crisis Support:
- 24/7 helpline for urgent mental health needs
- Rapid response team for crisis situations
- Family support and counseling services
- Transition planning for career changes

The program has shown remarkable results:
- 89% of clients report improved mental wellbeing
- 76% show enhanced performance under pressure
- 92% feel better equipped to handle media attention
- 84% demonstrate improved leadership qualities

"We've seen players transform not just their careers but their entire lives," Dr. Williams notes. "Mental health support isn't just about preventing problems; it's about optimizing human potential."

Recent success stories include a player who overcame severe anxiety to become a team captain and another who used our support to successfully transition from playing to coaching.

The program also extends to families, recognizing that an athlete's support system is crucial for their overall wellbeing.

As mental health awareness grows in sports, we're proud to be at the forefront of this important movement.`,
      category: 'insights',
      date: '2023-12-28',
      readTime: '8 min read',
      author: 'Dr. Sarah Williams',
      authorRole: 'Head of Sports Psychology',
      image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Mental Health', 'Sports Psychology', 'Player Wellbeing']
    },
    {
      id: 9,
      title: 'Women\'s Football: Breaking Barriers and Setting New Standards',
      excerpt: 'Elite Sports Agency\'s commitment to women\'s football continues to grow, with 15 female players now in our roster and groundbreaking deals being secured across Europe.',
      content: `Women's football is experiencing unprecedented growth, and Elite Sports Agency is proud to be at the forefront of this revolution.

Our women's football division, established in 2022, now represents 15 elite female players across Europe's top leagues. This year alone, we've secured record-breaking contracts and pioneered new standards for women's football representation.

"The women's game is evolving rapidly," says our Women's Football Director, Lisa Martinez. "The quality, professionalism, and commercial opportunities are reaching new heights every season."

Recent achievements include:
- Securing the highest-ever contract for a female player in Spain
- Negotiating groundbreaking image rights deals
- Establishing partnerships with major brands for our female clients
- Creating mentorship programs connecting current and former players

Our female clients compete in:
- UEFA Women's Champions League
- FIFA Women's World Cup
- European Championships
- Top domestic leagues across Europe

The growth in women's football has been staggering:
- TV viewership increased by 300% in the last two years
- Sponsorship deals have grown by 250%
- Average salaries have doubled since 2021
- Social media following has increased by 400%

"We're not just representing players; we're helping to build the future of women's football," Martinez explains. "Every contract we negotiate, every deal we secure, helps raise the bar for the entire sport."

Our approach to women's football representation includes:
- Equal resources and attention compared to men's football
- Specialized marketing and brand development
- Educational programs on financial planning
- Career transition support and planning

Success stories include Maria Gonzalez, who became the first Spanish woman to earn over €500,000 annually, and Emma Thompson, whose social media following grew from 10,000 to 2 million followers in 18 months.

"The future of women's football is incredibly bright," Martinez concludes. "We're just getting started."`,
      category: 'insights',
      date: '2023-12-25',
      readTime: '6 min read',
      author: 'Lisa Martinez',
      authorRole: 'Women\'s Football Director',
      image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Women\'s Football', 'Gender Equality', 'Breaking Barriers']
    },
    {
      id: 10,
      title: 'Sustainability in Sports: Our Environmental Commitment',
      excerpt: 'Elite Sports Agency launches comprehensive sustainability initiative, becoming the first sports agency to achieve carbon neutrality while promoting environmental awareness among athletes.',
      content: `Elite Sports Agency is proud to announce our comprehensive sustainability initiative, making us the first sports agency to achieve carbon neutrality.

Our commitment to environmental responsibility extends beyond our operations to include our athletes, partners, and the broader football community.

"As leaders in sports representation, we have a responsibility to lead by example," says our Sustainability Director, Dr. Emma Green. "Climate change affects everyone, and the sports industry must play its part in creating solutions."

Our sustainability program includes:

Carbon Neutrality:
- 100% renewable energy in all offices
- Carbon offset programs for all business travel
- Paperless operations and digital-first approach
- Sustainable transportation options for staff

Athlete Education:
- Environmental awareness workshops
- Sustainable lifestyle coaching
- Green investment opportunities
- Community environmental projects

Facility Management:
- LEED-certified office buildings
- Water conservation systems
- Waste reduction and recycling programs
- Sustainable catering and supplies

Partner Requirements:
- Sustainability criteria for all partnerships
- Environmental impact assessments
- Green technology adoption incentives
- Collaborative sustainability projects

The initiative has already shown impressive results:
- 75% reduction in carbon emissions since 2022
- 90% waste diversion from landfills
- 50% reduction in water consumption
- 100% sustainable sourcing for office supplies

Our athletes are embracing the program enthusiastically. Carlos Rodriguez recently invested in a solar energy company, while Diego Martinez launched a foundation focused on ocean conservation.

"It's about more than just football," Rodriguez explains. "We have platforms that can inspire millions of people to make positive environmental choices."

The program also includes community outreach:
- Tree planting initiatives in local communities
- Environmental education in schools
- Clean energy projects in developing countries
- Marine conservation partnerships

"Sustainability isn't just good for the planet; it's good for business," Dr. Green notes. "Our clients appreciate working with an agency that shares their values and helps them make a positive impact."

Looking ahead, we're developing a sustainability certification program for sports facilities and exploring innovative technologies that could revolutionize the industry's environmental impact.`,
      category: 'insights',
      date: '2023-12-22',
      readTime: '7 min read',
      author: 'Dr. Emma Green',
      authorRole: 'Sustainability Director',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Sustainability', 'Environmental Responsibility', 'Carbon Neutral']
    }
  ];

  const categories = [
    { id: 'all', label: 'All News', count: articles.length },
    { id: 'transfers', label: 'Transfers', count: articles.filter(a => a.category === 'transfers').length },
    { id: 'academy', label: 'Academy', count: articles.filter(a => a.category === 'academy').length },
    { id: 'insights', label: 'Insights', count: articles.filter(a => a.category === 'insights').length },
    { id: 'expansion', label: 'Expansion', count: articles.filter(a => a.category === 'expansion').length }
  ];

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  const filteredArticles = useMemo(() => {
    let filtered = regularArticles;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchTerm, regularArticles]);

  const handleCategoryChange = (category) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 300);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleNavigation = (page) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const ArticleModal = ({ article, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full border border-white/20 relative max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close article"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-2xl mb-6"
          />
          
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-4 h-4 text-yellow-400" />
            <div className="flex gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <h1 className="text-3xl font-heading font-bold mb-4 text-white">{article.title}</h1>
          <p className="text-xl text-gray-300 mb-6 font-body">{article.excerpt}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-300 mb-4 leading-relaxed font-body">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{article.author}</h3>
              <p className="text-gray-400 text-sm">{article.authorRole}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

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
              className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold px-3 py-2 rounded-lg"
              style={{ color: '#FFD700' }}
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
        currentPage="news"
      />

      <div className="py-24 px-4 md:px-8">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-heading font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">Latest News</span>
            </h1>
            <p className="text-xl text-gray-400 font-body max-w-3xl mx-auto">
              Stay updated with the latest developments in sports representation and industry insights
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles by title, content, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 focus:border-yellow-400 focus:outline-none transition-colors font-body text-white placeholder-gray-400"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-4 flex-wrap justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-3 rounded-full transition-all font-heading font-semibold min-h-[44px] ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-yellow-400 to-purple-500 text-black'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/20'
                  }`}
                  aria-pressed={selectedCategory === category.id}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Featured Article */}
          {featuredArticle && !searchTerm && selectedCategory === 'all' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <article 
                className="relative group cursor-pointer rounded-3xl"
                onClick={() => handleArticleClick(featuredArticle)}
                tabIndex={0}
              >
                <div className="aspect-[21/9] overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-yellow-400/50 transition-all">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Featured Badge */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-purple-500 text-black px-4 py-2 rounded-full font-heading font-semibold text-sm">
                    Featured Story
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-300 font-body">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={featuredArticle.date}>{formatDate(featuredArticle.date)}</time>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredArticle.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{featuredArticle.author}</span>
                      </div>
                    </div>
                    <h2 className="text-4xl font-heading font-bold mb-4 group-hover:text-yellow-400 transition-colors text-white">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-300 text-lg max-w-3xl font-body">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            </motion.div>
          )}

          {/* Articles Grid */}
          <motion.div ref={articlesRef} layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <NewsCardSkeleton />
                  </motion.div>
                ))
              ) : (
                filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: isIntersecting ? index * 0.1 : 0 }}
                    className="group cursor-pointer rounded-3xl"
                    onClick={() => handleArticleClick(article)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Read article: ${article.title}`}
                  >
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl hover:border-yellow-400/50 transition-all overflow-hidden border border-white/10 h-full flex flex-col">
                      {/* Image */}
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-400 font-body">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={article.date}>{formatDate(article.date)}</time>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="mb-3">
                          <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-semibold uppercase">
                            {article.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2 text-white flex-grow">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3 font-body">
                          {article.excerpt}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-black" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-semibold">{article.author}</p>
                            <p className="text-gray-400 text-xs">{article.authorRole}</p>
                          </div>
                        </div>

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-yellow-400 font-heading font-semibold text-sm group-hover:gap-3 transition-all mt-auto">
                          <span>Read Full Article</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </AnimatePresence>
          </motion.div>

          {!isLoading && filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-2xl text-gray-400 font-heading">No articles found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full text-black font-semibold hover:scale-105 transition-transform"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsPage;