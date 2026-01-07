import React, { useState } from 'react';
import { ViewState } from '../types';
import { MEMBER_INSTITUTIONS } from '../Constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Users, Book, Award, Globe, ExternalLink, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface MembersProps {
  onNavigate: (view: ViewState) => void;
}

interface MembershipApplication {
  institutionName: string;
  contactName: string;
  email: string;
  phone: string;
  position: string;
}

const Members: React.FC<MembersProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [showMembershipForm, setShowMembershipForm] = useState(false);
  const [membershipStep, setMembershipStep] = useState<1 | 2 | 3>(1);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [formData, setFormData] = useState<MembershipApplication>({
    institutionName: '',
    contactName: '',
    email: '',
    phone: '',
    position: ''
  });
  
  const regions = ['All', 'Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'];

  const filteredInstitutions = MEMBER_INSTITUTIONS.filter(inst => {
    const matchesRegion = selectedRegion === 'All' || inst.region === selectedRegion;
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inst.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const stats = {
    totalInstitutions: MEMBER_INSTITUTIONS.length,
    totalStudents: MEMBER_INSTITUTIONS.reduce((sum, inst) => sum + inst.studentPopulation, 0),
    averageGradRate: Math.round(MEMBER_INSTITUTIONS.reduce((sum, inst) => sum + inst.graduationRate, 0) / MEMBER_INSTITUTIONS.length),
  };

  const handleMembershipChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMembershipSubmit = () => {
    if (membershipStep < 3) {
      setMembershipStep((membershipStep + 1) as 1 | 2 | 3);
    } else {
      setApplicationSuccess(true);
      setTimeout(() => {
        setShowMembershipForm(false);
        setMembershipStep(1);
        setApplicationSuccess(false);
        setFormData({ institutionName: '', contactName: '', email: '', phone: '', position: '' });
      }, 2000);
    }
  };

  const canProceed = () => {
    if (membershipStep === 1) return formData.institutionName.trim() && formData.position.trim();
    if (membershipStep === 2) return formData.contactName.trim() && formData.email.includes('@') && formData.phone.trim();
    return true;
  };

  return (
    <div className="bg-white dark:bg-slate-950 overflow-hidden">
      <AnimatePresence>
        {applicationSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] bg-emerald-500 text-white px-6 py-4 rounded-xl font-black shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={24} />
            <div>
              <p className="font-black">We received your message!</p>
              <p className="text-sm text-emerald-100">We'll get back to you via text or message within 2-3 hours.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* HERO SECTION */}
      <section className="relative min-h-[500px] flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden px-4 pt-32 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-3xl">
            <h1 className="heading-serif text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-6">
              Member <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-emerald-200">Institutions</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-8">
              A network of {stats.totalInstitutions} premier institutions educating {(stats.totalStudents / 1000).toFixed(0)}K+ students nationwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-gradient-to-r from-indigo-50 dark:from-slate-900 to-emerald-50 dark:to-slate-900 px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: <Award size={32} />, label: 'Member Institutions', value: stats.totalInstitutions },
            { icon: <Users size={32} />, label: 'Students Served', value: `${(stats.totalStudents / 1000).toFixed(0)}K+` },
            { icon: <Award size={32} />, label: 'Avg. Graduation Rate', value: `${stats.averageGradRate}%` },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700"
            >
              <div className="text-indigo-600 dark:text-indigo-400 mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</div>
              <p className="text-slate-600 dark:text-slate-400 font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <section className="sticky top-20 md:top-24 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search institutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
            />
          </div>

          {/* Region Filter */}
          <div className="flex flex-wrap gap-2">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-5 py-2 rounded-xl font-bold text-sm transition-all transform active:scale-95 ${
                  selectedRegion === region 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONS GRID */}
      <section className="bg-white dark:bg-slate-950 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {filteredInstitutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filteredInstitutions.map((institution, index) => (
                  <motion.div
                    key={institution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl h-full flex flex-col"
                  >
                    {/* Header with Logo/Color */}
                    <div className={`h-32 md:h-40 bg-gradient-to-br ${institution.gradient} flex items-center justify-center p-6`}>
                      <div className="text-center">
                        <h3 className="text-white font-black text-2xl line-clamp-2">{institution.name.split(' ')[0]}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 w-fit">
                        <Globe size={14} className="text-indigo-600" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{institution.region}</span>
                      </div>

                      <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {institution.name}
                      </h4>

                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-6">
                        <MapPin size={16} className="text-indigo-600 flex-shrink-0" />
                        <span>{institution.city}, {institution.state}</span>
                      </div>

                      {/* Stats */}
                      <div className="space-y-4 mb-6 py-6 border-t border-b border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Student Population</span>
                          <span className="text-lg font-black text-slate-900 dark:text-white">{(institution.studentPopulation / 1000).toFixed(1)}K</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Graduation Rate</span>
                          <span className="text-lg font-black text-emerald-600">{institution.graduationRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Founded</span>
                          <span className="text-lg font-black text-slate-900 dark:text-white">{institution.founded}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                        {institution.description}
                      </p>

                      {/* CTA */}
                      <a 
                        href={institution.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-2 justify-center w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95"
                      >
                        Visit Website
                        <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-slate-600 dark:text-slate-400 text-lg">No institutions found matching your search.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-600 px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Join Our Network</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Are you representing an educational institution? Join our growing network of premier colleges and universities.
          </p>
          <button 
            onClick={() => {
              setShowMembershipForm(true);
              setMembershipStep(1);
            }}
            className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-lg active:scale-95">
            Apply for Membership
          </button>
        </div>
      </section>

      {/* MEMBERSHIP APPLICATION MODAL */}
      <AnimatePresence>
        {showMembershipForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4 pt-20"
            onClick={() => setShowMembershipForm(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {!applicationSuccess ? (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Institutional Membership</h2>
                      <p className="text-slate-600 dark:text-slate-400">Step {membershipStep} of 3</p>
                    </div>
                    <button 
                      onClick={() => setShowMembershipForm(false)}
                      className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                      <X size={20} className="text-slate-600 dark:text-slate-400" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map(step => (
                      <div 
                        key={step} 
                        className={`flex-1 h-2 rounded-full transition-all ${
                          step <= membershipStep 
                            ? 'bg-indigo-600' 
                            : 'bg-slate-200 dark:bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Step 1: Institution Information */}
                  {membershipStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">Institution Information</h3>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Institution Name</label>
                        <input 
                          type="text"
                          name="institutionName"
                          value={formData.institutionName}
                          onChange={handleMembershipChange}
                          placeholder="Enter your institution name"
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Position</label>
                        <select 
                          name="position"
                          value={formData.position}
                          onChange={handleMembershipChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all"
                        >
                          <option value="">Select your position</option>
                          <option value="President">President/Rector</option>
                          <option value="Vice President">Vice President</option>
                          <option value="Dean">Dean</option>
                          <option value="Director">Director</option>
                          <option value="Administrator">Administrator</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Contact Information */}
                  {membershipStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">Contact Information</h3>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                        <input 
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleMembershipChange}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                        <input 
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleMembershipChange}
                          placeholder="your.email@institution.edu"
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                        <input 
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleMembershipChange}
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Review & Confirm */}
                  {membershipStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8">Review Your Application</h3>
                      <div className="space-y-4 bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl">
                        <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-slate-700">
                          <span className="text-slate-600 dark:text-slate-400 font-medium">Institution:</span>
                          <span className="text-slate-900 dark:text-white font-bold text-right">{formData.institutionName}</span>
                        </div>
                        <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-slate-700">
                          <span className="text-slate-600 dark:text-slate-400 font-medium">Position:</span>
                          <span className="text-slate-900 dark:text-white font-bold text-right">{formData.position}</span>
                        </div>
                        <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-slate-700">
                          <span className="text-slate-600 dark:text-slate-400 font-medium">Contact Name:</span>
                          <span className="text-slate-900 dark:text-white font-bold text-right">{formData.contactName}</span>
                        </div>
                        <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-slate-700">
                          <span className="text-slate-600 dark:text-slate-400 font-medium">Email:</span>
                          <span className="text-slate-900 dark:text-white font-bold text-right">{formData.email}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-slate-600 dark:text-slate-400 font-medium">Phone:</span>
                          <span className="text-slate-900 dark:text-white font-bold text-right">{formData.phone}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        By submitting this application, you agree that your institution will meet our membership requirements and maintain accreditation standards.
                      </p>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-8">
                    {membershipStep > 1 && (
                      <button 
                        onClick={() => setMembershipStep((membershipStep - 1) as 1 | 2 | 3)}
                        className="flex-1 px-6 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                      >
                        Back
                      </button>
                    )}
                    <button 
                      onClick={handleMembershipSubmit}
                      disabled={!canProceed()}
                      className={`flex-1 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                        canProceed()
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-lg cursor-pointer'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {membershipStep === 3 ? 'Submit Application' : 'Continue'}
                      {membershipStep < 3 && <ArrowRight size={18} />}
                    </button>
                  </div>
                </>
              ) : (
                /* Success Message */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Application Submitted!</h3>
                    <p className="text-slate-600 dark:text-slate-400">Thank you for applying. Our team will review your application and contact you within 5-7 business days.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Members;
