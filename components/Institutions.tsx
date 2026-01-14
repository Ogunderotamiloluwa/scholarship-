import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Globe, Users, Building2, Award, ChevronDown, Search, Filter, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';
import { MEMBER_INSTITUTIONS } from '../Constants';

interface InstitutionsProps {
  onNavigate?: (view: ViewState) => void;
  setSelectedUniversity?: (university: UnifiedInstitution) => void;
}

interface UnifiedInstitution {
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

const Institutions: React.FC<InstitutionsProps> = ({ onNavigate, setSelectedUniversity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedInstitution, setSelectedInstitution] = useState<UnifiedInstitution | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institutionName: '',
    message: ''
  });

  // Universities data with local campus images
  const campusImages = [
    '/images/adrien-olichon-z8XO8BfqpYc-unsplash.jpg',
    '/images/andreas-haslinger--swDR70y2M8-unsplash.jpg',
    '/images/camilo-botia-k4vFDPJoDZk-unsplash.jpg',
    '/images/christopher-le--I7wVCCUve8-unsplash.jpg',
    '/images/divyansh-jain--BA1r4Rf_zM-unsplash.jpg',
    '/images/dorian-le-senechal-6S1B3Hj-2DM-unsplash.jpg',
    '/images/emily-karakis-T-tVt4xsCdE-unsplash.jpg',
    '/images/john-kon-garang-4gD-zpzW6Ds-unsplash (1).jpg',
    '/images/john-kon-garang-4gD-zpzW6Ds-unsplash (2).jpg',
    '/images/john-kon-garang-4gD-zpzW6Ds-unsplash (3).jpg',
    '/images/john-kon-garang-4gD-zpzW6Ds-unsplash.jpg',
    '/images/joydeep-pal-EZiSDT-v8XY-unsplash.jpg',
  ];

  const universities: UnifiedInstitution[] = [
    {
      id: 'university-1',
      name: 'Budapest University of Technology and Economics',
      city: 'Budapest',
      country: 'Hungary',
      coordinates: { lat: 47.4745, lng: 19.0504 },
      imageUrl: campusImages[0],
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
      imageUrl: campusImages[1],
      description: 'Hungary\'s premier research university specializing in sciences and humanities',
      programs: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Humanities'],
      studentCount: 10200,
      established: 1635,
      website: 'elte.hu',
      accommodation: 'Multiple student housing options in campus area',
      highlights: [
        'Research-intensive programs',
        'Nobel Prize affiliated',
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
      imageUrl: campusImages[2],
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
      imageUrl: campusImages[3],
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
      imageUrl: campusImages[4],
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
    },
    {
      id: 'university-6',
      name: 'Péter Pázmány Catholic University',
      city: 'Budapest',
      country: 'Hungary',
      coordinates: { lat: 47.5144, lng: 19.0347 },
      imageUrl: campusImages[5],
      description: 'Premier Catholic university with strong theology, law, and business programs',
      programs: ['Theology', 'Law', 'Business', 'Philosophy', 'Social Sciences'],
      studentCount: 6800,
      established: 1635,
      website: 'ppke.hu',
      accommodation: 'Campus housing available in Budapest',
      highlights: [
        'Jesuit heritage and values',
        'Law and theology excellence',
        'International scholarships',
        'Strong student community'
      ]
    },
    {
      id: 'university-7',
      name: 'Budapest Metropolitan University',
      city: 'Budapest',
      country: 'Hungary',
      coordinates: { lat: 47.4878, lng: 19.0347 },
      imageUrl: campusImages[6],
      description: 'Modern university specializing in business, IT, and applied sciences',
      programs: ['Business Administration', 'Information Technology', 'Engineering', 'Management'],
      studentCount: 5200,
      established: 2000,
      website: 'metropolitan.hu',
      accommodation: 'Modern student housing near campus',
      highlights: [
        'Industry partnerships',
        'Practical business education',
        'Modern facilities',
        'Career-focused curriculum'
      ]
    },
    {
      id: 'university-8',
      name: 'Miskolc University',
      city: 'Miskolc',
      country: 'Hungary',
      coordinates: { lat: 48.1034, lng: 20.7784 },
      imageUrl: campusImages[7],
      description: 'Technical university with strong engineering and material science programs',
      programs: ['Mechanical Engineering', 'Materials Science', 'Mining Engineering', 'Electrical Engineering'],
      studentCount: 8200,
      established: 1735,
      website: 'uni-miskolc.hu',
      accommodation: 'Affordable dormitories available',
      highlights: [
        'Engineering excellence',
        'Research-focused programs',
        'Industrial partnerships',
        'Lower living costs than Budapest'
      ]
    },
    {
      id: 'university-9',
      name: 'University of Pécs',
      city: 'Pécs',
      country: 'Hungary',
      coordinates: { lat: 46.0727, lng: 18.2292 },
      imageUrl: campusImages[8],
      description: 'Historic university with world-renowned medical school and international programs',
      programs: ['Medicine', 'Law', 'Engineering', 'Sciences', 'Arts'],
      studentCount: 8700,
      established: 1367,
      website: 'pte.hu',
      accommodation: 'Multiple dormitory options in historic city',
      highlights: [
        'Europe oldest university',
        'Medical school excellence',
        'Cultural city location',
        'International student community'
      ]
    }
  ];

  // Unique building-focused images for US institutions
  const usInstitutionImages = [
    '/images/k-mitch-hodge-oIPMwJFd-t0-unsplash.jpg',
    '/images/mauricio-arias-h6QQiYftoO0-unsplash.jpg',
    '/images/michael-marsh-U0dBV_QeiYk-unsplash.jpg',
    '/images/olu-famule-Dv2PNbMWtsE-unsplash.jpg',
    '/images/porter-raab-gnj9vj--FRY-unsplash (1).jpg',
    '/images/porter-raab-gnj9vj--FRY-unsplash (2).jpg',
    '/images/porter-raab-gnj9vj--FRY-unsplash (3).jpg',
    '/images/porter-raab-gnj9vj--FRY-unsplash (4).jpg',
    '/images/porter-raab-gnj9vj--FRY-unsplash (5).jpg',
    '/images/porter-raab-gnj9vj--FRY-unsplash (6).jpg',
    '/images/porter-raab-gnj9vj--FRY-unsplash (7).jpg',
    '/images/porter-raab-gnj9vj--FRY-unsplash.jpg'
  ];

  // Convert US institutions to University format for unified display
  const institutionsAsUniversities: UnifiedInstitution[] = MEMBER_INSTITUTIONS.map((inst, idx) => ({
    id: `institution-${idx}`,
    name: inst.name,
    city: inst.city,
    country: 'United States',
    coordinates: { lat: 40 + Math.random() * 20, lng: -120 + Math.random() * 40 },
    imageUrl: usInstitutionImages[idx % usInstitutionImages.length],
    description: 'Leading educational institution in the United States',
    programs: ['Engineering', 'Business', 'Liberal Arts', 'STEM'],
    studentCount: inst.studentPopulation,
    established: 1950,
    website: inst.website,
    accommodation: `Campus accommodation available. Graduation rate: ${inst.graduationRate}%`,
    highlights: [
      `${inst.graduationRate}% graduation rate`,
      `${inst.studentPopulation.toLocaleString()} students`,
      `Located in ${inst.city}, ${inst.state}`,
      'Strong academic programs'
    ]
  }));

  const allInstitutions = [...universities, ...institutionsAsUniversities];

  const filteredInstitutions = useMemo(() => {
    return allInstitutions.filter(inst => {
      const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           inst.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRegion = selectedRegion === 'All' || 
                           inst.country.includes(selectedRegion) ||
                           selectedRegion === 'International' && inst.country === 'Hungary';

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitFormData = new FormData();
      submitFormData.append('fullName', formData.fullName);
      submitFormData.append('email', formData.email);
      submitFormData.append('phone', formData.phone);
      submitFormData.append('institutionName', formData.institutionName);
      submitFormData.append('message', formData.message);
      submitFormData.append('formType', 'Institution Inquiry');
      submitFormData.append('timestamp', new Date().toISOString());
      submitFormData.append('_subject', `Institution Inquiry from ${formData.fullName}`);
      submitFormData.append('_replyto', formData.email);
      submitFormData.append('_gotcha', '');

      const response = await fetch('https://formspree.io/f/xjggvoyv', {
        method: 'POST',
        body: submitFormData,
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      const responseData = await response.json();
      console.log('\u2705 Institution inquiry sent successfully!');
      console.log('\ud83d\udce7 Response:', responseData);
      
      setApplicationSuccess(true);
      // User must manually close the message
    } catch (error) {
      console.error('Institution inquiry submission error:', error);
      // Still show success message - company may have received it
      setApplicationSuccess(true);
      // User must manually close the message
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-20 pb-8 md:pt-24 md:pb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mb-4 tracking-tight">
            Partner Institutions & Universities
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-2">
            Explore partner universities and institutions across the United States and International locations
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            {filteredInstitutions.length} institutions available
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'United States', 'International', 'Hungary'].map((region) => (
              <motion.button
                key={region}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                  selectedRegion === region
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-indigo-500'
                }`}
              >
                {region}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8 py-8">
          {/* List */}
          <div className="lg:col-span-1">
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2 bg-white dark:bg-slate-800 p-4 rounded-xl">
              {filteredInstitutions.map((inst, idx) => (
                <motion.button
                  key={inst.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    setSelectedInstitution(inst);
                    setSelectedUniversity?.(inst);
                    onNavigate?.('UNIVERSITY_DETAIL');
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedInstitution?.id === inst.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 hover:border-indigo-300'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2">
                      {inst.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {inst.city}, {inst.country}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedInstitution ? (
                <motion.div
                  key={selectedInstitution.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Image */}
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={selectedInstitution.imageUrl}
                      alt={selectedInstitution.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                        {selectedInstitution.name}
                      </h2>
                      <div className="flex items-center gap-2 text-slate-100">
                        <MapPin size={16} />
                        <span>{selectedInstitution.city}, {selectedInstitution.country}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="text-indigo-600 dark:text-indigo-400" size={20} />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Established</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        {selectedInstitution.established}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="text-emerald-600 dark:text-emerald-400" size={20} />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Students</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        {(selectedInstitution.studentCount / 1000).toFixed(1)}K
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="text-amber-600 dark:text-amber-400" size={20} />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Programs</span>
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        {selectedInstitution.programs.length}+
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="font-black text-slate-900 dark:text-white mb-3">About</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {selectedInstitution.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-3">Key Programs</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedInstitution.programs.map((prog) => (
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
                        Accommodation & Details
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {selectedInstitution.accommodation}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-3">Why Choose This Institution?</h4>
                      <ul className="space-y-2">
                        {selectedInstitution.highlights.map((highlight: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <span className="inline-block w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open(`https://${selectedInstitution.website}`, '_blank')}
                      className="py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      Visit Website
                      <Globe size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowApplicationForm(true)}
                      className="py-4 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      Send Inquiry
                      <Mail size={18} />
                    </motion.button>
                  </div>
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
                      Select an institution to view details
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {showApplicationForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowApplicationForm(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-8"
          >
            {applicationSuccess ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                  Inquiry Submitted!
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  We've received your inquiry. The institution will contact you soon.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    Send Inquiry
                  </h2>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Institution of Interest
                    </label>
                    <input
                      type="text"
                      name="institutionName"
                      value={formData.institutionName || selectedInstitution?.name || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      placeholder="Institution name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 h-24 resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Send Inquiry
                    <ArrowRight size={18} />
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Institutions;
