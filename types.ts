
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
  date: string;
  image: string;
  excerpt: string;
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

export type ViewState = 'HOME' | 'ABOUT' | 'SCHOLARSHIPS' | 'GRANTS' | 'APPLY' | 'FAQ' | 'ADMIN' | 'STORY_DETAIL' | 'RESOURCE_HUB' | 'HOW_IT_WORKS' | 'GRANT_DETAIL' | 'GRANT_APPLICATION';
