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
export type CreatedByFilter = 'all' | 'createdByMe';
export type AssignedToMeFilter = 'all' | 'assignedToMe';
export type OrganizationType = 'company' | 'university';
export type PracticeFilter = AssignedToMeFilter | CreatedByFilter;

export interface InvitationAcceptParams {
  token: string;
  body: {
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

export interface OrganizationParams {
  type?: OrganizationType;
  withFavorites?: boolean;
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

export interface Practice {
  address: string;
  endDate: Date;
  group: Group;
  id: number;
  name: string;
  notes: string;
  organization: Organization;
  startDate: Date;
  students: Student[];
  supervisor: User;
  university: Organization;
}

export interface GroupResponse {
  data: Group;
  meta: Meta;
}

export interface PracticesResponse {
  data: Practice[];
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

export interface PracticeCreate {
  address: string;
  endDate: Date;
  groupId: number;
  name: string;
  notes?: string;
  organizationId: number;
  startDate: Date;
  studentIds: number[];
  supervisorId: number;
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
  filter: CreatedByFilter;
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

export interface PracticesParams {
  filter?: CreatedByFilter;
  limit?: number;
  page?: number;
  search?: string;
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

export interface OpportunitiesResponse {
  data: Opportunity[];
  meta: Meta;
}

export interface OpportunityParams {
  createdByMe?: boolean;
  limit?: number;
  page?: number;
  search?: string;
  withResponses?: boolean;
}

export interface OpportunityResponse extends Omit<Opportunity, 'status'> {
  status: 'ACCEPTED' | 'REJECTED' | 'WAITING';
}

export interface OpportunityResponsesResponse {
  meta: Meta;
  data: {
    id: number;
    coverLetter: string;
    status: OpportunityResponsesFilter;
    student: Student;
  }[];
}

export interface OpportunityResponsesParams {
  filter?: OpportunityResponsesFilter;
  id: number | string;
  limit?: number;
  page?: number;
  search?: string;
}

export type OpportunityResponsesFilter = 'ACCEPTED' | 'REJECTED' | 'WAITING';

interface StudentProfile {
  createdAt: string;
  githubLink: string | null;
  group: Group | null;
  id: number;
  opportunityResponses?: OpportunitiesResponse[];

  projects: Project[] | null;
  resume: string | null;

  skills: string[];
  updatedAt: string;

  userId: number;
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

export interface ChatUser {
  avatarUrl: string | null;
  firstName: string;
  id: number;
  lastName: string;
}

export interface ChatMessage {
  chatId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
  user: ChatUser;
  userId: number;
}
