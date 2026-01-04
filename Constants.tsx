import { ScholarshipType, FAQItem, StoryContent, ResourcePhase, NewsItem, Testimonial, GrantType } from './types';

export const STORIES: StoryContent[] = [
  {
    id: 'spotlight-1',
    category: 'STEM Innovation',
    title: 'The Quantum Leap',
    subtitle: 'Liam Chen is developing energy-efficient AI architectures at the MIT Media Lab.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    content: [
      "Liam's path to MIT was fueled by a relentless drive to solve global energy crises through compute optimization.",
      "As a Beacon Scholar, he received not only full tuition but a $15,000 annual research stipend.",
      "Today, his work is pioneering new frontiers in sustainable artificial intelligence and has been published in leading peer-reviewed journals.",
      "His research has already attracted interest from major tech companies and venture capital firms seeking sustainable AI solutions."
    ],
    author: "Dr. Sarah Jenkins",
    date: "Jan 12, 2026",
    readTime: "6 min read"
  },
  {
    id: 'spotlight-2',
    category: 'Public Policy',
    title: 'Voice for the Voiceless',
    subtitle: 'Maya Rodriguez is advocating for rural educational equity on Capitol Hill.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200',
    content: [
      "Maya grew up in a community where internet access was a luxury. Now, she's drafting the legislation to fix it.",
      "Through the Vanguard Law Grant, she completed her JD at Georgetown debt-free.",
      "She remains a key advisor to our foundation's educational equity board and has successfully lobbied for $50M in federal funding for rural broadband.",
      "Her legislative work has directly impacted over 2 million students in underserved communities."
    ],
    author: "Marcus Thorne",
    date: "Dec 04, 2024",
    readTime: "8 min read"
  },
  {
    id: 'spotlight-3',
    category: 'Medical Research',
    title: 'Breakthrough in Oncology',
    subtitle: 'Dr. Priya Patel conducted groundbreaking cancer research at Johns Hopkins.',
    image: 'https://images.unsplash.com/photo-1576091160550-112173f31c77?auto=format&fit=crop&q=80&w=1200',
    content: [
      "Priya's research on immunotherapy has shown promising results in early-stage clinical trials.",
      "As a Beacon Scholar, she received comprehensive support for her doctoral research including lab equipment and mentorship.",
      "Her work has been cited over 400 times in leading medical journals and contributed to FDA approval of two new treatment protocols.",
      "She now trains the next generation of oncologists and continues her groundbreaking research at Johns Hopkins Medical Center."
    ],
    author: "Elena Vance",
    date: "Nov 15, 2024",
    readTime: "7 min read"
  },
  {
    id: 'spotlight-4',
    category: 'Business & Entrepreneurship',
    title: 'From Startup to Scale-up',
    subtitle: 'James Wu scaled his EdTech startup to $10M ARR with Beacon support.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    content: [
      "James founded his educational technology platform in his dorm room with a vision to democratize online learning.",
      "Through our entrepreneurship grant program, he received $75,000 in initial funding and access to our network of industry mentors.",
      "Today, his platform serves over 500,000 students globally and has raised Series A funding from top-tier venture capital firms.",
      "He continues to give back by mentoring other Beacon-supported entrepreneurs and funding scholarships for underrepresented students."
    ],
    author: "Marcus Thorne",
    date: "Oct 22, 2024",
    readTime: "9 min read"
  }
];

export const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1523050335456-c6d860cb0d12?auto=format&fit=crop&q=80&w=800', title: 'Graduation Excellence', desc: 'Rewarding hard work and academic dedication.' },
  { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800', title: 'Collaborative Research', desc: 'Scholars working on peer-reviewed clinical studies.' },
  { url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800', title: 'Campus Leadership', desc: 'Future policy makers at our annual summit.' },
  { url: 'https://images.unsplash.com/photo-1498243639359-283813a0c54c?auto=format&fit=crop&q=80&w=800', title: 'Institutional Heritage', desc: 'Historic libraries where our legacy began.' },
  { url: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b671?auto=format&fit=crop&q=80&w=800', title: 'STEM Discovery', desc: 'Advanced engineering fellows in the robotics lab.' },
  { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800', title: 'Digital Architecture', desc: 'Software engineering majors building secure systems.' },
  { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800', title: 'Creative Vision', desc: 'Fine arts students exploring digital media.' },
  { url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800', title: 'University Quad', desc: 'Dynamic student life at our partner campuses.' },
  { url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800', title: 'Focused Study', desc: 'Deep concentration in the graduate archives.' },
  { url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=800', title: 'Global Fellowship', desc: 'International impact through US education.' },
  { url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800', title: 'Lab Precision', desc: 'Chemistry fellows conducting breakthrough experiments.' },
  { url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800', title: 'Peer Review', desc: 'Collaborative analysis of doctoral theses.' },
  { url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800', title: 'Corporate Sprints', desc: 'Scholars in modern innovation workshops.' },
  { url: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&q=80&w=800', title: 'Medical Round', desc: 'Pre-med scholars at partner teaching hospitals.' },
  { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800', title: 'Innovation Hub', desc: 'The future of energy-efficient computing.' },
  { url: 'https://images.unsplash.com/photo-1492538368521-46823b43ae97?auto=format&fit=crop&q=80&w=800', title: 'Discovery Path', desc: 'Every scholar has a unique journey to excellence.' }
];

export const SCHOLARSHIPS: ScholarshipType[] = [
  {
    id: 'merit-presidential',
    name: 'Presidential Merit Award',
    amount: '$45,000 / Year',
    eligibility: '3.90+ GPA, Leadership History',
    deadline: 'April 15, 2026',
    category: 'General',
    description: 'Flagship grant for high-achieving undergraduates entering top-tier US institutions.'
  },
  {
    id: 'horizon-stem',
    name: 'Horizon STEM Grant',
    amount: '$32,500 / Year',
    eligibility: 'STEM Major, Underserved Area',
    deadline: 'May 01, 2026',
    category: 'STEM',
    description: 'Bridging the technology gap for students in rural and inner-city educational zones.'
  },
  {
    id: 'nightingale-med',
    name: 'Nightingale Medical Grant',
    amount: '$55,000 / Year',
    eligibility: 'Pre-Med, 3.85+ GPA',
    deadline: 'June 10, 2026',
    category: 'Medical',
    description: 'Institutional support for future medical doctors specializing in research medicine.'
  },
  {
    id: 'vanguard-law',
    name: 'Vanguard Law Scholarship',
    amount: '$40,000 / Year',
    eligibility: 'JD Candidates, Public Interest',
    deadline: 'July 01, 2026',
    category: 'Law',
    description: 'For constitutional law candidates dedicated to public interest and civic advocacy.'
  },
  {
    id: 'curator-arts',
    name: 'Curator Arts Grant',
    amount: '$20,000 / Year',
    eligibility: 'Fine Arts/Digital Media Portfolio',
    deadline: 'August 15, 2026',
    category: 'Arts',
    description: 'Recognizing visual and digital excellence in contemporary creative disciplines.'
  },
  {
    id: 'equity-firstgen',
    name: 'First-Gen Equity Fund',
    amount: '$28,000 / Year',
    eligibility: 'First-Generation College Student',
    deadline: 'Sept 30, 2026',
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
    deadline: 'Nov 01, 2026',
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
    answer: "Minimum GPA requirements vary by program. Most scholarships require 3.5+, while some business and social impact grants consider holistic factors beyond GPA. Check individual program requirements for details."
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
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400" 
  },
  { 
    name: "Marcus Thorne", 
    role: "Endowment Strategy & Finance", 
    linkedin: "https://linkedin.com",
    bio: "Ex-institutional analyst specializing in long-term non-profit growth and capital preservation. Manages $366M endowment with award-winning returns exceeding market benchmarks.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400" 
  },
  { 
    name: "Elena Vance", 
    role: "Technology & Data Security Lead", 
    linkedin: "https://linkedin.com",
    bio: "Pioneer in secure data systems and student privacy. Elena ensures our digital portal exceeds federal FERPA standards and implements AES-256 encryption for all applicant records.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400" 
  },
  {
    name: "Dr. James Chen",
    role: "Chief Selection Officer",
    linkedin: "https://linkedin.com",
    bio: "Former Harvard admissions director with expertise in holistic evaluation. James leads our blind selection process ensuring unbiased, merit-based decisions across all applications.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Priya Desai",
    role: "Scholar Development & Mentorship",
    linkedin: "https://linkedin.com",
    bio: "PhD in Educational Psychology. Oversees comprehensive mentorship programs connecting Beacon scholars with industry leaders and academic advisors for long-term success.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Michael Thompson",
    role: "Partnership & Institutional Relations",
    linkedin: "https://linkedin.com",
    bio: "20+ years building relationships with universities and corporations. Michael maintains partnerships with 200+ institutions ensuring seamless scholar integration and funding accessibility.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Lisa Washington",
    role: "Grants & Compliance Officer",
    linkedin: "https://linkedin.com",
    bio: "Former IRS nonprofit compliance specialist. Ensures all grant distributions meet 501(c)(3) requirements and maintains transparent annual impact reports.",
    img: "https://images.unsplash.com/photo-1534528741775-253b8c3d5313?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Dr. Anil Kapoor",
    role: "Research Excellence Director",
    linkedin: "https://linkedin.com",
    bio: "Published researcher with 100+ peer-reviewed papers. Guides STEM scholars through research methodology and publication processes for maximum academic impact.",
    img: "https://images.unsplash.com/photo-1507527004321-7a2b5f8a2d5d?auto=format&fit=crop&q=80&w=400&h=400"
  }
];

// GRANTS DATA
export const GRANTS: GrantType[] = [
  {
    id: 'grant-1',
    name: 'National Science Foundation Graduate Research Fellowship',
    amount: '$37,000/year',
    organization: 'National Science Foundation',
    eligibility: ['U.S. Citizens', 'Permanent Residents', 'STEM Field'],
    citizenship: 'U.S. Citizen or Permanent Resident',
    ageRequirement: 'No age limit',
    deadline: '2026-10-15',
    description: 'The NSF GRFP is one of America\'s most competitive fellowship programs. It supports outstanding STEM graduate students who are pursuing research-based master\'s and doctoral degrees. The fellowship recognizes and supports early-career scientists and engineers.',
    category: 'Research',
    requiredDocuments: ['Application Form', 'Transcript', 'GRE Scores', 'Research Statement', 'CV', 'Letters of Recommendation'],
    howToApply: 'Submit through FastLane portal with official GRE scores and academic transcripts. Applications require research statement outlining academic goals and proposed research.',
    applicationLink: 'https://www.nsfgrfp.org',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
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
    amount: '$50,000 - $250,000',
    organization: 'Small Business Administration',
    eligibility: ['Women-owned business', 'U.S. Based'],
    citizenship: 'U.S. Citizen',
    deadline: '2026-09-30',
    description: 'Grants designed to help women entrepreneurs start and grow their businesses. Funds can be used for equipment, working capital, and professional development. These grants specifically support women-owned and women-led businesses.',
    category: 'Business',
    requiredDocuments: ['Business Plan', 'Financial Projections', 'Personal Tax Returns', 'Resume', 'Executive Summary'],
    howToApply: 'Apply through SBA partner organizations. Visit sba.gov/grants for approved lenders and submit comprehensive business plan with 3-year financial projections.',
    applicationLink: 'https://www.sba.gov/funding-programs/grants',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a5?auto=format&fit=crop&q=80&w=1200',
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
    amount: '$100,000 - $500,000',
    organization: 'Bill & Melinda Gates Foundation',
    eligibility: ['Nonprofit organizations', 'Registered NGOs'],
    citizenship: 'Registered nonprofit',
    deadline: '2026-08-15',
    description: 'Funding for innovative solutions to global health challenges. Focus areas include vaccines, maternal health, and infectious disease prevention. The Gates Foundation partners with organizations making transformative health impact in low-income countries.',
    category: 'Nonprofit',
    requiredDocuments: ['Nonprofit Registration', 'Project Proposal', 'Budget Plan', 'Organizational History', '501(c)(3) Certificate', 'Impact Measurement Plan'],
    howToApply: 'Submit letter of intent through Gates Foundation website with detailed project impact plan, sustainability strategy, and measurable outcome indicators.',
    applicationLink: 'https://www.gatesfoundation.org/about/policies-and-resources/giving-policies',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1576091160550-112173f31c77?auto=format&fit=crop&q=80&w=1200',
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
    amount: '$20,000 - $35,000',
    organization: 'U.S. Department of State',
    eligibility: ['International students', 'Master\'s or Doctorate'],
    citizenship: 'Non-U.S. citizen',
    ageRequirement: 'Under 35',
    deadline: '2026-07-31',
    description: 'Prestigious grant program offering scholarships to outstanding international graduate students to study in the United States. The Fulbright Program is the premier U.S. exchange program for academic achievement and cultural development.',
    category: 'Student',
    requiredDocuments: ['TOEFL Score', 'Academic Transcripts', 'Statement of Purpose', 'Letter of Recommendation', 'Passport Copy', 'Medical Examination'],
    howToApply: 'Apply through Fulbright commission in your home country. Check fulbright.org for country-specific deadlines and application procedures.',
    applicationLink: 'https://www.fulbright.org',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1523050335456-c6d860cb0d12?auto=format&fit=crop&q=80&w=1200',
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
    amount: '$25,000 - $100,000',
    organization: 'Environmental Protection Agency',
    eligibility: ['Research institutions', 'Universities', 'Nonprofits'],
    citizenship: 'U.S. Based organization',
    deadline: '2026-06-30',
    description: 'Funding for research on environmental protection, climate change, and sustainable development. Supports innovative solutions for environmental challenges. EPA seeks research advancing environmental science and protection.',
    category: 'Research',
    requiredDocuments: ['Research Proposal', 'Budget Narrative', 'Organizational Capacity', 'Qualifications of PIs', 'Environmental Impact Assessment'],
    howToApply: 'Submit through Grants.gov with detailed research methodology, timeline, expected outcomes, and how research advances EPA mission.',
    applicationLink: 'https://www.epa.gov/research/epa-research-grants',
    status: 'Open',
    verified: true,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
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
    amount: '$10,000 - $50,000',
    organization: 'U.S. Chamber of Commerce Foundation',
    eligibility: ['Minority-owned business', 'Less than 3 years old'],
    citizenship: 'U.S. Citizen',
    deadline: '2026-11-15',
    description: 'Supports minority entrepreneurs in starting and scaling their businesses. Includes mentorship and business development resources. Focuses on creating economic opportunities for underrepresented business owners.',
    category: 'Business',
    requiredDocuments: ['Business Plan', 'Ownership Documentation', 'Financial Statements', 'Tax Returns', 'Proof of Minority Status'],
    howToApply: 'Apply through local Small Business Development Centers or chamber of commerce with comprehensive business plan and market analysis.',
    applicationLink: 'https://www.uschamber.com/co/grant-programs',
    status: 'Upcoming',
    verified: true,
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200',
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
    amount: '$30,000 - $60,000',
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
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1200',
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
  }
];

export type { GrantType };