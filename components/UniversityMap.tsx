import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Globe, Users, Building2, Award, ChevronDown } from 'lucide-react';
import { ViewState } from '../types';

interface UniversityMapProps {
  onNavigate?: (view: ViewState) => void;
}

interface University {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  imageUrl: string;
  description: string;
  programs: string[];
  studentCount: number;
  established: number;
  website: string;
  accommodation: string;
  highlights: string[];
}

const UniversityMap: React.FC<UniversityMapProps> = ({ onNavigate }) => {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const universities: University[] = [
    {
      id: 'university-1',
      name: 'Budapest University of Technology and Economics',
      city: 'Budapest',
      country: 'Hungary',
      coordinates: { lat: 47.4745, lng: 19.0504 },
      imageUrl: 'https://images.unsplash.com/photo-1541123603104-802226a56c04?auto=format&fit=crop&q=80&w=600',
      description: 'Leading technical university with world-class engineering and technology programs',
      programs: ['Engineering', 'Computer Science', 'Architecture', 'Business'],
      studentCount: 12500,
      established: 1782,
      website: 'bme.hu',
      accommodation: 'On-campus dormitories available, 5-10 minute walking distance',
      highlights: [
        'EU top 100 engineering university',
        'Modern laboratory facilities',
        'Strong industry partnerships',
        'Erasmus+ opportunities'
      ]
    },
    {
      id: 'university-2',
      name: 'Eötvös Loránd University',
      city: 'Budapest',
      country: 'Hungary',
      coordinates: { lat: 47.4979, lng: 19.0402 },
      imageUrl: 'https://images.unsplash.com/photo-1568992687844-70efb0d20f23?auto=format&fit=crop&q=80&w=600',
      description: 'Hungary\'s premier research university specializing in sciences and humanities',
      programs: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Humanities'],
      studentCount: 10200,
      established: 1635,
      website: 'elte.hu',
      accommodation: 'Multiple student housing options in campus area',
      highlights: [
        'Research-intensive programs',
        'Noble Prize affiliated',
        'Historic institution',
        'International research collaborations'
      ]
    },
    {
      id: 'university-3',
      name: 'University of Debrecen',
      city: 'Debrecen',
      country: 'Hungary',
      coordinates: { lat: 47.5316, lng: 21.6273 },
      imageUrl: 'https://images.unsplash.com/photo-1606332008032-b2e7b8ac0e0e?auto=format&fit=crop&q=80&w=600',
      description: 'Second-largest university in Hungary with strong medical and agricultural programs',
      programs: ['Medicine', 'Veterinary', 'Agriculture', 'Engineering', 'Law'],
      studentCount: 9800,
      established: 1912,
      website: 'unideb.hu',
      accommodation: 'Affordable dorms, shared and private options',
      highlights: [
        'Medical faculty excellence',
        'Agricultural research leader',
        'Lower cost of living',
        'Modern campus facilities'
      ]
    },
    {
      id: 'university-4',
      name: 'Corvinus University of Budapest',
      city: 'Budapest',
      country: 'Hungary',
      coordinates: { lat: 47.4761, lng: 19.0425 },
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600',
      description: 'Premier business and economics university with international recognition',
      programs: ['Business', 'Economics', 'International Relations', 'Management'],
      studentCount: 8500,
      established: 1920,
      website: 'uni-corvinus.hu',
      accommodation: 'Central Budapest dormitories with modern amenities',
      highlights: [
        'Top business programs in Europe',
        'Strong international network',
        'MBA programs available',
        'Career services support'
      ]
    },
    {
      id: 'university-5',
      name: 'University of Szeged',
      city: 'Szeged',
      country: 'Hungary',
      coordinates: { lat: 46.2530, lng: 20.1414 },
      imageUrl: 'https://images.unsplash.com/photo-1517486808906-f3fa2b2f5e8d?auto=format&fit=crop&q=80&w=600',
      description: 'Historical university with excellent programs in medicine, law, and humanities',
      programs: ['Medicine', 'Law', 'Arts', 'Dentistry', 'Pharmacy'],
      studentCount: 7600,
      established: 1581,
      website: 'u-szeged.hu',
      accommodation: 'Student housing in southern Hungary, affordable rates',
      highlights: [
        'Medical school excellence',
        'Beautiful historic city',
        'Affordable living costs',
        'Strong international programs'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mb-4 tracking-tight">
            Explore Universities Across Hungary
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover world-class institutions with excellent academic programs and vibrant student communities. Select a university to learn more about location, facilities, and scholarship opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Universities List */}
          <div className="lg:col-span-1">
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {universities.map((uni, idx) => (
                <motion.button
                  key={uni.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedUniversity(uni)}
                  onMouseEnter={() => setHoveredId(uni.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedUniversity?.id === uni.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-lg'
                      : hoveredId === uni.id
                      ? 'border-indigo-200 dark:border-indigo-700 bg-white dark:bg-slate-800 shadow-md'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={20}
                      className={`mt-1 flex-shrink-0 ${
                        selectedUniversity?.id === uni.id
                          ? 'text-indigo-600 dark:text-indigo-300'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white leading-tight">
                        {uni.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {uni.city}, {uni.country}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Map & Details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedUniversity ? (
                <motion.div
                  key={selectedUniversity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* University Image */}
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={selectedUniversity.imageUrl}
                      alt={selectedUniversity.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                        {selectedUniversity.name}
                      </h2>
                      <div className="flex items-center gap-2 text-slate-100">
                        <MapPin size={16} />
                        <span>{selectedUniversity.city}, {selectedUniversity.country}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="text-indigo-600 dark:text-indigo-400" size={20} />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Established</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        {selectedUniversity.established}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="text-emerald-600 dark:text-emerald-400" size={20} />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Students</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        {(selectedUniversity.studentCount / 1000).toFixed(1)}K
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="text-amber-600 dark:text-amber-400" size={20} />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Programs</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        {selectedUniversity.programs.length}+
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="font-black text-slate-900 dark:text-white mb-3">About</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {selectedUniversity.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-3">Key Programs</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedUniversity.programs.map((prog) => (
                          <span
                            key={prog}
                            className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold rounded-full"
                          >
                            {prog}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <Building2 size={18} />
                        Accommodation
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {selectedUniversity.accommodation}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-3">Why Choose This University?</h4>
                      <ul className="space-y-2">
                        {selectedUniversity.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <span className="inline-block w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black rounded-xl transition-all shadow-lg"
                  >
                    Apply Now at {selectedUniversity.name}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-96 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl"
                >
                  <div className="text-center">
                    <MapPin size={48} className="mx-auto mb-4 text-slate-400" />
                    <p className="text-slate-600 dark:text-slate-300 font-semibold">
                      Select a university to view details
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityMap;
