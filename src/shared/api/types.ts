import type { FetchError } from 'ofetch'

import { ErrorMessages } from '@/shared/config/errorCodes'

export interface ErrorResponse extends FetchError {
  data?: {
    message: keyof typeof ErrorMessages
  }
  meta: {
    stopErrorPropagation: boolean
    stale: boolean
  }
  params: unknown
}

export type Role = 'ADMIN' | 'STAFF' | 'STUDENT' | 'UNIVERSITY_STAFF'
export type InvitationStatus = 'all' | 'accept' | 'wait' | 'expired'
export type InvitationFilter = 'createdByMe' | 'all'

export enum OrganizationType {
  COMPANY = 'COMPANY',
  UNIVERSITY = 'UNIVERSITY',
}

export interface User {
  id: number
  firstName: string
  lastName: string
  patronymic: string
  email: string
  avatarUrl: string | null
  aboutMe: string | null
  telegramLink: string | null
  vkLink: string | null

  role: Role
  organization: Organization | null
  organizationId: number | null

  studentProfile: StudentProfile | null
  favoredBy?: Organization[]

  createdAt: string
  updatedAt: string
}

export interface AuthDto {
  email: string
  password: string
}

export interface Project {
  id: string
  name: string
  githubUrl: string
  description: string
  websiteUrl: string
  technologies: string[]
}

export interface Organization {
  id: number
  name: string
  email: string
  logoUrl: string | null
  websiteUrl: string
  about: string
}

export interface Group {
  id: number
  name: string

  createdAt: string
  updatedAt: string
}

export interface InvitationCreate {
  organizationId: number
  groupId?: number
  email: string
  role: Role
}

export interface InvitationsStats {
  label: string
  stats: number
  color: string
  status: InvitationStatus
}

export interface Invitation {
  id: number
  email: string
  role: Role

  organization: Organization
  createdBy: Pick<
    User,
    'id' | 'firstName' | 'lastName' | 'email' | 'role'
  > | null

  used: boolean

  expiresAt: string
  createdAt: string
  updatedAt: string
}

export interface InvintationResponse {
  data: Invitation[]
  meta: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}

export interface InvitationParams {
  filter: InvitationFilter
  status: InvitationStatus
  search?: string
  page?: number
  limit?: number
}

interface StudentProfile {
  id: number
  userId: number
  resume: string | null
  githubLink: string | null
  projects: Project[] | null

  group: Group | null
  skills: string[]

  createdAt: string
  updatedAt: string

  opportunityResponses?: OpportunityResponse[]
}

interface Opportunity {
  id: number
  title: string
  description: string | null
  requiredSkills: string[]
  organizationId: number
  organization: Organization
  responses: OpportunityResponse[]

  createdAt: string
  status: 'active' | 'inactive'
}

interface OpportunityResponse {
  id: number
  studentId: number
  student: StudentProfile
  opportunityId: number
  opportunity: Opportunity
  createdAt: string
  coverLetter: string | null
}
