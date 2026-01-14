import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Users, Calendar, Globe, Phone, Mail, Building2, 
  Award, BookOpen, DollarSign, Home, Copy, CheckCircle2, Heart, Share2
} from 'lucide-react';
import { ViewState } from '../types';

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

interface UniversityDetailProps {
  university: University | null;
  onNavigate: (view: ViewState) => void;
}

const UniversityDetail: React.FC<UniversityDetailProps> = ({ university, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!university) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 text-lg">No university selected</p>
          <button
            onClick={() => onNavigate('INSTITUTIONS')}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Institutions
          </button>
        </div>
      </div>
    );
  }

  const handleCopyWebsite = () => {
    navigator.clipboard.writeText(`https://${university.website}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header with back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-20 pb-6 md:pt-24 md:pb-8 flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('INSTITUTIONS')}
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft size={20} className="md:w-6 md:h-6" />
          </motion.button>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
            University Details
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 pb-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={university.imageUrl}
                alt={university.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-2">{university.name}</h2>
                <div className="flex items-center gap-2 text-lg">
                  <MapPin size={20} />
                  {university.city}, {university.country}
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">About</h3>
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6">
                {university.description}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <Calendar size={24} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">ESTABLISHED</p>
                    <p className="text-lg font-black text-slate-900 dark:text-white">{university.established}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users size={24} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">STUDENT POPULATION</p>
                    <p className="text-lg font-black text-slate-900 dark:text-white">{university.studentCount.toLocaleString()}+</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Programs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen size={28} className="text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Programs Offered</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {university.programs.map((program, idx) => (
                  <motion.div
                    key={program}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl p-4"
                  >
                    <p className="font-bold text-slate-900 dark:text-white">{program}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award size={28} className="text-amber-600 dark:text-amber-400" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Highlights</h3>
              </div>
              <div className="space-y-3">
                {university.highlights.map((highlight, idx) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl"
                  >
                    <CheckCircle2 size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-900 dark:text-white font-semibold">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Accommodation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 md:p-8 border border-green-200 dark:border-green-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <Home size={28} className="text-green-600 dark:text-green-400" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Accommodation</h3>
              </div>
              <p className="text-slate-900 dark:text-white text-lg leading-relaxed">
                {university.accommodation}
              </p>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact & Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4 sticky top-20"
            >
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Contact Info</h3>

              {/* Website */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase">Official Website</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={`https://${university.website}`}
                    readOnly
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white outline-none truncate"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyWebsite}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
                  >
                    {copied ? (
                      <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
                    ) : (
                      <Copy size={20} className="text-slate-600 dark:text-slate-400" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Visit Website Button */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://${university.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Globe size={18} />
                Visit Official Website
              </motion.a>

              {/* Location */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                <div>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Location</p>
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <MapPin size={18} className="text-red-500" />
                    <span className="font-semibold">{university.city}, {university.country}</span>
                  </div>
                </div>
              </div>

              {/* Social Engagement */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex-1 py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                    isLiked
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                  Like
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigator.share?.({
                      title: university.name,
                      text: university.description,
                      url: window.location.href
                    });
                  }}
                  className="flex-1 py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Share2 size={18} />
                  Share
                </motion.button>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white space-y-4"
            >
              <h3 className="text-xl font-black">Ready to Apply?</h3>
              <p className="text-indigo-100">
                Start your application journey with this institution.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('GRANT_APPLICATION')}
                className="w-full px-4 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Apply Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;
