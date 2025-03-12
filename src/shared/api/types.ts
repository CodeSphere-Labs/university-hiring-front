export type Role = 'ADMIN' | 'STAFF' | 'STUDENT'

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

interface Invitation {
  id: number
  email: string
  token: string
  role: Role
  organization: Organization
  organizationId: number

  groupId: number | null
  group: Group | null

  used: boolean
  expiresAt: string

  createdAt: string
  updatedAt: string
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

interface Project {
  name: string
  githubUrl: string
  description: string
  websiteUrl: string
  technologies: string[]
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

interface Group {
  id: number
  name: string

  createdAt: string
  updatedAt: string
}

interface Organization {
  id: number
  name: string
  type: OrganizationType
  email: string
  logoUrl: string | null
  websiteUrl: string
  about: string

  users?: User[]
  invitations?: Invitation[]
  favoriteStudents?: User[]
  opportunities?: Opportunity[]

  createdAt: string
  updatedAt: string
}
