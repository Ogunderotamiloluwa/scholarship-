import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, MapPin, Users, Clock, Award, DollarSign,
  ChevronRight, Filter, Search, X, Bookmark, Share2,
  Building2, TrendingUp, Heart, ExternalLink, Zap
} from 'lucide-react';
import { ViewState } from '../types';

interface InternshipOpportunitiesProps {
  onNavigate?: (view: ViewState) => void;
  setSelectedInternship?: (internship: any) => void;
}

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  duration: string;
  salary: string;
  industry: string;
  requiredSkills: string[];
  benefits: string[];
  imageUrl: string;
  applicationDeadline: string;
  startDate: string;
  isPaid: boolean;
  isFeatured: boolean;
  applicationLink?: string;
  positions?: number;
}

const InternshipOpportunities: React.FC<InternshipOpportunitiesProps> = ({ onNavigate, setSelectedInternship }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const internships: Internship[] = [
    // TIER 1: FEATURED (6)
    {
      id: 'internship-1',
      title: 'Data Science Internship',
      company: 'TechCorp Hungary',
      description: 'Work on real-world data science projects using Python, machine learning, and cloud technologies. You will collaborate with experienced data scientists and contribute to our product development.',
      location: 'Budapest',
      duration: '3-6 months',
      salary: '€800-1200/month',
      industry: 'Technology',
      requiredSkills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
      benefits: [
        'Competitive monthly stipend',
        'Flexible working hours',
        'Free lunch and coffee',
        'Mentorship from senior data scientists',
        'Potential job offer upon completion'
      ],
      imageUrl: '/images/icons8-team-yTwXpLO5HAA-unsplash.jpg',
      applicationDeadline: '2025-04-30',
      startDate: 'June 2025',
      isPaid: true,
      isFeatured: true,
      positions: 3,
      applicationLink: 'https://techcorp.hu/careers'
    },
    {
      id: 'internship-2',
      title: 'Finance & Accounting Internship',
      company: 'BudapestBank',
      description: 'Join our finance team to gain hands-on experience in financial analysis, accounting, and reporting. You will support real transactions and financial operations while learning from banking professionals.',
      location: 'Budapest',
      duration: '4-6 months',
      salary: '€900-1300/month',
      industry: 'Finance',
      requiredSkills: ['Excel', 'Accounting', 'Financial Analysis', 'Attention to Detail'],
      benefits: [
        'Competitive salary',
        'Flexible schedule for students',
        'Professional development training',
        'Networking with banking professionals',
        'Certificate of completion'
      ],
      imageUrl: '/images/brooke-cagle--uHVRvDr7pg-unsplash.jpg',
      applicationDeadline: '2025-05-15',
      startDate: 'July 2025',
      isPaid: true,
      isFeatured: true,
      positions: 2,
      applicationLink: 'https://budapestbank.hu/careers'
    },
    {
      id: 'internship-3',
      title: 'Software Development Internship',
      company: 'CodeWave Solutions',
      description: 'Develop web and mobile applications using modern tech stack. Work with agile teams, contribute to open-source projects, and learn best practices in software engineering.',
      location: 'Budapest / Remote',
      duration: '3-6 months',
      salary: '€1000-1500/month',
      industry: 'Technology',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'Git'],
      benefits: [
        'Competitive salary',
        'Remote work flexibility',
        'Tech conference attendance budget',
        'Code review mentorship',
        'Full-time job consideration'
      ],
      imageUrl: '/images/rodeo-project-management-software-b2L3f7ednYE-unsplash.jpg',
      applicationDeadline: '2025-04-15',
      startDate: 'May 2025',
      isPaid: true,
      isFeatured: true,
      positions: 4,
      applicationLink: 'https://codewave.hu/internships'
    },
    {
      id: 'internship-4',
      title: 'Marketing & Communications Internship',
      company: 'BrandBuilders Agency',
      description: 'Support marketing campaigns, manage social media content, and assist with market research. Perfect for developing skills in digital marketing and brand communication.',
      location: 'Budapest',
      duration: '3-5 months',
      salary: '€600-900/month',
      industry: 'Marketing',
      requiredSkills: ['Social Media', 'Content Writing', 'Canva', 'Marketing Analytics'],
      benefits: [
        'Creative work environment',
        'Social media management experience',
        'Campaign portfolio building',
        'Industry networking',
        'Flexible hours'
      ],
      imageUrl: '/images/redd-francisco-PTRzqc_h1r4-unsplash.jpg',
      applicationDeadline: '2025-04-20',
      startDate: 'May 2025',
      isPaid: true,
      isFeatured: true,
      positions: 3,
      applicationLink: 'https://brandbuilders.hu/apply'
    },
    {
      id: 'internship-5',
      title: 'Legal Research Internship',
      company: 'Central Europe Law Firm',
      description: 'Conduct legal research, assist with case preparation, and learn about international law. Great opportunity for law students to gain practical courtroom experience.',
      location: 'Budapest',
      duration: '4-6 months',
      salary: '€700-1000/month',
      industry: 'Law',
      requiredSkills: ['Legal Research', 'Writing', 'Analysis', 'Time Management'],
      benefits: [
        'Mentorship from experienced attorneys',
        'Case file exposure',
        'Letter of recommendation',
        'Professional law library access',
        'Networking with legal professionals'
      ],
      imageUrl: '/images/joel-danielson-dw4StX7U5Yw-unsplash.jpg?auto=format&fit=crop&q=80&w=600',
      applicationDeadline: '2025-05-01',
      startDate: 'June 2025',
      isPaid: true,
      isFeatured: true,
      positions: 2,
      applicationLink: 'https://celaw.hu/internships'
    },
    {
      id: 'internship-6',
      title: 'Business Development Internship',
      company: 'ExpandCorp International',
      description: 'Identify market opportunities, assist with business strategy, and support partnership development. Gain exposure to international business operations.',
      location: 'Budapest',
      duration: '3-4 months',
      salary: '€800-1100/month',
      industry: 'Business',
      requiredSkills: ['Market Research', 'Communication', 'Presentation', 'CRM Tools'],
      benefits: [
        'International business exposure',
        'Travel opportunities',
        'Professional network building',
        'Strategic thinking training',
        'Career mentorship'
      ],
      imageUrl: '/images/pharmaceutical-research.jpg',
      applicationDeadline: '2025-05-10',
      startDate: 'June 2025',
      isPaid: true,
      isFeatured: true,
      positions: 2,
      applicationLink: 'https://expandcorp.hu/careers'
    },

    // TIER 2: STANDARD (10+)
    {
      id: 'internship-7',
      title: 'Engineering Internship',
      company: 'InnovateTech Engineering',
      description: 'Work on engineering projects, CAD design, and technical documentation. Collaborate with cross-functional teams on product development and testing.',
      location: 'Debrecen',
      duration: '4-6 months',
      salary: '€900-1300/month',
      industry: 'Engineering',
      requiredSkills: ['CAD', 'Technical Drawing', 'Problem Solving', 'Physics'],
      benefits: [
        'Real project experience',
        'Advanced CAD software training',
        'Engineering mentorship',
        'Laboratory access',
        'Full-time employment potential'
      ],
      imageUrl: '/images/redd-francisco-5U_28ojjgms-unsplash.jpg',
      applicationDeadline: '2025-05-05',
      startDate: 'June 2025',
      isPaid: true,
      isFeatured: false,
      positions: 3,
      applicationLink: 'https://innovatetech.hu/internships'
    },
    {
      id: 'internship-8',
      title: 'Human Resources Internship',
      company: 'TalentGrow Solutions',
      description: 'Support HR operations, assist with recruitment, employee relations, and training programs. Learn about organizational development and talent management.',
      location: 'Budapest',
      duration: '3-5 months',
      salary: '€550-800/month',
      industry: 'Human Resources',
      requiredSkills: ['Communication', 'Organization', 'HR Knowledge', 'Microsoft Office'],
      benefits: [
        'HR certifications training',
        'Recruitment experience',
        'Employee relations exposure',
        'Professional development',
        'Networking in HR industry'
      ],
      imageUrl: '/images/dylan-gillis-KdeqA3aTnBY-unsplash.jpg',
      applicationDeadline: '2025-05-20',
      startDate: 'July 2025',
      isPaid: true,
      isFeatured: false,
      positions: 2,
      applicationLink: 'https://talentgrow.hu/careers'
    },
    {
      id: 'internship-9',
      title: 'Environmental Science Internship',
      company: 'GreenEarth Initiative',
      description: 'Work on environmental projects, sustainability assessments, and climate action initiatives. Perfect for environmental science and geology students.',
      location: 'Szeged',
      duration: '3-4 months',
      salary: '€600-900/month',
      industry: 'Environment',
      requiredSkills: ['Environmental Science', 'GIS', 'Data Analysis', 'Field Research'],
      benefits: [
        'Field research opportunities',
        'Laboratory experience',
        'Sustainability project involvement',
        'Environmental networking',
        'Published research potential'
      ],
      imageUrl: '/images/mathurin-napoly-matnapo-5K5gyPvKC80-unsplash.jpg',
      applicationDeadline: '2025-04-25',
      startDate: 'May 2025',
      isPaid: true,
      isFeatured: false,
      positions: 2,
      applicationLink: 'https://greenearth.hu/apply'
    },
    {
      id: 'internship-10',
      title: 'Healthcare Internship',
      company: 'Central Medical Center',
      description: 'Gain experience in healthcare administration, patient services, and clinical support. Ideal for pre-med and healthcare management students.',
      location: 'Budapest',
      duration: '4-6 months',
      salary: '€500-750/month',
      industry: 'Healthcare',
      requiredSkills: ['Patient Care', 'Medical Knowledge', 'Compassion', 'Communication'],
      benefits: [
        'Clinical exposure',
        'Medical certification training',
        'Healthcare networking',
        'Patient interaction experience',
        'Reference for medical school'
      ],
      imageUrl: '/images/taiki-ishikawa-A3nnN7AYnjM-unsplash.jpg',
      applicationDeadline: '2025-05-30',
      startDate: 'July 2025',
      isPaid: true,
      isFeatured: false,
      positions: 3,
      applicationLink: 'https://medicalcenter.hu/careers'
    },
    {
      id: 'internship-11',
      title: 'Supply Chain & Logistics Internship',
      company: 'LogisticsPro Networks',
      description: 'Manage logistics operations, analyze supply chains, and optimize distribution networks. Great for operations and supply chain management students.',
      location: 'Budapest / Debrecen',
      duration: '4-6 months',
      salary: '€700-1000/month',
      industry: 'Logistics',
      requiredSkills: ['Supply Chain Basics', 'Excel', 'Analytical Thinking', 'Attention to Detail'],
      benefits: [
        'Supply chain visibility',
        'Operations management exposure',
        'Industry-standard software training',
        'Networking with suppliers',
        'Career advancement potential'
      ],
      imageUrl: '/images/piron-guillaume-y5hQCIn1c6o-unsplash.jpg',
      applicationDeadline: '2025-05-12',
      startDate: 'June 2025',
      isPaid: true,
      isFeatured: false,
      positions: 2,
      applicationLink: 'https://logisticspro.hu/internships'
    },
    {
      id: 'internship-12',
      title: 'Cybersecurity Internship',
      company: 'SecureNet Solutions',
      description: 'Work on cybersecurity projects, penetration testing, and security audits. Perfect for IT and cybersecurity students interested in digital defense.',
      location: 'Budapest / Remote',
      duration: '3-6 months',
      salary: '€950-1400/month',
      industry: 'Technology',
      requiredSkills: ['Network Security', 'Python', 'Linux', 'Cryptography Basics'],
      benefits: [
        'Security certifications sponsored',
        'Real-world threat exposure',
        'Mentorship from security experts',
        'Bug bounty opportunities',
        'Full-time opportunities'
      ],
      imageUrl: '/images/mathurin-napoly-matnapo-mbyWF9rYahI-unsplash.jpg',
      applicationDeadline: '2025-04-10',
      startDate: 'May 2025',
      isPaid: true,
      isFeatured: false,
      positions: 2,
      applicationLink: 'https://securenet.hu/careers'
    },
    {
      id: 'internship-13',
      title: 'Graphic Design Internship',
      company: 'CreativeStudio Hungary',
      description: 'Create visual content, design marketing materials, and work on branding projects. Perfect for graphic design and multimedia students.',
      location: 'Budapest',
      duration: '3-5 months',
      salary: '€600-900/month',
      industry: 'Design',
      requiredSkills: ['Adobe Creative Suite', 'Design Theory', 'Typography', 'Creativity'],
      benefits: [
        'Portfolio building',
        'Adobe software training',
        'Client project exposure',
        'Design mentorship',
        'Creative community networking'
      ],
      imageUrl: '/images/saw-wunna-I0IZK4b1CQU-unsplash.jpg',
      applicationDeadline: '2025-05-08',
      startDate: 'June 2025',
      isPaid: true,
      isFeatured: false,
      positions: 3,
      applicationLink: 'https://creativestudio.hu/apply'
    },
    {
      id: 'internship-14',
      title: 'Pharmaceutical Research Internship',
      company: 'PharmaTech Laboratories',
      description: 'Assist with drug development, clinical trials, and pharmaceutical research. Excellent for pharmacy and biochemistry students.',
      location: 'Szeged',
      duration: '4-6 months',
      salary: '€750-1100/month',
      industry: 'Pharmaceutical',
      requiredSkills: ['Chemistry', 'Laboratory Techniques', 'Research Methods', 'Scientific Writing'],
      benefits: [
        'Lab experience',
        'Research publication potential',
        'Pharmaceutical industry exposure',
        'Specialized equipment training',
        'Career mentorship'
      ],
      imageUrl: '/images/pharmaceutical-research.jpg',
      applicationDeadline: '2025-05-25',
      startDate: 'July 2025',
      isPaid: true,
      isFeatured: false,
      positions: 2,
      applicationLink: 'https://pharmatech.hu/careers'
    },
    {
      id: 'internship-15',
      title: 'Manufacturing & Quality Assurance Internship',
      company: 'PrecisionManufacturing Ltd',
      description: 'Work on manufacturing processes, quality control, and process improvement. Great for industrial and mechanical engineering students.',
      location: 'Debrecen',
      duration: '4-6 months',
      salary: '€700-1000/month',
      industry: 'Manufacturing',
      requiredSkills: ['Quality Control', 'Process Analysis', 'Six Sigma Basics', 'Attention to Detail'],
      benefits: [
        'Manufacturing floor experience',
        'Quality certifications',
        'Process improvement projects',
        'Industry machinery training',
        'Full-time employment potential'
      ],
      imageUrl: '/images/campaign-creators-qCi_MzVODoU-unsplash.jpg',
      applicationDeadline: '2025-05-18',
      startDate: 'June 2025',
      isPaid: true,
      isFeatured: false,
      positions: 2,
      applicationLink: 'https://precisionmfg.hu/internships'
    },
    {
      id: 'internship-16',
      title: 'Government & Policy Internship',
      company: 'Ministry of Education',
      description: 'Support government initiatives, policy research, and regulatory affairs. Perfect for public administration and political science students.',
      location: 'Budapest',
      duration: '3-6 months',
      salary: '€600-850/month',
      industry: 'Government',
      requiredSkills: ['Research', 'Writing', 'Policy Analysis', 'Attention to Detail'],
      benefits: [
        'Government experience',
        'Policy-making exposure',
        'Government network building',
        'Public service orientation',
        'Career in public sector'
      ],
      imageUrl: '/images/anastassia-anufrieva--JUlfa5fAIg-unsplash.jpg',
      applicationDeadline: '2025-05-22',
      startDate: 'July 2025',
      isPaid: true,
      isFeatured: false,
      positions: 1,
      applicationLink: 'https://gov.hu/careers'
    },
    {
      id: 'internship-17',
      title: 'NGO & Social Development Internship',
      company: 'Global Impact Foundation',
      description: 'Work on social impact projects, community development, and humanitarian initiatives. Perfect for social work and development students.',
      location: 'Budapest',
      duration: '3-5 months',
      salary: '€400-650/month',
      industry: 'Non-Profit',
      requiredSkills: ['Community Engagement', 'Grant Writing', 'Project Management', 'Empathy'],
      benefits: [
        'Social impact experience',
        'Community networking',
        'Project management skills',
        'Humanitarian work exposure',
        'References for further NGO work'
      ],
      imageUrl: '/images/annie-spratt-MChSQHxGZrQ-unsplash.jpg',
      applicationDeadline: '2025-05-28',
      startDate: 'July 2025',
      isPaid: false,
      isFeatured: false,
      positions: 2,
      applicationLink: 'https://globalimpact.hu/volunteer'
    }
  ];

  const industries = ['all', ...new Set(internships.map(i => i.industry))];

  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      const matchesSearch = 
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesIndustry = selectedIndustry === 'all' || internship.industry === selectedIndustry;

      return matchesSearch && matchesIndustry;
    });
  }, [searchQuery, selectedIndustry]);

  const toggleSave = (id: string) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const featuredInternships = internships.filter(i => i.isFeatured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header with proper padding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-20 pb-8 md:pt-24 md:pb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mb-4 tracking-tight">
            Internship Opportunities
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-2">
            Gain valuable professional experience with leading companies across Hungary and international locations
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            {filteredInternships.length} positions available • {internships.reduce((a, i) => a + (i.positions || 1), 0)}+ total openings for scholarship holders
          </p>
        </motion.div>

        {/* Featured Internships */}
        {featuredInternships.length > 0 && (
          <div className="mb-12 py-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white mb-6 flex items-center gap-2">
              <Zap size={32} className="text-amber-500" />
              Featured Opportunities
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredInternships.map((internship, idx) => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => {
                    setSelectedInternship?.(internship);
                    onNavigate?.('INTERNSHIP_DETAIL');
                  }}
                  className="group cursor-pointer bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-600">
                    <img
                      src={internship.imageUrl}
                      alt={internship.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      {internship.isPaid && (
                        <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                          PAID
                        </span>
                      )}
                      {internship.positions && internship.positions > 1 && (
                        <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                          {internship.positions} SPOTS
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide mb-2">
                      {internship.industry}
                    </p>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                      {internship.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                      {internship.company}
                    </p>

                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                        {internship.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                        {internship.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        {internship.salary}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-colors"
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(internship.id);
                        }}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          savedIds.includes(internship.id)
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                      >
                        <Bookmark size={18} fill={savedIds.includes(internship.id) ? 'currentColor' : 'none'} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, company, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Industry Filter */}
          <div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white hover:border-indigo-500 transition-colors md:hidden"
            >
              <Filter size={18} />
              Filters
            </button>

            <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
              <div className="flex flex-wrap gap-2 md:gap-3 p-4 md:p-0 bg-white dark:bg-slate-800 md:bg-transparent rounded-lg border border-slate-200 dark:border-slate-700 md:border-0">
                {industries.map((industry) => (
                  <motion.button
                    key={industry}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                      selectedIndustry === industry
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {industry === 'all' ? 'All Industries' : industry}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship, idx) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => {
                setSelectedInternship?.(internship);
                onNavigate?.('INTERNSHIP_DETAIL');
              }}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img
                  src={internship.imageUrl}
                  alt={internship.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                    {internship.industry}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(internship.id);
                    }}
                    className="text-amber-500 hover:scale-110 transition-transform"
                  >
                    <Bookmark
                      size={18}
                      fill={savedIds.includes(internship.id) ? 'currentColor' : 'none'}
                    />
                  </motion.button>
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {internship.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  {internship.company}
                </p>

                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="flex-shrink-0" />
                    {internship.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="flex-shrink-0" />
                    {internship.salary}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedInternship?.(internship);
                    onNavigate?.('INTERNSHIP_DETAIL');
                  }}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  View Details
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-16">
            <Briefcase size={48} className="mx-auto mb-4 text-slate-400" />
            <p className="text-slate-600 dark:text-slate-300 font-semibold">
              No internships found matching your criteria
            </p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-6 py-12 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black mb-2">{internships.length}+</p>
            <p className="text-sm md:text-base opacity-90">Total Internships</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black mb-2">{industries.length - 1}</p>
            <p className="text-sm md:text-base opacity-90">Industries</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black mb-2">€400-1500</p>
            <p className="text-sm md:text-base opacity-90">Salary Range</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black mb-2">3-6mo</p>
            <p className="text-sm md:text-base opacity-90">Typical Duration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipOpportunities;
