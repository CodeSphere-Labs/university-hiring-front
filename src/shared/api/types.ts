export type Role = 'ADMIN' | 'STAFF' | 'STUDENT'

export enum OrganizationType {
  COMPANY = 'COMPANY',
  UNIVERSITY = 'UNIVERSITY',
}

export interface Organization {
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

export interface Invitation {
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

export interface StudentProfile {
  id: number
  userId: number
  resume: string | null
  githubLink: string | null
  projects: any | null

  groupId: number | null
  group: Group | null

  createdAt: string
  updatedAt: string

  user: User
  opportunityResponses?: OpportunityResponse[]
}

export interface Opportunity {
  id: number
  title: string
  description: string | null
  requiredSkills: Skill[]
  organizationId: number
  organization: Organization
  responses: OpportunityResponse[]

  createdAt: string
  status: 'active' | 'inactive'
}

export interface OpportunityResponse {
  id: number
  studentId: number
  student: StudentProfile
  opportunityId: number
  opportunity: Opportunity
  createdAt: string
  coverLetter: string | null
}

export interface Skill {
  id: number
  name: string
  category: string
  description: string | null
  opportunities?: Opportunity[]

  createdAt: string
  updatedAt: string
}

export interface Group {
  id: number
  name: string
  students: StudentProfile[]

  createdAt: string
  updatedAt: string

  invitations?: Invitation[]
}

export interface AuthDto {
  email: string
  password: string
}
