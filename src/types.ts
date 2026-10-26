export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  description: string;
}

export interface ProjectFeature {
  title: string;
  desc: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  longDescription?: string;
  highlights?: string[];
  keyFeatures?: ProjectFeature[];
  architecture?: string;
  techStack: string[];
  npmPackage?: string;
  githubUrl?: string;
  demoUrl?: string;
  col1Image1?: string;
  col1Image2?: string;
  col2Image?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  graduationYear: string;
  coursework: string[];
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date?: string;
}

