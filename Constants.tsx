import { ScholarshipType, FAQItem, StoryContent, ResourcePhase, NewsItem, Testimonial, GrantType } from './types';

export const STORIES: StoryContent[] = [
  {
    id: 'spotlight-1',
    category: 'STEM Innovation',
    title: 'The Quantum Leap',
    subtitle: 'Liam Chen is developing energy-efficient AI architectures at the MIT Media Lab.',
    image: '/images/software-development.jpg',
    content: [
      "Liam's path to MIT was fueled by a relentless drive to solve global energy crises through compute optimization.",
      "As a Beacon Scholar, he received not only full tuition but a $15,000 annual research stipend.",
      "Today, his work is pioneering new frontiers in sustainable artificial intelligence and has been published in leading peer-reviewed journals.",
      "His research has already attracted interest from major tech companies and venture capital firms seeking sustainable AI solutions."
    ],
    author: "Dr. Sarah Jenkins",
    date: "May 12, 2026",
    readTime: "6 min read"
  },
  {
    id: 'spotlight-2',
    category: 'Public Policy',
    title: 'Voice for the Voiceless',
    subtitle: 'Maya Rodriguez is advocating for rural educational equity on Capitol Hill.',
    image: '/images/pharmaceutical-research.jpg',
    content: [
      "Maya grew up in a community where internet access was a luxury. Now, she's drafting the legislation to fix it.",
      "Through the Vanguard Law Grant, she completed her JD at Georgetown debt-free.",
      "She remains a key advisor to our foundation's educational equity board and has successfully lobbied for $50M in federal funding for rural broadband.",
      "Her legislative work has directly impacted over 2 million students in underserved communities."
    ],
    author: "Marcus Thorne",
    date: "May 04, 2026",
    readTime: "8 min read"
  },
  {
    id: 'spotlight-3',
    category: 'Medical Research',
    title: 'Breakthrough in Oncology',
    subtitle: 'Dr. Priya Patel conducted groundbreaking cancer research at Johns Hopkins.',
    image: '/images/grant-research.jpg',
    content: [
      "Priya's research on immunotherapy has shown promising results in early-stage clinical trials.",
      "As a Beacon Scholar, she received comprehensive support for her doctoral research including lab equipment and mentorship.",
      "Her work has been cited over 400 times in leading medical journals and contributed to FDA approval of two new treatment protocols.",
      "She now trains the next generation of oncologists and continues her groundbreaking research at Johns Hopkins Medical Center."
    ],
    author: "Elena Vance",
    date: "May 15, 2026",
    readTime: "7 min read"
  },
  {
    id: 'spotlight-4',
    category: 'Business & Entrepreneurship',
    title: 'From Startup to Scale-up',
    subtitle: 'James Wu scaled his EdTech startup to $10M ARR with Beacon support.',
    image: '/images/vitalik-nqyK3NuwC6E-unsplash.jpg',
    content: [
      "James founded his educational technology platform in his dorm room with a vision to democratize online learning.",
      "Through our entrepreneurship grant program, he received $75,000 in initial funding and access to our network of industry mentors.",
      "Today, his platform serves over 500,000 students globally and has raised Series A funding from top-tier venture capital firms.",
      "He continues to give back by mentoring other Beacon-supported entrepreneurs and funding scholarships for underrepresented students."
    ],
    author: "Marcus Thorne",
    date: "May 22, 2026",
    readTime: "9 min read"
  }
];

export const GALLERY_IMAGES = [
  { url: '/images/leon-wu-LLfRMRT-9AY-unsplash.jpg', title: 'Graduation Excellence', desc: 'Rewarding hard work and academic dedication.' },
  { url: '/images/thisisengineering-TXxiFuQLBKQ-unsplash.jpg', title: 'Collaborative Research', desc: 'Scholars working on peer-reviewed clinical studies.' },
  { url: '/images/mikael-kristenson-3aVlWP-7bg8-unsplash.jpg', title: 'Campus Leadership', desc: 'Future policy makers at our annual summit.' },
  { url: '/images/javier-trueba-iQPr1XkF5F0-unsplash.jpg', title: 'Institutional Heritage', desc: 'Historic libraries where our legacy began.' },
  { url: '/images/kenny-eliason-zFSo6bnZJTw-unsplash.jpg', title: 'STEM Discovery', desc: 'Advanced engineering fellows in the robotics lab.' },
  { url: '/images/joshua-hoehne-iggWDxHTAUQ-unsplash.jpg', title: 'Digital Architecture', desc: 'Software engineering majors building secure systems.' },
  { url: '/images/md-duran-1VqHRwxcCCw-unsplash.jpg', title: 'Lab Precision', desc: 'Chemistry fellows conducting breakthrough experiments.' },
  { url: '/images/linkedin-sales-solutions-NpyF7rjqmq4-unsplash.jpg', title: 'Corporate Sprints', desc: 'Scholars in modern innovation workshops.' }
];

export const SCHOLARSHIPS: ScholarshipType[] = [
  {
    id: 'merit-presidential',
    name: 'Presidential Merit Award',
    amount: '$45,000 / Year',
    eligibility: '2.5+ GPA, Leadership History',
    deadline: 'May 15, 2026',
    category: 'General',
    description: 'Flagship grant for high-achieving undergraduates entering top-tier US institutions.'
  },
  {
    id: 'horizon-stem',
    name: 'Horizon STEM Grant',
    amount: '$32,500 / Year',
    eligibility: 'STEM Major, Underserved Area',
    deadline: 'May 15, 2026',
    category: 'STEM',
    description: 'Bridging the technology gap for students in rural and inner-city educational zones.'
  },
  {
    id: 'nightingale-med',
    name: 'Nightingale Medical Grant',
    amount: '$55,000 / Year',
    eligibility: 'Pre-Med, 2.5+ GPA',
    deadline: 'June 10, 2026',
    category: 'Medical',
    description: 'Institutional support for future medical doctors specializing in research medicine.'
  },
  {
    id: 'vanguard-law',
    name: 'Vanguard Law Scholarship',
    amount: '$40,000 / Year',
    eligibility: 'JD Candidates, Public Interest',
    deadline: 'July 15, 2026',
    category: 'Law',
    description: 'For constitutional law candidates dedicated to public interest and civic advocacy.'
  },
  {
    id: 'curator-arts',
    name: 'Curator Arts Grant',
    amount: '$20,000 / Year',
    eligibility: 'Fine Arts/Digital Media Portfolio',
    deadline: 'August 01, 2026',
    category: 'Arts',
    description: 'Recognizing visual and digital excellence in contemporary creative disciplines.'
  },
  {
    id: 'equity-firstgen',
    name: 'First-Gen Equity Fund',
    amount: '$28,000 / Year',
    eligibility: 'First-Generation College Student',
    deadline: 'Sept 15, 2026',
    category: 'General',
    description: 'Targeted support for those blazing the trail as the first in their family to attend university.'
  },
  {
    id: 'innovation-ai',
    name: 'AI Discovery Fellowship',
    amount: '$35,000 / Year',
    eligibility: 'Computer Science, AI Ethics',
    deadline: 'Oct 15, 2026',
    category: 'STEM',
    description: 'Funding research into ethical artificial intelligence and machine learning architectures.'
  },
  {
    id: 'coastal-transfer',
    name: 'Coastal Transfer Grant',
    amount: '$15,000 / Year',
    eligibility: 'Community College Transfers',
    deadline: 'Oct 15, 2026',
    category: 'General',
    description: 'Seamless financial bridges for high-potential community college transfer students.'
  }
];

export const PHASES: ResourcePhase[] = [
  {
    id: 1,
    title: "Foundation & Legal",
    icon: "🏛️",
    description: "Determining the scholarship model and securing 501(c)(3) status.",
    steps: ["Define Eligibility Logic", "Register Nonprofit Entity", "Obtain EIN & Tax-Exempt Status"],
    detailedContent: "Institutional success begins with legal clarity. Deciding between merit-based and need-based models is the first step toward building a sustainable endowment."
  },
  {
    id: 2,
    title: "Funding & Flow",
    icon: "💰",
    description: "Securing scholarship funding and opening institutional accounts.",
    steps: ["Secure Donor Pledges", "Establish Dedicated Bank Accounts", "Setup Multi-Sig Governance"],
    detailedContent: "Transparency is the currency of trust. Ensure all scholarship funds are secured before public promise."
  },
  {
    id: 3,
    title: "Website Planning",
    icon: "🗺️",
    description: "Defining core pages and the scholar application ecosystem.",
    steps: ["Map User Journey", "Design Application Wireframes", "Plan Secure Database Schema"],
    detailedContent: "Your digital portal is the face of your foundation. It must be professional, accessible, and high-trust."
  },
  {
    id: 4,
    title: "Technical Build",
    icon: "💻",
    description: "Developing the encrypted application and admin review dashboard.",
    steps: ["Frontend/Backend Implementation", "AES-256 Data Encryption", "Deploy to Secure Hosting"],
    detailedContent: "Security is non-negotiable when handling sensitive student records and academic transcripts."
  },
  {
    id: 5,
    title: "Trust & Safety",
    icon: "🛡️",
    description: "Anti-fraud features and transparent selection workflows.",
    steps: ["Define Review Rubrics", "Implement Multi-Round Scoring", "Public Annual Reports"],
    detailedContent: "Build legitimacy through verified board profiles, clear contact info, and absolute transparency in selection."
  },
  {
    id: 6,
    title: "Launch & Growth",
    icon: "🚀",
    description: "Going live and promoting to US partner schools.",
    steps: ["Final Mobile Testing", "Social Media Rollout", "Partner School Integration"],
    detailedContent: "The mission comes alive at launch. Focus on school-based outreach and educational blog partnerships."
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Is there an application fee?",
    answer: "Absolutely not. Beacon is a 501(c)(3) nonprofit foundation; we never charge students to apply for awards. All costs are covered by our endowment."
  },
  {
    question: "Do you support international students?",
    answer: "Currently, our primary grants are for U.S. citizens or permanent residents attending accredited U.S. universities. However, we do offer limited Fulbright support for international graduate students studying in the United States."
  },
  {
    question: "What is the application timeline?",
    answer: "Applications are accepted year-round for most scholarships. Grants have specific deadlines listed in the grant details. We recommend applying at least 2-3 months before your intended enrollment date."
  },
  {
    question: "How long does the selection process take?",
    answer: "The selection process typically takes 4-8 weeks from application submission. You'll receive email updates throughout the process. Selected scholars are notified within 10 business days of final board approval."
  },
  {
    question: "Can I apply for multiple grants at once?",
    answer: "Yes! You can apply for multiple funding opportunities that match your profile. Many scholars receive support from both scholarship and grant programs. There's no limit to applications."
  },
  {
    question: "What GPA do I need to qualify?",
    answer: "Minimum GPA requirements vary by program. Most scholarships require 2.5+, while some business and social impact grants consider holistic factors beyond GPA. Check individual program requirements for details."
  },
  {
    question: "How much funding can I receive?",
    answer: "Awards range from $5,000 to $500,000+ depending on the program. Scholarships typically cover $15,000-$55,000 annually. Grants for nonprofits and research can reach $100,000-$500,000+."
  },
  {
    question: "Are there restrictions on how I use the funds?",
    answer: "Most of our funding can be used for tuition, books, research equipment, and living expenses. Some grants have specific restrictions - e.g., research grants must fund research activities. Details are provided in award letters."
  },
  {
    question: "How does the blind selection process work?",
    answer: "Our board evaluates applications using a rigorous blind review process where names and identifying information are removed. Decisions are based solely on merit, academic potential, and alignment with our mission."
  },
  {
    question: "Do you provide mentorship alongside funding?",
    answer: "Yes! All Beacon scholars receive access to our comprehensive mentorship program connecting them with industry leaders, academics, and successful alumni for guidance and career development."
  },
  {
    question: "What if my circumstances change after I receive funding?",
    answer: "Life happens. Contact our Scholar Development team if circumstances change. We work with you to adjust support or modify award conditions rather than withdraw funding due to unforeseen hardships."
  },
  {
    question: "How is the Beacon Foundation funded?",
    answer: "Our $366M endowment comes from individual donors, corporate partnerships, and philanthropic grants. Annual returns from the endowment fund all our grant and scholarship distributions."
  },
  {
    question: "Can I reapply if I'm not selected?",
    answer: "Absolutely. You can reapply in future cycles. We encourage applicants to strengthen their profile and reapply. Many of our scholars were selected on their second or third application."
  },
  {
    question: "Do you accept applications from community college students?",
    answer: "Yes! We have specific transfer grants for community college students transitioning to four-year institutions. Community college GPA is evaluated with the same rigor as university GPA."
  },
  {
    question: "How do I prove my citizenship status?",
    answer: "Submit copies of your birth certificate, passport, naturalization certificate, or green card. All documents are securely encrypted and used solely for verification purposes."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: "The Beacon Foundation didn't just pay for my degree; they gave me a belief in my own potential. Their mentorship program changed my trajectory.",
    author: "Sarah Lopez",
    institution: "Stanford University",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 'test-2',
    quote: "Being a Beacon Scholar means being part of a legacy of excellence and community service. I've made lifelong connections.",
    author: "David Kim",
    institution: "Harvard Medical School",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 'test-3',
    quote: "The application process was straightforward and transparent. The support I received went far beyond financial aid.",
    author: "Aisha Johnson",
    institution: "MIT",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 'test-4',
    quote: "Beacon's grant helped me launch my nonprofit. Without them, thousands of students wouldn't have access to coding education.",
    author: "Carlos Martinez",
    institution: "UC Berkeley",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 'test-5',
    quote: "The peer network alone is invaluable. I've collaborated with brilliant minds from across the country on groundbreaking research.",
    author: "Zara Patel",
    institution: "Johns Hopkins",
    image: "https://images.unsplash.com/photo-1534528741775-253b8c3d5313?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 'test-6',
    quote: "As a first-generation student, I felt seen and supported. Beacon truly invests in transforming lives.",
    author: "Emma Thompson",
    institution: "Yale University",
    image: "https://images.unsplash.com/photo-1507527004321-7a2b5f8a2d5d?auto=format&fit=crop&q=80&w=400"
  }
];

export const TEAM = [
  { 
    name: "Dr. Sarah Jenkins", 
    role: "President of the Board", 
    linkedin: "https://linkedin.com",
    bio: "Former Dean of Admissions at Stanford with 25 years of experience in educational philanthropy. Led the institutional fundraising efforts that grew the endowment to $366M.",
    img: "/images/jonas-kakaroto-mjRwhvqEC0U-unsplash.jpg" 
  },
  { 
    name: "Marcus Thorne", 
    role: "Endowment Strategy & Finance", 
    linkedin: "https://linkedin.com",
    bio: "Ex-institutional analyst specializing in long-term non-profit growth and capital preservation. Manages $366M endowment with award-winning returns exceeding market benchmarks.",
    img: "/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.jpg" 
  },
  { 
    name: "Elena Vance", 
    role: "Technology & Data Security Lead", 
    linkedin: "https://linkedin.com",
    bio: "Pioneer in secure data systems and student privacy. Elena ensures our digital portal exceeds federal FERPA standards and implements AES-256 encryption for all applicant records.",
    img: "/images/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg" 
  },
  {
    name: "Dr. James Chen",
    role: "Chief Selection Officer",
    linkedin: "https://linkedin.com",
    bio: "Former Harvard admissions director with expertise in holistic evaluation. James leads our blind selection process ensuring unbiased, merit-based decisions across all applications.",
    img: "/images/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg"
  },
  {
    name: "Priya Desai",
    role: "Scholar Development & Mentorship",
    linkedin: "https://linkedin.com",
    bio: "PhD in Educational Psychology. Oversees comprehensive mentorship programs connecting Beacon scholars with industry leaders and academic advisors for long-term success.",
    img: "/images/rut-miit-3EMw3T-ZjkE-unsplash.jpg"
  },
  {
    name: "Michael Thompson",
    role: "Partnership & Institutional Relations",
    linkedin: "https://linkedin.com",
    bio: "20+ years building relationships with universities and corporations. Michael maintains partnerships with 200+ institutions ensuring seamless scholar integration and funding accessibility.",
    img: "/images/javier-trueba-iQPr1XkF5F0-unsplash.jpg"
  },
  {
    name: "Lisa Washington",
    role: "Grants & Compliance Officer",
    linkedin: "https://linkedin.com",
    bio: "Former IRS nonprofit compliance specialist. Ensures all grant distributions meet 501(c)(3) requirements and maintains transparent annual impact reports.",
    img: "/images/christian-buehner-DItYlc26zVI-unsplash.jpg"
  },
  {
    name: "Dr. Anil Kapoor",
    role: "Research Excellence Director",
    linkedin: "https://linkedin.com",
    bio: "Published researcher with 100+ peer-reviewed papers. Guides STEM scholars through research methodology and publication processes for maximum academic impact.",
    img: "/images/joshua-hoehne-iggWDxHTAUQ-unsplash.jpg"
  }
];

// GRANTS DATA
export const GRANTS: GrantType[] = [
  {
    id: 'grant-1',
    name: 'National Science Foundation Graduate Research Fellowship',
    amount: '$50,000 - $150,000/year',
    minAmount: 50000,
    maxAmount: 150000,
    organization: 'National Science Foundation',
    eligibility: ['U.S. Citizens', 'Permanent Residents', 'STEM Field'],
    citizenship: 'U.S. Citizen or Permanent Resident',
    ageRequirement: 'No age limit',
    deadline: '2026-06-15',
    description: 'The NSF GRFP is one of America\'s most competitive fellowship programs. It supports outstanding STEM graduate students who are pursuing research-based master\'s and doctoral degrees. The fellowship recognizes and supports early-career scientists and engineers.',
    category: 'Research',
    requiredDocuments: ['Application Form', 'Transcript', 'GRE Scores', 'Research Statement', 'CV', 'Letters of Recommendation'],
    howToApply: 'Submit through FastLane portal with official GRE scores and academic transcripts. Applications require research statement outlining academic goals and proposed research.',
    applicationLink: 'https://www.nsfgrfp.org',
    status: 'Open',
    verified: true,
    image: '/images/jakub-zerdzicki-uZqmXxRLHmQ-unsplash.jpg',
    additionalDetails: {
      fundingPeriod: '3 years of support',
      annualStipend: '$37,000 annual stipend',
      tuitionCoverage: 'Full tuition coverage at partner institutions',
      areaOfFocus: 'STEM: Engineering, Computer Science, Biology, Chemistry, Physics, Mathematics',
      selectionCriteria: 'Intellectual merit, broader impacts, research potential, academic excellence',
      reportingFrequency: 'Annual progress reports and institutional certifications',
      fundUses: 'Research materials, conference attendance, professional development, tuition and fees',
      mentorshipIncluded: true,
      networkingOpportunities: true,
      publishingRequirements: 'Encouraged to publish research findings in peer-reviewed journals'
    }
  },
  {
    id: 'grant-2',
    name: 'Startup Grants for Women Entrepreneurs',
    amount: '$75,000 - $300,000',
    minAmount: 75000,
    maxAmount: 300000,
    organization: 'Small Business Administration',
    eligibility: ['Women-owned business', 'U.S. Based'],
    citizenship: 'U.S. Citizen',
    deadline: '2026-05-31',
    description: 'Grants designed to help women entrepreneurs start and grow their businesses. Funds can be used for equipment, working capital, and professional development. These grants specifically support women-owned and women-led businesses.',
    category: 'Business',
    requiredDocuments: ['Business Plan', 'Financial Projections', 'Personal Tax Returns', 'Resume', 'Executive Summary'],
    howToApply: 'Apply through SBA partner organizations. Visit sba.gov/grants for approved lenders and submit comprehensive business plan with 3-year financial projections.',
    applicationLink: 'https://www.sba.gov/funding-programs/grants',
    status: 'Open',
    verified: true,
    image: '/images/jakub-zerdzicki-uZqmXxRLHmQ-unsplash.jpg',
    additionalDetails: {
      fundingPeriod: 'One-time grant, ongoing business support',
      annualStipend: '$50,000 - $250,000 depending on business plan',
      businessAge: 'Startup or businesses less than 5 years old',
      areaOfFocus: 'All business sectors: Tech, Retail, Services, Manufacturing, Healthcare',
      selectionCriteria: 'Business viability, market research, owner qualifications, job creation potential',
      fundUses: 'Equipment, inventory, working capital, marketing, technology infrastructure',
      reportingRequirements: 'Semi-annual business reports for first 2 years',
      matchingRequirements: 'Some programs require 20% owner investment or matching funds',
      mentorshipIncluded: true,
      networkingOpportunities: true
    }
  },
  {
    id: 'grant-3',
    name: 'Gates Foundation Global Health Grant',
    amount: '$150,000 - $750,000',
    minAmount: 150000,
    maxAmount: 750000,
    organization: 'Bill & Melinda Gates Foundation',
    eligibility: ['Nonprofit organizations', 'Registered NGOs'],
    citizenship: 'Registered nonprofit',
    deadline: '2026-06-30',
    description: 'Funding for innovative solutions to global health challenges. Focus areas include vaccines, maternal health, and infectious disease prevention. The Gates Foundation partners with organizations making transformative health impact in low-income countries.',
    category: 'Nonprofit',
    requiredDocuments: ['Nonprofit Registration', 'Project Proposal', 'Budget Plan', 'Organizational History', '501(c)(3) Certificate', 'Impact Measurement Plan'],
    howToApply: 'Submit letter of intent through Gates Foundation website with detailed project impact plan, sustainability strategy, and measurable outcome indicators.',
    applicationLink: 'https://www.gatesfoundation.org/about/policies-and-resources/giving-policies',
    status: 'Open',
    verified: true,
    image: '/images/jakub-zerdzicki-cmp1PJBX5cw-unsplash.jpg',
    additionalDetails: {
      fundingPeriod: '3-5 year grants with potential renewal',
      annualStipend: '$100,000 - $500,000+ annually',
      areaOfFocus: 'Global health: Vaccines, Maternal/Child Health, Infectious Disease, Malaria, HIV, TB',
      selectionCriteria: 'Innovation, measurable impact, scalability, organizational capacity, sustainability plan',
      fundUses: 'Research, program implementation, personnel, monitoring and evaluation, capacity building',
      reportingFrequency: 'Quarterly reports, annual comprehensive evaluations',
      reportingRequirements: 'Detailed impact metrics, lives affected, cost-effectiveness analysis, lessons learned',
      matchingRequirements: 'Organizations must demonstrate sustainable funding beyond grant period',
      mentorshipIncluded: true,
      networkingOpportunities: true,
      publishingRequirements: 'Findings shared for global health benefit'
    }
  },
  {
    id: 'grant-4',
    name: 'Fulbright Scholarship for International Graduate Students',
    amount: '$40,000 - $75,000',
    minAmount: 40000,
    maxAmount: 75000,
    organization: 'U.S. Department of State',
    eligibility: ['International students', 'Master\'s or Doctorate'],
    citizenship: 'Non-U.S. citizen',
    ageRequirement: 'Under 35',
    deadline: '2026-07-15',
    description: 'Prestigious grant program offering scholarships to outstanding international graduate students to study in the United States. The Fulbright Program is the premier U.S. exchange program for academic achievement and cultural development.',
    category: 'Student',
    requiredDocuments: ['TOEFL Score', 'Academic Transcripts', 'Statement of Purpose', 'Letter of Recommendation', 'Passport Copy', 'Medical Examination'],
    howToApply: 'Apply through Fulbright commission in your home country. Check fulbright.org for country-specific deadlines and application procedures.',
    applicationLink: 'https://www.fulbright.org',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200',
    additionalDetails: {
      fundingPeriod: '1-2 years depending on degree program',
      annualStipend: '$20,000 - $35,000 annually plus benefits',
      tuitionCoverage: 'Full tuition coverage at U.S. institutions',
      areaOfFocus: 'All academic fields and disciplines',
      selectionCriteria: 'Academic excellence, English proficiency, cross-cultural understanding, leadership potential',
      fundUses: 'Tuition, living expenses, insurance, books and supplies, travel',
      mentorshipIncluded: true,
      networkingOpportunities: true,
      publishingRequirements: 'Encouraged to share research and experiences with home country'
    }
  },
  {
    id: 'grant-5',
    name: 'Environmental Research Grant Program',
    amount: '$50,000 - $200,000',
    minAmount: 50000,
    maxAmount: 200000,
    organization: 'Environmental Protection Agency',
    eligibility: ['Research institutions', 'Universities', 'Nonprofits'],
    citizenship: 'U.S. Based organization',
    deadline: '2026-05-30',
    description: 'Funding for research on environmental protection, climate change, and sustainable development. Supports innovative solutions for environmental challenges. EPA seeks research advancing environmental science and protection.',
    category: 'Research',
    requiredDocuments: ['Research Proposal', 'Budget Narrative', 'Organizational Capacity', 'Qualifications of PIs', 'Environmental Impact Assessment'],
    howToApply: 'Submit through Grants.gov with detailed research methodology, timeline, expected outcomes, and how research advances EPA mission.',
    applicationLink: 'https://www.epa.gov/research/epa-research-grants',
    status: 'Open',
    verified: true,
    image: '/images/jakub-zerdzicki-7k_lRtZm_ds-unsplash.jpg',
    additionalDetails: {
      fundingPeriod: '1-3 years with potential extension',
      annualStipend: '$25,000 - $100,000 depending on scope',
      areaOfFocus: 'Environmental: Climate, Pollution, Sustainability, Waste Management, Water Quality, Air Quality',
      selectionCriteria: 'Scientific merit, environmental significance, feasibility, team qualifications',
      fundUses: 'Research equipment, personnel, travel, publication costs, conference attendance',
      reportingFrequency: 'Semi-annual progress reports',
      reportingRequirements: 'Detailed results, data analysis, potential applications, environmental impact',
      publishingRequirements: 'Results must be published and shared with EPA and public',
      mentorshipIncluded: true,
      networkingOpportunities: true
    }
  },
  {
    id: 'grant-6',
    name: 'Minority Entrepreneurship Development Grant',
    amount: '$30,000 - $100,000',
    minAmount: 30000,
    maxAmount: 100000,
    organization: 'U.S. Chamber of Commerce Foundation',
    eligibility: ['Minority-owned business', 'Less than 3 years old'],
    citizenship: 'U.S. Citizen',
    deadline: '2026-08-15',
    description: 'Supports minority entrepreneurs in starting and scaling their businesses. Includes mentorship and business development resources. Focuses on creating economic opportunities for underrepresented business owners.',
    category: 'Business',
    requiredDocuments: ['Business Plan', 'Ownership Documentation', 'Financial Statements', 'Tax Returns', 'Proof of Minority Status'],
    howToApply: 'Apply through local Small Business Development Centers or chamber of commerce with comprehensive business plan and market analysis.',
    applicationLink: 'https://www.uschamber.com/co/grant-programs',
    status: 'Upcoming',
    verified: true,
    image: '/images/markus-winkler-jF1CqFpE62k-unsplash.jpg',
    additionalDetails: {
      fundingPeriod: 'One-time grant with ongoing support',
      annualStipend: '$10,000 - $50,000',
      businessAge: 'Startups to businesses 3 years old or newer',
      areaOfFocus: 'All business types: Tech, Retail, Manufacturing, Services, Professional Services',
      selectionCriteria: 'Business concept viability, owner experience, community impact, growth potential',
      fundUses: 'Equipment, inventory, working capital, professional services, technology',
      reportingFrequency: 'Annual reports for 2 years',
      reportingRequirements: 'Business metrics, job creation, revenue growth, lessons learned',
      mentorshipIncluded: true,
      networkingOpportunities: true
    }
  },
  {
    id: 'grant-7',
    name: 'NIH Research Training Grant Program',
    amount: '$60,000 - $120,000',
    minAmount: 60000,
    maxAmount: 120000,
    organization: 'National Institutes of Health',
    eligibility: ['Biomedical research', 'PhD or MD candidates'],
    citizenship: 'U.S. Citizen or Permanent Resident',
    ageRequirement: 'No age limit',
    deadline: '2026-05-15',
    description: 'The NIH offers T32 training grants to support predoctoral and postdoctoral training in biomedical sciences. Funds support research training, mentorship, and career development. Supports the next generation of biomedical researchers.',
    category: 'Research',
    requiredDocuments: ['Research Proposal', 'CV', 'Academic Transcripts', 'Letters of Recommendation', 'Mentorship Plan', 'Career Development Statement'],
    howToApply: 'Apply through NIH eRA Commons system. Institutions submit T32 applications with trainee information, research plans, and mentor qualifications.',
    applicationLink: 'https://www.nih.gov/training',
    status: 'Open',
    verified: true,
    image: '/images/alexander-grey-8lnbXtxFGZw-unsplash.jpg',
    additionalDetails: {
      fundingPeriod: '5 years of support',
      annualStipend: '$30,000 - $60,000 annual stipend',
      tuitionCoverage: 'Full tuition and fees coverage',
      areaOfFocus: 'Biomedical Research: Cancer, Immunology, Neuroscience, Genetics, Drug Development',
      selectionCriteria: 'Research merit, trainee potential, mentor qualifications, institutional support',
      reportingFrequency: 'Annual progress reports',
      reportingRequirements: 'Trainee publications, career outcomes, program impact',
      fundUses: 'Stipend, tuition, research supplies, conference travel, professional development',
      mentorshipIncluded: true,
      networkingOpportunities: true,
      publishingRequirements: 'Trainees expected to publish research in peer-reviewed journals'
    }
  },
  {
    id: 'grant-8',
    name: 'Renewable Energy Research Fellowship',
    amount: '$40,000 - $80,000',
    minAmount: 40000,
    maxAmount: 80000,
    organization: 'U.S. Department of Energy',
    eligibility: ['Energy research', 'Graduate students and postdocs'],
    citizenship: 'U.S. Citizen or Permanent Resident',
    ageRequirement: 'No age limit',
    deadline: '2026-05-20',
    description: 'Fellowship supporting cutting-edge research in renewable energy technologies including solar, wind, geothermal, and energy storage. Designed to accelerate innovation in clean energy solutions.',
    category: 'Research',
    requiredDocuments: ['Research Proposal', 'CV', 'Transcripts', 'Research Statement', 'Letters of Recommendation'],
    howToApply: 'Submit through EERE (Energy Efficiency and Renewable Energy) portal with detailed research plan and proposed outcomes.',
    applicationLink: 'https://www.energy.gov/eere/fellowships',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    additionalDetails: {
      fundingPeriod: '3 years',
      annualStipend: '$40,000 - $80,000',
      tuitionCoverage: 'Tuition support available',
      areaOfFocus: 'Solar, Wind, Geothermal, Energy Storage, Grid Technologies',
      selectionCriteria: 'Research merit, innovation potential, career goals aligned with clean energy',
      fundUses: 'Research supplies, conference travel, professional development',
      mentorshipIncluded: true,
      networkingOpportunities: true
    }
  },
  {
    id: 'grant-9',
    name: 'Healthcare Innovation Grant',
    amount: '$50,000 - $200,000',
    minAmount: 50000,
    maxAmount: 200000,
    organization: 'Robert Wood Johnson Foundation',
    eligibility: ['Healthcare professionals', 'Healthcare organizations', 'Nonprofits'],
    citizenship: 'U.S. Based',
    deadline: '2026-06-01',
    description: 'Funding for innovative healthcare projects addressing health equity, access to care, and emerging health challenges. Supports both individual practitioners and organizational initiatives.',
    category: 'Nonprofit',
    requiredDocuments: ['Project Proposal', 'Budget', 'Organizational Background', 'Letters of Support', 'Evaluation Plan'],
    howToApply: 'Submit letter of intent through RWJ Foundation website with project summary and expected impact.',
    applicationLink: 'https://www.rwjf.org/en/how-we-work/grants',
    status: 'Open',
    verified: true,
    image: '/images/jakub-zerdzicki-uZqmXxRLHmQ-unsplash.jpg',
    additionalDetails: {
      fundingPeriod: '2-3 years',
      annualStipend: '$50,000 - $200,000',
      areaOfFocus: 'Health Equity, Access to Care, Mental Health, Prevention, Digital Health',
      selectionCriteria: 'Innovation, evidence-based approach, organizational capacity, sustainability',
      reportingFrequency: 'Annual reports',
      fundUses: 'Personnel, supplies, equipment, evaluation',
      mentorshipIncluded: true,
      networkingOpportunities: true
    }
  },
  {
    id: 'grant-10',
    name: 'Education Technology Innovation Fund',
    amount: '$25,000 - $150,000',
    minAmount: 25000,
    maxAmount: 150000,
    organization: 'Mozilla Foundation',
    eligibility: ['EdTech companies', 'Schools', 'Nonprofits'],
    citizenship: 'Global - U.S. and International',
    deadline: '2026-07-10',
    description: 'Supporting innovative education technology projects that improve learning outcomes and educational access. Focus on open-source and accessible technologies.',
    category: 'Student',
    requiredDocuments: ['Project Proposal', 'Impact Plan', 'Budget', 'Team Background', 'Technical Specifications'],
    howToApply: 'Apply through Mozilla Foundation website with detailed project description and implementation timeline.',
    applicationLink: 'https://www.mozilla.org/en-US/grants/',
    status: 'Open',
    verified: true,
    image: '/images/edwin-andrade-4V1dC_eoCwg-unsplash.jpg',
    additionalDetails: {
      fundingPeriod: '1-2 years',
      annualStipend: '$25,000 - $150,000',
      areaOfFocus: 'EdTech, Open Source, Digital Literacy, Accessibility, Online Learning',
      selectionCriteria: 'Innovation, accessibility focus, potential for scale, team capability',
      reportingFrequency: 'Quarterly updates',
      fundUses: 'Development, personnel, testing, launch',
      mentorshipIncluded: true
    }
  },
  {
    id: 'grant-11',
    name: 'Community Development Grant Program',
    amount: '$30,000 - $250,000',
    minAmount: 30000,
    maxAmount: 250000,
    organization: 'Ford Foundation',
    eligibility: ['Nonprofits', 'Community organizations', 'Social enterprises'],
    citizenship: 'U.S. Based nonprofit',
    deadline: '2026-05-15',
    description: 'Funding for community-driven initiatives addressing poverty, inequality, and social injustice. Supports grassroots organizations making tangible local impact.',
    category: 'Nonprofit',
    requiredDocuments: ['Project Proposal', 'Financials', 'Tax-exempt Status', 'Board Information', 'Community Support Letters'],
    howToApply: 'Submit through Ford Foundation grants portal with detailed community impact plan.',
    applicationLink: 'https://www.fordfoundation.org/work/our-grants/',
    status: 'Open',
    verified: true,
    image: '/images/kenny-eliason-maJDOJSmMoo-unsplash.jpg',
    additionalDetails: {
      fundingPeriod: '2-3 years',
      annualStipend: '$30,000 - $250,000',
      areaOfFocus: 'Community Development, Social Justice, Economic Opportunity, Civic Engagement',
      selectionCriteria: 'Community focus, organizational strength, sustainability plan, local partnerships',
      reportingFrequency: 'Annual reports with impact metrics',
      fundUses: 'Personnel, programming, equipment, capacity building',
      mentorshipIncluded: true,
      networkingOpportunities: true
    }
  },
  {
    id: 'grant-12',
    name: 'Emerging Scholar Postdoctoral Fellowship',
    amount: '$60,000 - $90,000',
    minAmount: 60000,
    maxAmount: 90000,
    organization: 'National Endowment for the Humanities',
    eligibility: ['Recent PhD recipients', 'Postdoctoral researchers'],
    citizenship: 'U.S. Citizen or Permanent Resident',
    deadline: '2026-06-30',
    description: 'Supporting early-career scholars in humanities fields. Provides funding and institutional support for postdoctoral research and teaching.',
    category: 'Research',
    requiredDocuments: ['Research Proposal', 'Curriculum Vitae', 'Three Letters of Reference', 'Publication List', 'Teaching Statement'],
    howToApply: 'Apply through NEH website with detailed research plan and host institution information.',
    applicationLink: 'https://www.neh.gov/grants/research/fellowships',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1200',
    additionalDetails: {
      fundingPeriod: '1-2 years',
      annualStipend: '$60,000 - $90,000',
      areaOfFocus: 'History, Literature, Philosophy, Cultural Studies, Area Studies',
      selectionCriteria: 'Research significance, scholarly contribution, career potential',
      fundUses: 'Stipend, research materials, conference travel, publication costs',
      mentorshipIncluded: true
    }
  },
  {
    id: 'grant-13',
    name: 'Social Impact Venture Fund',
    amount: '$75,000 - $500,000',
    minAmount: 75000,
    maxAmount: 500000,
    organization: 'Skoll Foundation',
    eligibility: ['Social entrepreneurs', 'Social enterprises', 'Impact-driven companies'],
    citizenship: 'Global - International eligible',
    deadline: '2026-08-31',
    description: 'Funding for social entrepreneurs addressing global challenges through innovative business models. Support includes capital, mentorship, and network access.',
    category: 'Business',
    requiredDocuments: ['Business Plan', 'Financial Projections', 'Impact Metrics', 'Team Bios', 'Market Analysis'],
    howToApply: 'Submit application through Skoll Foundation with executive summary and detailed business model.',
    applicationLink: 'https://www.skollfoundation.org/',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200',
    additionalDetails: {
      fundingPeriod: '3-5 years',
      annualStipend: '$75,000 - $500,000',
      areaOfFocus: 'Social Entrepreneurship, Impact Business, Sustainable Development, Global Change',
      selectionCriteria: 'Social impact, business viability, scalability, team quality, market potential',
      mentorshipIncluded: true,
      networkingOpportunities: true,
      fundUses: 'Operations, personnel, growth capital, impact evaluation'
    }
  }
];

export type { GrantType };

// NEWS DATA
export const NEWS_CATEGORIES = ['All', 'Scholarships', 'Success Stories', 'Events', 'Policy', 'Research'];

export const NEWS_ITEMS = [
  {
    id: 'news-1',
    title: 'Record 2,847 Scholars Funded in 2025: Our Biggest Year Yet',
    excerpt: 'The Beacon Foundation surpasses previous records, distributing $56.3 million in scholarships and grants to students and nonprofits across all 50 states.',
    content: [
      {
        heading: 'A Historic Milestone',
        paragraphs: [
          'In 2025, the Beacon Foundation achieved its most ambitious goal yet, funding 2,847 scholars and 156 nonprofit organizations across all 50 states. This landmark year represents a 43% increase from 2024 and reflects our unwavering commitment to expanding educational access and opportunity for deserving students and organizations.',
          'With a total distribution of $56.3 million, we have supported students from diverse backgrounds pursuing education at every level—from undergraduate scholarships to doctoral research grants. This substantial growth demonstrates the increasing need for educational funding and the tremendous impact our donors and partners have made.'
        ]
      },
      {
        heading: 'Breaking Down the Numbers',
        paragraphs: [
          'Our 2025 funding included $32.4 million in direct student scholarships averaging $11,400 per recipient, and $23.9 million distributed to 156 nonprofit organizations focused on educational equity, workforce development, and community enrichment. These grants touched over 850,000 individuals indirectly through partner organizations.',
          'Geographic diversity was a key focus this year, with 28% of funding directed to students in rural communities, 34% to first-generation college students, and 22% to students from families earning less than $50,000 annually. We also increased our support for STEM education, directing $18.7 million (33% of total) to students pursuing degrees in science, technology, engineering, and mathematics.'
        ]
      },
      {
        heading: 'Stories of Impact',
        paragraphs: [
          'Among our 2025 scholars is Maya Rodriguez, a first-generation college student from rural Texas who received a full scholarship to study environmental engineering at UT Austin. With Beacon support, Maya not only completed her degree debt-free but also founded a community organization bringing STEM education to rural schools.',
          'Another standout scholar, James Chen from Detroit, used his Beacon Fellowship to conduct groundbreaking research on sustainable urban agriculture, work that is now being implemented in 12 cities across the Midwest.',
          'These stories represent just a fraction of the life-changing opportunities our funding has enabled. Each scholar brings unique perspectives and tremendous potential to address society\'s greatest challenges.'
        ]
      },
      {
        heading: 'Looking Forward to 2026',
        paragraphs: [
          'As we enter 2026, we\'re setting an even more ambitious target: funding 3,200 scholars with $65 million in total awards. We\'re expanding our programs in emerging fields including renewable energy, public health, social entrepreneurship, and artificial intelligence.',
          'We\'re also launching a new mentorship initiative pairing each scholarship recipient with a professional mentor, and expanding our international opportunities program to support scholars studying abroad.',
          'The support of our donors, partners, and community members makes this growth possible. Together, we are building a future where talent and determination—not financial circumstances—determine educational opportunity.'
        ]
      }
    ] as any,
    image: '/images/annie-spratt-MChSQHxGZrQ-unsplash.jpg',
    category: 'Scholarships',
    date: '2026-01-15',
    author: 'Sarah Jenkins',
    views: 3200
  },
  {
    id: 'news-2',
    title: 'New Presidential Fellowship Opens Applications for STEM Leaders',
    excerpt: 'The Beacon Foundation launches its most competitive fellowship yet, offering $60,000 annually to doctoral students pursuing groundbreaking research in artificial intelligence and clean energy.',
    content: [
      {
        heading: 'Introducing the Presidential Fellowship',
        paragraphs: [
          'Today, we are thrilled to announce the launch of the Beacon Presidential Fellowship, our most prestigious award to date. This fellowship offers $60,000 annually, plus an additional $15,000 research stipend, mentorship from leading academics and industry innovators, and access to a global network of exceptional scholars.',
          'The Presidential Fellowship targets doctoral students conducting cutting-edge research in artificial intelligence, machine learning, clean energy, quantum computing, and biotechnology—fields that will define the next decade of technological advancement and environmental sustainability.'
        ]
      },
      {
        heading: 'Fellowship Details and Requirements',
        paragraphs: [
          'Recipients will receive comprehensive support including full tuition coverage, a monthly stipend of $5,000, research funding up to $15,000 annually, conference travel support, and access to our Innovation Hub—a unique space for fellows to collaborate and advance their research.',
          'To be eligible, applicants must be enrolled in a PhD or equivalent doctoral program at an accredited U.S. institution with a cumulative GPA of 3.7 or higher. International students are welcome to apply. Selection criteria include academic excellence, the significance and originality of proposed research, demonstrated commitment to social impact, and potential for leadership in their field.'
        ]
      },
      {
        heading: 'Why These Fields?',
        paragraphs: [
          'Artificial intelligence and clean energy represent the two most critical frontiers for human progress. AI has the potential to solve problems from disease diagnosis to climate modeling, while clean energy solutions are essential to achieving a sustainable future for our planet.',
          'By investing in exceptional doctoral researchers in these fields, we are not only supporting individual scholars but advancing humanity\'s capacity to address global challenges. Our Presidential Fellows become ambassadors for innovation and agents of positive change in their communities and beyond.',
          'Research shows that doctoral students often make their most impactful discoveries during their PhD years. By removing financial barriers, we enable these brilliant minds to focus entirely on their research and contribute breakthrough innovations that benefit all of society.'
        ]
      },
      {
        heading: 'Application Timeline and Next Steps',
        paragraphs: [
          'Applications are now open and will be accepted through March 31, 2026. Finalists will be selected by May 15, 2026, with announcements made June 1, 2026. Awards will be disbursed beginning in the fall semester of 2026.',
          'Interested applicants should visit our website to complete the application, which includes academic transcripts, a statement of research purpose (1,000 words), letters of recommendation from academic advisors, and contact information for proposed mentors in your field.',
          'We will host virtual information sessions on February 10, February 24, and March 10, 2026. These sessions will feature current Beacon Fellows discussing their experiences and a panel of selection committee members answering questions.'
        ]
      }
    ] as any,
    image: '/images/christer-lassman-hLL43S2DCUI-unsplash.jpg',
    category: 'Scholarships',
    date: '2026-01-10',
    author: 'Marcus Thorne',
    views: 2800
  },
  {
    id: 'news-3',
    title: 'Beacon Scholar Wins Rhodes Scholarship: A Journey of Excellence',
    excerpt: 'Meet Alexandra Chen, a Beacon Scholar from MIT, who was just named a Rhodes Scholar for her groundbreaking work in sustainable energy systems.',
    content: [
      {
        heading: 'An Exceptional Achievement',
        paragraphs: [
          'We are delighted to announce that Alexandra Chen, a Beacon Scholar and MIT doctoral candidate, has been selected as a Rhodes Scholar. This prestigious honor recognizes her exceptional intellectual ability, character, commitment to service, and leadership potential.',
          'Alexandra\'s journey exemplifies the transformative power of educational opportunity. As a Beacon Scholar, she has had the freedom to pursue ambitious research without the financial burden that has constrained so many talented students. Today, she stands at the pinnacle of academic achievement, having earned one of the world\'s most competitive and respected scholarships.'
        ]
      },
      {
        heading: 'Her Path to Excellence',
        paragraphs: [
          'Alexandra grew up in Los Angeles to immigrant parents—her mother a translator, her father a small business owner. Despite their modest means, both parents instilled in her a love of learning and a drive to make a meaningful impact on the world.',
          'In high school, Alexandra excelled academically while working part-time at her father\'s business and volunteering as a tutor in her community. She was accepted to MIT but faced a difficult choice: attend MIT with $20,000 in annual unmet need, or attend a well-funded state school. When she learned about the Beacon Foundation through our partnership with MIT, she knew she could pursue her dream without being crushed by debt.',
          'As a Beacon Scholar, Alexandra has pursued her passion for sustainable energy systems. Her research on next-generation solar panel efficiency has yielded three published papers in leading peer-reviewed journals, including one in the journal Solar Energy Materials and Solar Cells.'
        ]
      },
      {
        heading: 'Groundbreaking Research',
        paragraphs: [
          'Alexandra\'s doctoral research focuses on improving the efficiency of perovskite solar cells—a promising technology that could dramatically reduce the cost of solar energy and accelerate the global transition to renewable power.',
          '"My ultimate goal is to help develop solar technologies that are affordable and accessible worldwide," Alexandra explains. "If we can increase efficiency while reducing costs, solar energy could power much of the world\'s electricity in 20 years instead of 50. That\'s the kind of timeline we need given the climate crisis we face."',
          'Her research has caught the attention of leading energy companies and venture capital firms. Two companies have already expressed interest in licensing her patents, and she has been invited to speak at international renewable energy conferences.'
        ]
      },
      {
        heading: 'Looking Forward',
        paragraphs: [
          'As a Rhodes Scholar, Alexandra will spend two years at Oxford University studying energy policy and economics, further developing her capacity to influence global energy systems. After Oxford, she plans to launch her own sustainable energy venture aimed at bringing affordable solar technology to developing countries.',
          '"I would not be where I am today without the Beacon Foundation," Alexandra reflects. "By removing the financial burden of education, Beacon gave me the freedom to dream big and pursue work that matters. I hope to use my platform to help other talented students from humble beginnings have the same opportunity."',
          'Alexandra\'s success is a testament to the power of educational investment in exceptional talent. It\'s also a reminder of the countless other potential leaders out there—brilliant, driven, and ready to change the world—who just need a chance to pursue their potential.'
        ]
      }
    ] as any,
    image: '/images/claudio-schwarz-cNJttXytzR8-unsplash.jpg',
    category: 'Success Stories',
    date: '2026-01-05',
    author: 'Elena Vance',
    views: 4100
  },
  {
    id: 'news-4',
    title: 'Federal Policy Update: New Education Equity Bill Impacts 2.5 Million Students',
    excerpt: 'The Higher Education Equity Act of 2026 passes Congress with support from Beacon-funded scholars and policy advocates. Major implications for student loan forgiveness and accessibility.',
    content: [
      {
        heading: 'A Major Victory for Education Equity',
        paragraphs: [
          'In a landmark moment for American education, the Higher Education Equity Act of 2026 has passed both chambers of Congress and is expected to be signed into law this week. This comprehensive legislation represents the culmination of three years of advocacy efforts by education advocates, nonprofit organizations, and—significantly—by Beacon-funded scholars.',
          'The bill will directly benefit an estimated 2.5 million students currently burdened by student loan debt, provide $5 billion in new funding for minority-serving institutions, and establish new pathways for students in rural and economically disadvantaged communities to access higher education.'
        ]
      },
      {
        heading: 'Key Provisions of the Act',
        paragraphs: [
          'The Higher Education Equity Act includes several major provisions that will transform American higher education. Student Loan Forgiveness: Borrowers with federal student loans earning less than $65,000 annually will have up to $15,000 forgiven immediately. Income-Driven Repayment creates a new income-driven repayment plan capping monthly payments at 5% of discretionary income. Institutional Funding provides $5 billion in new federal funding for historically Black colleges and universities. Rural Education Initiative invests $2 billion in expanding broadband and educational infrastructure.',
          'These provisions address systemic barriers that have limited educational access for millions of Americans. Together, they represent the most comprehensive education equity legislation passed by Congress in over a decade.'
        ]
      },
      {
        heading: 'The Role of Beacon Scholars',
        paragraphs: [
          'What makes this legislative victory especially meaningful is the role played by Beacon-funded scholars. Over the past three years, Beacon scholars have testified before Congress, met with elected officials, and mobilized their peers to advocate for systemic change.',
          'Maya Rodriguez, a Beacon Scholar from Texas, testified before the Senate Education Committee about her experience with student debt and the transformative impact of scholarship funding. Her testimony was cited by three senators in floor speeches supporting the bill.'
        ]
      },
      {
        heading: 'What\'s Next?',
        paragraphs: [
          'President Biden is expected to sign the Higher Education Equity Act into law by Friday, January 17, 2026. Once enacted, federal agencies will begin implementing the provisions, with student loan forgiveness expected to begin processing in February 2026.',
          'The Beacon Foundation is working with partner institutions to ensure that our scholars and their families are aware of these new benefits. We\'re also planning a national summit in June 2026 bringing together policy makers, advocates, and scholars to discuss implementation and next steps in the ongoing work toward education equity.'
        ]
      }
    ] as any,
    image: '/images/aamy-dugiere-nwQRs44qpg8-unsplash.jpg',
    category: 'Policy',
    date: '2025-12-28',
    author: 'Marcus Thorne',
    views: 3600
  },
  {
    id: 'news-5',
    title: 'Research Breakthrough: Beacon-Funded Scientists Publish in Nature Journal',
    excerpt: 'Three Beacon scholars collaborate on groundbreaking immunotherapy research, with their findings published in Nature Medicine, one of the world\'s most prestigious journals.',
    content: [
      {
        heading: 'A Remarkable Collaborative Achievement',
        paragraphs: [
          'In an unprecedented collaboration, three Beacon-funded doctoral candidates from Johns Hopkins University, Stanford University, and Harvard Medical School have published joint research on novel immunotherapy approaches in Nature Medicine, one of the world\'s most prestigious scientific journals.',
          'The paper, titled "Engineered Chimeric Antigen Receptors with Self-Assembling Nanoparticles: A New Paradigm for Adoptive Cell Therapy," represents a major breakthrough in cancer treatment and could eventually lead to more effective and less toxic treatments for thousands of patients.',
          'The lead researchers—Dr. Priya Patel (Johns Hopkins), Dr. Michael Zhang (Stanford), and Dr. Alicia Thompson (Harvard)—began their collaboration through the Beacon Foundation\'s Research Collaborative Network, which brings together talented scholars pursuing related research questions.'
        ]
      },
      {
        heading: 'Understanding the Research',
        paragraphs: [
          'In simple terms, the researchers have developed a new approach to engineering T-cells—the immune cells responsible for fighting cancer—making them more effective at targeting and destroying cancer cells while minimizing damage to healthy cells.',
          'Traditional CAR-T cell therapies have proven effective against certain blood cancers but have limitations in treating solid tumors like breast, pancreatic, and colorectal cancer. This research addresses those limitations by using self-assembling nanoparticles to deliver genetic instructions more efficiently, reducing the off-target effects that limit current therapies.',
          '"This approach could eventually mean faster treatment timelines, better outcomes, and significantly fewer side effects," explains Dr. Patel, the lead author. "The real impact will be felt by cancer patients who finally have more options and better chances of survival."'
        ]
      },
      {
        heading: 'How Beacon Support Made This Possible',
        paragraphs: [
          'Each of the three lead researchers received a Beacon Doctoral Fellowship covering tuition, stipend, and research costs. Critically, by removing financial stress, these fellowships allowed the researchers to take intellectual risks and pursue ambitious research questions that might not otherwise have been funded.',
          '"Without the Beacon Fellowship, I would have needed to pursue research with more immediate commercial potential to secure funding," Dr. Zhang notes. "This fellowship gave me the freedom to tackle a truly difficult problem that I believed in, not just the problem that was easiest to fund."',
          'The Beacon Foundation also funded the initial collaboration and travel to conferences where the three researchers met and began discussing their overlapping interests.'
        ]
      },
      {
        heading: 'What\'s Next for This Research?',
        paragraphs: [
          'The researchers have filed for a patent on their nanoparticle approach and are currently seeking funding for human clinical trials, which could begin as early as 2027. Several major pharmaceutical companies and venture capital firms have already expressed interest in licensing and developing the technology.',
          'More immediately, the three researchers are training additional graduate students in their methods and working with institutions worldwide to establish clinical trial sites. They\'ve also committed to making their research open-source, allowing other scientists to build on their work.',
          'For the Beacon Foundation, this publication represents the kind of impact we aspire to achieve—exceptional talent, given freedom and resources, creating breakthroughs that benefit humanity. It\'s a reminder that educational investment today becomes life-saving innovation tomorrow.'
        ]
      }
    ] as any,
    image: '/images/ali-shah-lakhani-3wnMz62AobE-unsplash.jpg',
    category: 'Research',
    date: '2025-12-20',
    author: 'Elena Vance',
    views: 2900
  },
  {
    id: 'news-6',
    title: 'Beacon Foundation Partners with 15 New Universities to Expand Access',
    excerpt: 'Strategic expansion announcements bring the Beacon Foundation network to 215+ partner institutions, significantly increasing scholarship availability in rural and underserved communities.',
    content: [
      {
        heading: 'Major Expansion Announcement',
        paragraphs: [
          'The Beacon Foundation is pleased to announce strategic partnerships with 15 additional universities, bringing our total network of partner institutions to 215 colleges and universities across the United States.',
          'This expansion represents a significant commitment to reaching talented students in rural and underserved communities who might otherwise lack access to scholarship information and funding. The new partners include flagship state universities in underserved regions, as well as emerging regional institutions known for serving first-generation and low-income students.'
        ]
      },
      {
        heading: 'The New Partner Institutions',
        paragraphs: [
          'New partners include University of Montana, Appalachian State University, Southern University and A&M College, New Mexico State University, South Dakota State University, and 10 additional institutions primarily serving rural and minority communities.',
          'Each partnership includes funding for a dedicated Beacon coordinator on campus, expanded scholarship allocations, and professional development opportunities for campus staff working with scholarship recipients.',
          '"These partnerships align perfectly with our mission," explains Foundation President Janet Williams. "While we\'re proud of our work with elite institutions, we recognize that exceptional talent exists everywhere in America—including in rural towns, small cities, and underserved communities. This expansion helps us reach more of that talent."'
        ]
      },
      {
        heading: 'Direct Impact on Student Access',
        paragraphs: [
          'Through these partnerships, we expect to increase our scholarship availability by 35%, reaching approximately 1,250 additional students annually. We\'ve specifically allocated increased funding for students in targeted regions where median family income falls below national averages and where scholarship information is less readily available.',
          'Research shows that financial barriers are not the only obstacle to higher education for rural and low-income students. Many lack access to guidance counselors, college preparation resources, and information about available funding. By partnering with these institutions and providing on-campus coordination, we address both the financial and informational barriers to access.'
        ]
      },
      {
        heading: 'Supporting Student Success',
        paragraphs: [
          'Our partnerships go beyond simply providing scholarship funds. Each partnership includes mentorship programs, peer support networks, academic advising support, and professional development opportunities.',
          'We\'ve also launched a new Rural Scholars Initiative, providing additional support for students from rural areas who often face unique challenges including isolation from family, higher rates of food and housing insecurity, and limited cultural and professional networks in their fields of study.',
          'Through this initiative, we provide housing stipends, access to peer mentoring networks (including virtual communities connecting rural scholars across multiple institutions), and funding for students to attend professional conferences and leadership development programs.'
        ]
      },
      {
        heading: 'Looking Ahead',
        paragraphs: [
          'We\'re not stopping here. Our five-year strategic plan calls for partnerships with 250+ institutions, bringing Beacon support to students in every state and territory. We\'re also working with community colleges to establish transfer pathways, recognizing that many students begin their higher education journey at two-year institutions.',
          'This expansion represents a fundamental belief: exceptional talent is equally distributed across America. Our responsibility is to remove the barriers that prevent that talent from flourishing. Through these new partnerships, we\'re doing exactly that.'
        ]
      }
    ] as any,
    image: '/images/anna-keibalo-HydxEO_TH1o-unsplash.jpg',
    category: 'Scholarships',
    date: '2025-12-10',
    author: 'Michael Thompson',
    views: 2200
  }
];

// EVENTS DATA
export const EVENTS = [
  {
    id: 'event-1',
    title: 'Beacon Scholars National Summit 2026',
    description: 'Join 2,000+ scholars for our annual summit featuring keynote speakers, networking sessions, and research showcases. Learn about new opportunities and connect with fellow scholars.',
    date: '2026-06-15',
    time: '8:00 AM - 5:00 PM',
    location: 'Washington, DC Convention Center',
    type: 'Summit',
    attendees: 2150,
    image: '/images/event-collaboration-1.jpg'
  },
  {
    id: 'event-2',
    title: 'STEM Excellence Workshop Series',
    description: 'Three-part workshop series covering research methodology, publication strategies, and career development in STEM fields. Perfect for graduate students and early-career researchers.',
    date: '2026-05-20',
    time: '2:00 PM - 4:00 PM',
    location: 'Virtual',
    type: 'Workshop',
    attendees: 450,
    image: '/images/event-conference-1.jpg'
  },
  {
    id: 'event-3',
    title: 'Scholarship Application Masterclass',
    description: 'Expert guidance on crafting winning scholarship applications. Learn insider tips from former admissions officers and successful Beacon scholars on how to stand out.',
    date: '2026-05-10',
    time: '6:00 PM - 7:30 PM',
    location: 'Virtual',
    type: 'Webinar',
    attendees: 1200,
    image: '/images/md-duran-1VqHRwxcCCw-unsplash.jpg'
  },
  {
    id: 'event-4',
    title: 'Networking Reception: East Coast Scholars',
    description: 'Casual networking event for Beacon scholars in the Northeast region. Connect with peers, mentors, and foundation staff. Light refreshments provided.',
    date: '2026-05-28',
    time: '5:30 PM - 8:00 PM',
    location: 'New York, NY',
    type: 'Networking',
    attendees: 180,
    image: '/images/event-networking-1.jpg'
  },
  {
    id: 'event-5',
    title: 'Entrepreneurship & Innovation Forum',
    description: 'Exclusive forum for Beacon-funded entrepreneurs and aspiring startup founders. Hear from successful founders and learn about our grant opportunities for innovative ventures.',
    date: '2026-05-15',
    time: '10:00 AM - 4:00 PM',
    location: 'San Francisco, CA',
    type: 'Workshop',
    attendees: 320,
    image: '/images/javier-trueba-iQPr1XkF5F0-unsplash.jpg'
  },
  {
    id: 'event-6',
    title: '2026 Beacon Scholars Graduation Ceremony',
    description: 'Celebrate the achievements of our 2026 graduating scholars. Join us for an inspiring ceremony honoring their contributions to academia, research, and society.',
    date: '2026-05-20',
    time: '6:00 PM - 9:00 PM',
    location: 'Washington, DC',
    type: 'Ceremony',
    attendees: 800,
    image: '/images/event-teamwork-1.jpg',
  },
  {
    id: 'event-7',
    title: 'Medical Research Symposium',
    description: 'Annual symposium for Beacon scholars in medical and biomedical research fields. Present research, attend keynote lectures, and discuss career pathways in medicine.',
    date: '2026-06-05',
    time: '9:00 AM - 6:00 PM',
    location: 'Johns Hopkins Medical Center, Baltimore, MD',
    type: 'Summit',
    attendees: 350,
    image: '/images/event-teamwork-1.jpg'
  },
  {
    id: 'event-8',
    title: 'Alumni Success Panel: 10 Years of Impact',
    description: 'Join 6 of our most successful alumni as they share their journeys from scholarship recipients to industry leaders, researchers, and changemakers.',
    date: '2026-07-15',
    time: '7:00 PM - 8:30 PM',
    location: 'Virtual',
    type: 'Webinar',
    attendees: 2300,
    image: '/images/mimi-thian-vdXMSiX-n6M-unsplash.jpg'
  },
  {
    id: 'event-9',
    title: 'Grant Writing Master Class',
    description: 'Learn the secrets to writing compelling grant proposals. Expert grantwriters and foundation program officers share insider tips and review real successful proposals.',
    date: '2026-05-25',
    time: '3:00 PM - 5:00 PM',
    location: 'Virtual',
    type: 'Workshop',
    attendees: 650,
    image: '/images/event-conference-1.jpg'
  },
  {
    id: 'event-10',
    title: 'Leadership Summit for Scholars',
    description: 'Develop leadership skills with interactive sessions, case studies, and networking. Meet fellow leaders and explore opportunities for community impact and innovation.',
    date: '2026-06-22',
    time: '9:00 AM - 4:00 PM',
    location: 'Boston, MA',
    type: 'Summit',
    attendees: 500,
    image: '/images/event-networking-1.jpg',
  },
  {
    id: 'event-11',
    title: 'Tech Innovation Bootcamp',
    description: 'A hands-on bootcamp for scholars interested in tech entrepreneurship, AI/ML, and emerging technologies. Build prototypes, pitch ideas, and connect with tech mentors.',
    date: '2026-07-01',
    time: '10:00 AM - 6:00 PM',
    location: 'Silicon Valley, CA',
    type: 'Workshop',
    attendees: 280,
    image: '/images/pharmaceutical-research.jpg'
  },
  {
    id: 'event-12',
    title: 'Research Presentation Conference',
    description: 'Annual conference where scholars showcase their research across STEM, social sciences, and humanities. Present your work and get feedback from peer reviewers.',
    date: '2026-07-20',
    time: '8:30 AM - 5:30 PM',
    location: 'Chicago, IL',
    type: 'Summit',
    attendees: 750,
    image: '/images/headway-F2KRf_QfCqw-unsplash.jpg'
  },
  {
    id: 'event-13',
    title: 'Nonprofit Leadership Forum',
    description: 'Explore careers in nonprofit and NGO sectors. Network with nonprofit leaders and learn about grant funding, organizational management, and social impact.',
    date: '2026-06-10',
    time: '2:00 PM - 5:00 PM',
    location: 'New York, NY',
    type: 'Networking',
    attendees: 420,
    image: '/images/antenna-ZDN-G1xBWHY-unsplash.jpg'
  }

];

// MEMBER INSTITUTIONS DATA
export const MEMBER_INSTITUTIONS = [
  {
    id: 'inst-1',
    name: 'Stanford University',
    city: 'Stanford',
    state: 'CA',
    region: 'West',
    studentPopulation: 17500,
    graduationRate: 94,
    founded: 1891,
    description: 'Leading research university known for innovation in technology, engineering, and business. Home to 23 Beacon scholars.',
    gradient: 'from-red-500 to-red-700',
    website: 'https://www.stanford.edu'
  },
  {
    id: 'inst-2',
    name: 'Harvard University',
    city: 'Cambridge',
    state: 'MA',
    region: 'Northeast',
    studentPopulation: 23000,
    graduationRate: 97,
    founded: 1636,
    description: 'America\'s oldest institution of higher education with a legacy of producing world leaders. Hosts 31 Beacon scholars.',
    gradient: 'from-red-600 to-red-800',
    website: 'https://www.harvard.edu'
  },
  {
    id: 'inst-3',
    name: 'MIT',
    city: 'Cambridge',
    state: 'MA',
    region: 'Northeast',
    studentPopulation: 11500,
    graduationRate: 96,
    founded: 1861,
    description: 'Premier STEM research institution driving innovation in technology, engineering, and science. Supports 27 Beacon scholars.',
    gradient: 'from-red-500 to-red-700',
    website: 'https://web.mit.edu'
  },
  {
    id: 'inst-4',
    name: 'Princeton University',
    city: 'Princeton',
    state: 'NJ',
    region: 'Northeast',
    studentPopulation: 8000,
    graduationRate: 97,
    founded: 1746,
    description: 'Elite research university with top-tier faculty and rigorous academics. Home to 19 Beacon scholars.',
    gradient: 'from-orange-500 to-orange-700',
    website: 'https://www.princeton.edu'
  },
  {
    id: 'inst-5',
    name: 'UC Berkeley',
    city: 'Berkeley',
    state: 'CA',
    region: 'West',
    studentPopulation: 45000,
    graduationRate: 92,
    founded: 1868,
    description: 'Top public research university with diverse student body and world-class faculty. Supports 34 Beacon scholars.',
    gradient: 'from-blue-600 to-blue-800',
    website: 'https://www.berkeley.edu'
  },
  {
    id: 'inst-6',
    name: 'Yale University',
    city: 'New Haven',
    state: 'CT',
    region: 'Northeast',
    studentPopulation: 15000,
    graduationRate: 96,
    founded: 1701,
    description: 'Prestigious Ivy League institution known for liberal arts education and graduate programs. Hosts 22 Beacon scholars.',
    gradient: 'from-blue-700 to-blue-900',
    website: 'https://www.yale.edu'
  },
  {
    id: 'inst-7',
    name: 'Columbia University',
    city: 'New York',
    state: 'NY',
    region: 'Northeast',
    studentPopulation: 32000,
    graduationRate: 96,
    founded: 1754,
    description: 'Located in Manhattan with strong programs across all disciplines. Home to 28 Beacon scholars.',
    gradient: 'from-blue-600 to-cyan-600',
    website: 'https://www.columbia.edu'
  },
  {
    id: 'inst-8',
    name: 'Johns Hopkins University',
    city: 'Baltimore',
    state: 'MD',
    region: 'Northeast',
    studentPopulation: 30000,
    graduationRate: 93,
    founded: 1876,
    description: 'Leading research institution with exceptional medical and engineering programs. Supports 35 Beacon scholars.',
    gradient: 'from-blue-500 to-blue-700',
    website: 'https://www.jhu.edu'
  },
  {
    id: 'inst-9',
    name: 'Northwestern University',
    city: 'Evanston',
    state: 'IL',
    region: 'Midwest',
    studentPopulation: 20000,
    graduationRate: 94,
    founded: 1851,
    description: 'Private research university with strong engineering, business, and journalism programs. Hosts 24 Beacon scholars.',
    gradient: 'from-purple-500 to-purple-700',
    website: 'https://www.northwestern.edu'
  },
  {
    id: 'inst-10',
    name: 'University of Michigan',
    city: 'Ann Arbor',
    state: 'MI',
    region: 'Midwest',
    studentPopulation: 47000,
    graduationRate: 90,
    founded: 1817,
    description: 'Top public research university with diverse programs and strong alumni network. Supports 29 Beacon scholars.',
    gradient: 'from-yellow-600 to-amber-700',
    website: 'https://umich.edu'
  },
  {
    id: 'inst-11',
    name: 'Duke University',
    city: 'Durham',
    state: 'NC',
    region: 'Southeast',
    studentPopulation: 17000,
    graduationRate: 96,
    founded: 1838,
    description: 'Elite private research university with exceptional medical and engineering schools. Home to 26 Beacon scholars.',
    gradient: 'from-blue-600 to-blue-800',
    website: 'https://www.duke.edu'
  },
  {
    id: 'inst-12',
    name: 'University of Texas at Austin',
    city: 'Austin',
    state: 'TX',
    region: 'Southwest',
    studentPopulation: 52000,
    graduationRate: 88,
    founded: 1883,
    description: 'Flagship state university with strong STEM and business programs. Supports 38 Beacon scholars.',
    gradient: 'from-orange-500 to-yellow-600',
    website: 'https://www.utexas.edu'
  },
  {
    id: 'inst-13',
    name: 'Georgetown University',
    city: 'Washington',
    state: 'DC',
    region: 'Southeast',
    studentPopulation: 18000,
    graduationRate: 93,
    founded: 1789,
    description: 'Leading research university with strong law, business, and international relations programs. Hosts 21 Beacon scholars.',
    gradient: 'from-blue-700 to-blue-900',
    website: 'https://www.georgetown.edu'
  },
  {
    id: 'inst-14',
    name: 'University of Chicago',
    city: 'Chicago',
    state: 'IL',
    region: 'Midwest',
    studentPopulation: 17000,
    graduationRate: 95,
    founded: 1890,
    description: 'Intellectual powerhouse known for rigorous academics and innovative research. Home to 20 Beacon scholars.',
    gradient: 'from-red-600 to-red-800',
    website: 'https://www.uchicago.edu'
  },
  {
    id: 'inst-15',
    name: 'CalTech',
    city: 'Pasadena',
    state: 'CA',
    region: 'West',
    studentPopulation: 1300,
    graduationRate: 93,
    founded: 1891,
    description: 'Small elite research university with world-class STEM programs. Supports 8 Beacon scholars.',
    gradient: 'from-orange-500 to-red-600',
    website: 'https://www.caltech.edu'
  }
];

export const NEWS_CATEGORIES_TYPE = NEWS_CATEGORIES;

// ===== CORPORATE PARTNERS FOR MATCHING GIFTS =====
export const CORPORATE_PARTNERS = [
  {
    id: 'corp-1',
    name: 'Google',
    logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    matchingPercentage: 100,
    maxAnnualMatch: 500000,
    industry: 'Technology'
  },
  {
    id: 'corp-2',
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1200px-Microsoft_logo_%282012%29.svg.png',
    matchingPercentage: 100,
    maxAnnualMatch: 500000,
    industry: 'Technology'
  },
  {
    id: 'corp-3',
    name: 'Johnson & Johnson',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Johnson_%26_Johnson_Logo.svg/1200px-Johnson_%26_Johnson_Logo.svg.png',
    matchingPercentage: 150,
    maxAnnualMatch: 750000,
    industry: 'Healthcare'
  },
  {
    id: 'corp-4',
    name: 'Goldman Sachs',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Goldman_Sachs.svg/1200px-Goldman_Sachs.svg.png',
    matchingPercentage: 200,
    maxAnnualMatch: 1000000,
    industry: 'Finance'
  },
  {
    id: 'corp-5',
    name: 'McKinsey & Company',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/McKinsey_and_Company.svg/1200px-McKinsey_and_Company.svg.png',
    matchingPercentage: 150,
    maxAnnualMatch: 750000,
    industry: 'Consulting'
  },
  {
    id: 'corp-6',
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
    matchingPercentage: 100,
    maxAnnualMatch: 500000,
    industry: 'Technology'
  },
  {
    id: 'corp-7',
    name: 'Pfizer',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pfizer-logo.svg/1200px-Pfizer-logo.svg.png',
    matchingPercentage: 150,
    maxAnnualMatch: 750000,
    industry: 'Pharmaceuticals'
  },
  {
    id: 'corp-8',
    name: 'Deloitte',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Deloitte_Logo.svg/1200px-Deloitte_Logo.svg.png',
    matchingPercentage: 125,
    maxAnnualMatch: 625000,
    industry: 'Consulting'
  },
];

// ===== EXPANDED GRANTS DATABASE (50+ grants) =====
export const EXPANDED_GRANTS = [
  // Federal Grants
  {
    id: 'federal-1',
    name: 'NSF STEM Workforce Development Grant',
    amount: '$500,000 - $2,000,000',
    organization: 'National Science Foundation',
    category: 'Research',
    deadline: 'Feb 15, 2026',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1576091160550-112173f31c77?auto=format&fit=crop&q=80&w=800',
    description: 'Federal funding for STEM education and workforce development programs targeting K-12 and higher education.',
    eligibility: ['Educational Institution', 'Research Organization', 'Nonprofit'],
    requiredDocuments: ['Project Plan', 'Budget Narrative', 'Institutional Commitment', 'Evaluation Plan'],
    howToApply: 'Submit through grants.gov with institutional login',
    applicationLink: 'https://grants.gov'
  },
  {
    id: 'federal-2',
    name: 'NIH Research Grants',
    amount: '$250,000 - $5,000,000',
    organization: 'National Institutes of Health',
    category: 'Research',
    deadline: 'Mar 5, 2026',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1576091160550-112173f31c77?auto=format&fit=crop&q=80&w=800',
    description: 'Support for biomedical and behavioral research projects advancing human health.',
    eligibility: ['Research Institution', 'University', 'Medical Center'],
    requiredDocuments: ['Research Protocol', 'Budget', 'Institutional Review Board Approval', 'Research Team CV'],
    howToApply: 'Submit NIH R01 or R03 application through eRA Commons',
    applicationLink: 'https://nih.gov'
  },
  {
    id: 'federal-3',
    name: 'Department of Education Innovation Grants',
    amount: '$100,000 - $1,500,000',
    organization: 'US Department of Education',
    category: 'Student',
    deadline: 'Apr 1, 2026',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1517999571357-0798696fbf53?auto=format&fit=crop&q=80&w=800',
    description: 'Fund innovative education programs improving student outcomes and access.',
    eligibility: ['School District', 'University', 'Charter School', 'Nonprofit'],
    requiredDocuments: ['Program Description', 'Implementation Plan', 'Evaluation Design', 'Budget'],
    howToApply: 'Submit through Department of Education portal',
    applicationLink: 'https://ed.gov/grants'
  },
  {
    id: 'federal-4',
    name: 'Department of Labor Workforce Development',
    amount: '$250,000 - $2,000,000',
    organization: 'US Department of Labor',
    category: 'Student',
    deadline: 'May 15, 2026',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    description: 'Funding for workforce training and development programs in high-demand fields.',
    eligibility: ['Training Organization', 'Community College', 'Nonprofit'],
    requiredDocuments: ['Training Curriculum', 'Job Placement Plan', 'Budget', 'Labor Market Analysis'],
    howToApply: 'Submit through Department of Labor grants portal',
    applicationLink: 'https://dol.gov/grants'
  },
  
  // Foundation Grants
  {
    id: 'foundation-1',
    name: 'Gates Foundation Education Grants',
    amount: '$500,000 - $10,000,000',
    organization: 'Bill & Melinda Gates Foundation',
    category: 'Student',
    deadline: 'Jun 1, 2026',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1517046220202-51e0e8842e1f?auto=format&fit=crop&q=80&w=800',
    description: 'Support for innovative education initiatives improving college completion and career success.',
    eligibility: ['University', 'School District', 'Nonprofit', 'Education Tech Startup'],
    requiredDocuments: ['Project Summary', 'Theory of Change', 'Budget', 'Letters of Support'],
    howToApply: 'Submit letter of inquiry through Gates Foundation website',
    applicationLink: 'https://gatesfoundation.org'
  },
  {
    id: 'foundation-2',
    name: 'Ford Foundation Civic Innovation Grants',
    amount: '$100,000 - $5,000,000',
    organization: 'Ford Foundation',
    category: 'Nonprofit',
    deadline: 'Jul 15, 2026',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
    description: 'Funding for organizations building just, peaceful, and prosperous communities.',
    eligibility: ['Nonprofit', 'University', 'Community Organization'],
    requiredDocuments: ['Proposal', 'Budget', 'Organizational Background', 'Impact Assessment'],
    howToApply: 'Submit full proposal through Ford Foundation portal',
    applicationLink: 'https://fordfoundation.org'
  },
  {
    id: 'foundation-3',
    name: 'Rockefeller Foundation Climate Solutions',
    amount: '$250,000 - $2,000,000',
    organization: 'Rockefeller Foundation',
    category: 'Research',
    deadline: 'Aug 1, 2026',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1553864802-eac816a15ded?auto=format&fit=crop&q=80&w=800',
    description: 'Funding for climate change mitigation and adaptation solutions.',
    eligibility: ['Research Institution', 'Nonprofit', 'Social Enterprise'],
    requiredDocuments: ['Climate Impact Plan', 'Technology Plan', 'Financial Projections', 'Team Credentials'],
    howToApply: 'Submit proposal through Rockefeller Foundation RFP process',
    applicationLink: 'https://rockefellerfoundation.org'
  },
  {
    id: 'foundation-4',
    name: 'MacArthur Foundation 100&Change',
    amount: '$100,000,000',
    organization: 'MacArthur Foundation',
    category: 'Nonprofit',
    deadline: 'Sep 1, 2026',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
    description: 'Massive funding for organizations with bold solutions to pressing social problems.',
    eligibility: ['Nonprofit', 'Social Enterprise', 'Advocacy Organization'],
    requiredDocuments: ['Problem Statement', 'Solution Description', 'Impact Metrics', 'Financial Plan'],
    howToApply: 'Submit through MacArthur Foundation 100&Change portal',
    applicationLink: 'https://macfound.org'
  },
  {
    id: 'foundation-5',
    name: 'Carnegie Corporation Strengthening US Democracy',
    amount: '$50,000 - $500,000',
    organization: 'Carnegie Corporation',
    category: 'Nonprofit',
    deadline: 'Oct 1, 2026',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    description: 'Support for organizations strengthening democratic institutions and civic engagement.',
    eligibility: ['Nonprofit', 'University', 'Think Tank'],
    requiredDocuments: ['Proposal', 'Budget', 'Organizational History', 'Program Evaluation'],
    howToApply: 'Submit letter of inquiry followed by full proposal',
    applicationLink: 'https://carnegie.org'
  },
  
  // Corporate Grants
  {
    id: 'corporate-1',
    name: 'Google for Nonprofits Tech Grants',
    amount: '$10,000 - $500,000',
    organization: 'Google',
    category: 'Nonprofit',
    deadline: 'Rolling',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1573141152051-a3ab72b0f6a9?auto=format&fit=crop&q=80&w=800',
    description: 'Technology and financial support for nonprofits using Google tools.',
    eligibility: ['Registered Nonprofit', 'Charitable Organization'],
    requiredDocuments: ['501(c)(3) Certificate', 'Organizational Details', 'Technology Needs Assessment'],
    howToApply: 'Apply through Google for Nonprofits dashboard',
    applicationLink: 'https://google.com/nonprofits'
  },
  {
    id: 'corporate-2',
    name: 'Microsoft TEALS Program',
    amount: '$5,000 - $50,000',
    organization: 'Microsoft',
    category: 'Student',
    deadline: 'Rolling',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    description: 'Technology education program connecting students with tech professionals.',
    eligibility: ['High School', 'Underserved Community', 'Code.org Partner'],
    requiredDocuments: ['School Information', 'Student Demographics', 'Teacher Credentials'],
    howToApply: 'Apply through Microsoft TEALS website',
    applicationLink: 'https://microsoft.com/teals'
  },
  {
    id: 'corporate-3',
    name: 'IBM Corporate Giving',
    amount: '$25,000 - $250,000',
    organization: 'IBM',
    category: 'Nonprofit',
    deadline: 'Rolling',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1516534775068-bb57c960e0bb?auto=format&fit=crop&q=80&w=800',
    description: 'Corporate grants supporting education, STEM, and community development.',
    eligibility: ['Nonprofit', 'Educational Institution', 'Community Organization'],
    requiredDocuments: ['Proposal', '501(c)(3) Status', 'Budget', 'Impact Plan'],
    howToApply: 'Submit through IBM Corporate Giving portal',
    applicationLink: 'https://ibm.com/corporate-responsibility'
  },
  {
    id: 'corporate-4',
    name: 'Salesforce Foundation Grants',
    amount: '$10,000 - $100,000',
    organization: 'Salesforce',
    category: 'Nonprofit',
    deadline: 'Rolling',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    description: 'Funding for nonprofits using Salesforce to amplify impact.',
    eligibility: ['Registered Nonprofit', 'Nonprofit Cloud Partner'],
    requiredDocuments: ['501(c)(3) Certificate', 'Salesforce Usage Plan', 'Budget'],
    howToApply: 'Apply through Salesforce Foundation website',
    applicationLink: 'https://salesforce.com/foundation'
  },
  {
    id: 'corporate-5',
    name: 'JPMorgan Chase Community Development Grants',
    amount: '$100,000 - $5,000,000',
    organization: 'JPMorgan Chase',
    category: 'Nonprofit',
    deadline: 'Rolling',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    description: 'Support for community development and economic opportunity initiatives.',
    eligibility: ['Nonprofit', 'Community Development Organization', 'Social Enterprise'],
    requiredDocuments: ['Proposal', 'Budget', '501(c)(3) Status', 'Community Impact Plan'],
    howToApply: 'Submit through JPMorgan Chase Foundation portal',
    applicationLink: 'https://jpmorganchase.com/impact'
  },
];

// ===== APPLICATION TRACKING DATA =====
export const APPLICATION_TRACKING_STATUSES = [
  { id: 'submitted', label: 'Submitted', color: 'bg-blue-500', description: 'Your application has been received' },
  { id: 'reviewing', label: 'Under Review', color: 'bg-yellow-500', description: 'Our team is reviewing your application' },
  { id: 'interview', label: 'Interview Requested', color: 'bg-purple-500', description: 'We would like to schedule an interview' },
  { id: 'finalist', label: 'Finalist', color: 'bg-indigo-500', description: 'You are among our top candidates' },
  { id: 'awarded', label: 'Awarded', color: 'bg-emerald-500', description: 'Congratulations! You have been awarded' },
  { id: 'declined', label: 'Not Selected', color: 'bg-red-500', description: 'We encourage you to reapply next year' },
];

// ===== GRANT DEADLINES CALENDAR DATA =====
export const GRANT_DEADLINES_CALENDAR = [
  { month: 'January', grants: 3, nextDeadline: 'Jan 15, 2026' },
  { month: 'February', grants: 5, nextDeadline: 'Feb 15, 2026' },
  { month: 'March', grants: 4, nextDeadline: 'Mar 5, 2026' },
  { month: 'April', grants: 6, nextDeadline: 'Apr 1, 2026' },
  { month: 'May', grants: 7, nextDeadline: 'May 15, 2026' },
  { month: 'June', grants: 5, nextDeadline: 'Jun 1, 2026' },
  { month: 'July', grants: 4, nextDeadline: 'Jul 15, 2026' },
  { month: 'August', grants: 3, nextDeadline: 'Aug 1, 2026' },
  { month: 'September', grants: 5, nextDeadline: 'Sep 1, 2026' },
  { month: 'October', grants: 6, nextDeadline: 'Oct 1, 2026' },
  { month: 'November', grants: 4, nextDeadline: 'Nov 1, 2026' },
  { month: 'December', grants: 2, nextDeadline: 'Dec 15, 2026' },
];