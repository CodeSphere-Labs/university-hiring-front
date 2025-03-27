import type { FetchError } from 'ofetch';

import type { ErrorMessages } from '@/shared/config/errorCodes';

export interface ErrorResponse extends FetchError {
  params: unknown;
  data?: {
    message: keyof typeof ErrorMessages;
  };
  meta: {
    stopErrorPropagation: boolean;
    stale: boolean;
  };
}

export type Role = 'ADMIN' | 'STAFF' | 'STUDENT' | 'UNIVERSITY_STAFF';
export type InvitationStatus = 'accept' | 'all' | 'expired' | 'wait';
export type InvitationFilter = 'all' | 'createdByMe';

export enum OrganizationType {
  COMPANY = 'COMPANY',
  UNIVERSITY = 'UNIVERSITY'
}

export interface User {
  aboutMe: string | null;
  avatarUrl: string | null;
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  organization: Organization | null;

  patronymic: string;
  role: Role;

  studentProfile: StudentProfile | null;
  telegramLink: string | null;

  updatedAt: string;
  vkLink: string | null;
}

export interface AuthDto {
  email: string;
  password: string;
}

export interface Project {
  description: string;
  githubUrl: string;
  id: string;
  name: string;
  technologies: string[];
  websiteUrl: string;
}

export interface Organization {
  about: string;
  email: string;
  id: number;
  logoUrl: string | null;
  name: string;
  websiteUrl: string;
}

export interface Group {
  createdAt: string;
  id: number;
  name: string;
  organization: Organization;
  updatedAt: string;
  students: (Omit<User, 'studentProfile'> & {
    studentProfile: NonNullable<User['studentProfile']>;
  })[];
}

export interface InvitationCreate {
  email: string;
  groupId?: number;
  organizationId: number;
  role: Role;
}

export interface InvitationsStats {
  color: string;
  label: string;
  stats: number;
  status: InvitationStatus;
}

export interface Invitation {
  createdAt: string;
  createdBy: Pick<User, 'email' | 'firstName' | 'id' | 'lastName' | 'role'> | null;
  email: string;

  expiresAt: string;
  id: number;

  organization: Organization;

  role: Role;
  updatedAt: string;
  used: boolean;
}

export interface InvintationResponse {
  data: Invitation[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface InvitationParams {
  filter: InvitationFilter;
  limit?: number;
  page?: number;
  search?: string;
  status: InvitationStatus;
}

export interface GroupParams {
  search?: string;
  withStudents?: boolean;
}

interface StudentProfile {
  createdAt: string;
  githubLink: string | null;
  group: Group | null;
  id: number;
  opportunityResponses?: OpportunityResponse[];

  projects: Project[] | null;
  resume: string | null;

  skills: string[];
  updatedAt: string;

  userId: number;
}

interface Opportunity {
  createdAt: string;
  description: string | null;
  id: number;
  organization: Organization;
  organizationId: number;
  requiredSkills: string[];
  responses: OpportunityResponse[];

  status: 'active' | 'inactive';
  title: string;
}

interface OpportunityResponse {
  coverLetter: string | null;
  createdAt: string;
  id: number;
  opportunity: Opportunity;
  opportunityId: number;
  student: StudentProfile;
  studentId: number;
}
