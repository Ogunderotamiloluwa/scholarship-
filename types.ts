
export enum ApplicationStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  INTERVIEW = 'INTERVIEW',
  AWARDED = 'AWARDED',
  DECLINED = 'DECLINED'
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gpa: number;
  university: string;
  major: string;
  essay: string;
  status: ApplicationStatus;
  submissionDate: string;
  score: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ScholarshipType {
  id: string;
  name: string;
  amount: string;
  eligibility: string;
  deadline: string;
  description: string;
  category: 'STEM' | 'Arts' | 'Law' | 'Medical' | 'General';
}

export interface GrantType {
  id: string;
  name: string;
  amount: string;
  organization: string;
  eligibility: string[];
  citizenship: string;
  ageRequirement?: string;
  deadline: string;
  description: string;
  category: 'Student' | 'Business' | 'Nonprofit' | 'Research' | 'Other';
  requiredDocuments: string[];
  howToApply: string;
  applicationLink: string;
  status: 'Open' | 'Closed' | 'Upcoming';
  verified: boolean;
  image: string;
  additionalDetails?: {
    fundingPeriod?: string;
    annualStipend?: string;
    tuitionCoverage?: string;
    areaOfFocus?: string;
    selectionCriteria?: string;
    businessAge?: string;
    fundUses?: string;
    reportingFrequency?: string;
    reportingRequirements?: string;
    matchingRequirements?: string;
    fundsUseAllowed?: string;
    fundsUseForbidden?: string;
    careerDevelopment?: string;
    mentorshipIncluded?: boolean;
    networkingOpportunities?: boolean;
    publishingRequirements?: string;
  };
}

export interface StoryContent {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  content: string[];
  author?: string;
  date?: string;
  readTime?: string;
}

export interface ResourcePhase {
  id: number;
  title: string;
  description: string;
  steps: string[];
  icon: string;
  detailedContent: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  views?: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'Webinar' | 'Workshop' | 'Summit' | 'Networking' | 'Ceremony';
  attendees: number;
  image: string;
}

export interface MemberInstitution {
  id: string;
  name: string;
  city: string;
  state: string;
  region: string;
  studentPopulation: number;
  graduationRate: number;
  founded: number;
  description: string;
  gradient: string;
  website: string;
}

export interface GalleryImage {
  url: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  institution: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string;
}

export interface Application {
  id: string;
  type: 'Scholarship' | 'Grant' | 'Fellowship';
  programId: string;
  programName: string;
  applicantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  submissionDate: string;
  status: 'submitted' | 'reviewing' | 'interview' | 'finalist' | 'awarded' | 'declined';
  lastUpdated: string;
  score?: number;
  reviewerNotes?: string;
}

export interface CorporateDonor {
  id: string;
  companyName: string;
  ein: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  donationAmount: number;
  donationType: 'One-Time' | 'Monthly' | 'Annual' | 'Matching';
  matchingPercentage?: number;
  taxId: string;
  donationDate: string;
  status: 'pending' | 'verified' | 'completed';
}

export interface CorporatePartner {
  id: string;
  name: string;
  logo: string;
  matchingPercentage: number;
  maxAnnualMatch: number;
  industry: string;
}

export interface GrantDeadline {
  month: string;
  grants: number;
  nextDeadline: string;
}

export type ViewState = 'HOME' | 'ABOUT' | 'SCHOLARSHIPS' | 'GRANTS' | 'APPLY' | 'FAQ' | 'ADMIN' | 'STORY_DETAIL' | 'RESOURCE_HUB' | 'HOW_IT_WORKS' | 'GRANT_DETAIL' | 'GRANT_APPLICATION' | 'NEWS' | 'EVENTS' | 'EVENT_DETAIL' | 'INSTITUTIONS' | 'APPLICATION_TRACKER' | 'DONATE' | 'SUPPORT' | 'SCHOLARSHIP_HUB' | 'COMMUNITY_EVENTS' | 'INTERNSHIP_OPPORTUNITIES' | 'INTERNSHIP_DETAIL';

