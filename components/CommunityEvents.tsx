import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Sparkles, Award, Heart, Share2, ChevronRight } from 'lucide-react';
import { ViewState } from '../types';

interface CommunityEventsProps {
  onNavigate?: (view: ViewState) => void;
  setSelectedEvent?: (event: any) => void;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  attendees: number;
  category: 'gala' | 'welcome' | 'cultural' | 'networking' | 'sports' | 'farewell';
  highlights: string[];
  isFeatured: boolean;
}

const CommunityEvents: React.FC<CommunityEventsProps> = ({ onNavigate, setSelectedEvent }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const events: Event[] = [
    {
      id: 'excellence-gala-2025',
      title: 'Stipendium Hungaricum Excellence Award Gala',
      date: 'November 5, 2025',
      location: 'Budapest Congress Center, Budapest',
      description: 'Celebrate achievement and inspire futures at our annual Excellence Award Gala. An elegant evening honoring academic brilliance, fostering meaningful connections, and showcasing the transformative impact of the Stipendium Hungaricum programme.',
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
      attendees: 300,
      category: 'gala',
      highlights: [
        'Award ceremony honoring top-performing students',
        'Networking with university representatives',
        'Cultural performances and entertainment',
        'Gourmet dinner and cocktails',
        'Photo opportunities and media coverage'
      ],
      isFeatured: true
    },
    {
      id: 'alumni-fest-2025',
      title: 'Stipendium Hungaricum and Hungarian Diaspora Scholarship Alumni Fest',
      date: 'June 18, 2025',
      location: 'Europa Ship, Budapest',
      description: 'We Connect, We Belong. An unforgettable evening with nearly 300 guests united by a shared story: Hungary. Celebrating community, connection, and the global impact of these scholarship programmes.',
      imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=800',
      attendees: 280,
      category: 'networking',
      highlights: [
        'Celebrating scholarship holders and alumni',
        'Networking with diplomats and partners',
        'Cultural celebrations and performances',
        'Inclusive environment for all graduates',
        'Building global connections'
      ],
      isFeatured: true
    },
    {
      id: 'welcome-2025',
      title: 'Welcome Event for New Scholarship Holders',
      date: 'September 2025',
      location: 'Multiple University Locations',
      description: 'Welcome the new cohort of Stipendium Hungaricum students coming from around the world. An inclusive and celebratory event designed to help new students feel at home and connect with their peers.',
      imageUrl: '/images/edwin-andrade-4V1dC_eoCwg-unsplash.jpg?auto=format&fit=crop&q=80&w=800',
      attendees: 500,
      category: 'welcome',
      highlights: [
        'Meet fellow new scholarship holders',
        'Tour campus and university facilities',
        'Connect with mentors and senior students',
        'Learn about support services',
        'Celebrate diversity and inclusion',
        'Get practical orientation information'
      ],
      isFeatured: false
    },
    {
      id: 'farewell-2025',
      title: 'Farewell Party for Graduating Students',
      date: 'May 2025',
      location: 'Various University Venues',
      description: 'Celebrate the achievements of graduating Stipendium Hungaricum scholars. Reflect on memories, celebrate accomplishments, and say goodbye to friends made during studies.',
      imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
      attendees: 400,
      category: 'farewell',
      highlights: [
        'Celebration of academic achievements',
        'Photo sessions and memento exchanges',
        'Testimonials and memorable moments',
        'Entertainment and cultural performances',
        'Networking for post-graduation connections'
      ],
      isFeatured: false
    },
    {
      id: 'cultural-festival',
      title: 'International Cultural Festival',
      date: 'October 2025',
      location: 'Budapest Central Park',
      description: 'Experience diverse cultures with food, music, dance, and art from around the world. Celebrate the multicultural community of scholarship holders.',
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=800',
      attendees: 600,
      category: 'cultural',
      highlights: [
        'International cuisine from 30+ countries',
        'Live music and dance performances',
        'Art exhibitions and craft markets',
        'Language exchange corner',
        'Cultural demonstrations and workshops'
      ],
      isFeatured: false
    },
    {
      id: 'sports-day',
      title: 'Scholarship Holders Sports Championship',
      date: 'April 2025',
      location: 'National Sports Complex',
      description: 'Compete in various sports and recreational activities. Build team spirit and friendships through athletic competition.',
      imageUrl: '/images/grant-business.jpg?auto=format&fit=crop&q=80&w=800',
      attendees: 350,
      category: 'sports',
      highlights: [
        'Football, basketball, volleyball tournaments',
        'Relay races and team competitions',
        'Prize ceremonies and awards',
        'Spectator activities and entertainment',
        'Social gathering and BBQ'
      ],
      isFeatured: false
    },
    {
      id: 'mentorship-training',
      title: 'Mentorship Programme & Mentor Training',
      date: 'Throughout the Year',
      location: 'University Campus Locations',
      description: 'The Stipendium Hungaricum Mentor Network organized by HÖOK provides guidance and support. Participate in workshops and training sessions.',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      attendees: 200,
      category: 'cultural',
      highlights: [
        'One-on-one mentorship guidance',
        'Free workshops and training sessions',
        'Support with academic and personal matters',
        'Language practice and cultural integration',
        'Administrative and transportation assistance'
      ],
      isFeatured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Events', icon: '📅' },
    { id: 'gala', label: 'Galas & Awards', icon: '🏆' },
    { id: 'welcome', label: 'Welcome Events', icon: '👋' },
    { id: 'farewell', label: 'Farewells', icon: '🎓' },
    { id: 'cultural', label: 'Cultural', icon: '🎭' },
    { id: 'networking', label: 'Networking', icon: '🤝' },
    { id: 'sports', label: 'Sports', icon: '⚽' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(e => e.category === selectedCategory);

  const featuredEvents = events.filter(e => e.isFeatured);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-24 pb-8 md:pt-32 md:pb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mb-4 tracking-tight">
            Community Events & Celebrations
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Join our vibrant community at exclusive events throughout the year. Network, celebrate achievements, and build lasting friendships.
          </p>
        </motion.div>

        {/* Featured Events Section */}
        <div className="mb-16 pb-8">
          <h2 className="text-3xl font-black text-slate-950 dark:text-white mb-8">Featured Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                onClick={() => {
                  setSelectedEvent?.(event);
                  onNavigate?.('EVENT_DETAIL');
                }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-700">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-black mb-3 group-hover:translate-y-[-4px] transition-transform">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={18} />
                      ~{event.attendees}+ Attendees
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => {
                setSelectedEvent?.(event);
                onNavigate?.('EVENT_DETAIL');
              }}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full mb-3">
                  {event.category.toUpperCase()}
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 line-clamp-2">
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    ~{event.attendees}+ Attendees
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  View Details
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation to EventDetail is handled via onClick */}
      </div>
    </div>
  );
};

export default CommunityEvents;
