import type { FetchError } from 'ofetch';

import type { ErrorMessageKey } from '@/shared/config/errorCodes';

export interface ErrorResponse<T extends ErrorMessageKey = ErrorMessageKey> extends FetchError {
  params: unknown;
  data: {
    message?: T;
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
export interface InvitationAcceptParams {
  token: string;
  body: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    patronymic: string;
  };
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
export interface Student extends Omit<User, 'studentProfile'> {
  studentProfile: NonNullable<User['studentProfile']>;
}

export interface Group {
  createdAt: string;
  id: number;
  name: string;
  organization: Organization;
  students: Student[];
  updatedAt: string;
}

export interface GroupResponse {
  data: Group;
  meta: Meta;
}

export interface InvitationCreate {
  email: string;
  groupId?: number;
  organizationId: number;
  role: Role;
}

export interface VacancyCreate {
  description: string;
  skills: string[];
  title: string;
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
  meta: Meta;
}

export interface GroupedSkill {
  group: string;
  items: string[];
}

export interface InvitationParams {
  filter: InvitationFilter;
  limit?: number;
  page?: number;
  search?: string;
  status: InvitationStatus;
}

export interface GroupsParams {
  id?: number;
  limit?: number;
  page?: number;
  search?: string;
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

export interface Opportunity {
  createdAt: string;
  description: string;
  id: number;
  organization: Organization;
  requiredSkills: Skill[];
  respondedUserIds: number[];
  status: 'active' | 'inactive';
  title: string;
}

export interface OpportunityResponse {
  data: Opportunity[];
  meta: Meta;
}

export interface OpportunityParams {
  limit?: number;
  page?: number;
  search?: string;
  withResponses?: boolean;
}

interface Skill {
  category: string;
  description: string;
  id: number;
  name: string;
}

interface Meta {
  limit: number;
  page: number;
  totalItems: number;
  totalPages: number;
}
