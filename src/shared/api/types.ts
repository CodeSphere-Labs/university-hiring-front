type Role = 'ADMIN' | 'STAFF' | 'STUDENT'
interface Organization {}
interface StudentProfile {}

export interface AuthDto {
  email: string
  password: string
}

export interface User {
  id: number

  email: string
  firstName: string
  lastName: string
  patronymic: string

  avatar: string | null
  aboutMe: string | null
  telegramLink: string | null
  vkLink: string | null

  role: Role
  organization: Organization | null
  studentProfile: StudentProfile | null
}
