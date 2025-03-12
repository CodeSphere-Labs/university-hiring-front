import { combine, createStore, sample } from 'effector'
import { createForm, ValidationEvent } from 'effector-forms'

import { validateRules } from '@/shared/config/validateRules'
import { routes } from '@/shared/routing/index'
import { chainAuthorized } from '@/shared/session'
import {
  getAvailableGroupedSkillsQuery,
  sessionQuery,
} from '@/shared/session/api'

export const currentRoute = routes.profile
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.signIn.open,
})

export const $availableGroupedSkills = createStore<string[]>([])
export const $availableGroupedSkillsLoading =
  getAvailableGroupedSkillsQuery.$pending.map((pending) => pending)
$availableGroupedSkills.on(
  getAvailableGroupedSkillsQuery.finished.success,
  (_, { result }) => {
    return result
  },
)

sample({
  clock: authorizedRoute.opened,
  target: getAvailableGroupedSkillsQuery.start,
})

const createBaseFields = () => ({
  firstName: {
    init: '',
    rules: [validateRules.required()],
    validateOn: ['change'] as ValidationEvent[],
  },
  lastName: {
    init: '',
    rules: [validateRules.required()],
    validateOn: ['change'] as ValidationEvent[],
  },
  patronymic: {
    init: '',
    rules: [validateRules.required()],
    validateOn: ['change'] as ValidationEvent[],
  },
  email: {
    init: '',
    rules: [validateRules.required(), validateRules.email()],
  },
  aboutMe: {
    init: '',
    rules: [validateRules.required()],
  },
  telegramLink: {
    init: '',
    rules: [validateRules.telegramLink()],
    validateOn: ['change'] as ValidationEvent[],
  },
  vkLink: {
    init: '',
    rules: [validateRules.vkLink()],
    validateOn: ['change'] as ValidationEvent[],
  },
})

const createStudentFields = () => ({
  ...createBaseFields(),
  group: {
    init: '',
    rules: [validateRules.required()],
  },
  githubLink: {
    init: '',
    rules: [validateRules.required(), validateRules.gitHubLink()],
    validateOn: ['change'] as ValidationEvent[],
  },
  resume: {
    init: null as File | null,
    rules: [validateRules.required()],
  },
  skills: {
    init: [] as string[],
    rules: [validateRules.required()],
  },
})

const createCompanyFields = () => ({
  ...createBaseFields(),
  companyName: {
    init: '',
    rules: [validateRules.required()],
  },
  position: {
    init: '',
    rules: [validateRules.required()],
  },
})

export const baseForm = createForm({
  fields: createBaseFields(),
  validateOn: ['submit'] as ValidationEvent[],
})

export const studentForm = createForm({
  fields: createStudentFields(),
  validateOn: ['submit'] as ValidationEvent[],
})

export const companyForm = createForm({
  fields: createCompanyFields(),
  validateOn: ['submit'] as ValidationEvent[],
})

export const getFormByRole = (role: string) => {
  switch (role) {
    case 'STUDENT':
      return studentForm
    case 'COMPANY':
      return companyForm
    default:
      return baseForm
  }
}

sample({
  clock: sessionQuery.finished.success,
  fn: ({ result }) => {
    const baseData = {
      firstName: result.firstName,
      lastName: result.lastName,
      patronymic: result.patronymic,
      email: result.email,
      aboutMe: result.aboutMe || '',
      telegramLink: result.telegramLink || '',
      vkLink: result.vkLink || '',
    }

    if (result.role === 'STUDENT') {
      return {
        ...baseData,
        group: result.studentProfile?.group?.name || '',
        githubLink: result.studentProfile?.githubLink || '',
        resume: result.studentProfile?.resume || null,
        skills: result.studentProfile?.skills || [],
      }
    }

    // if (result.role === 'STAFF') {
    //   return {
    //     ...baseData,
    //     companyName: result.companyProfile?.companyName || '',
    //     position: result.companyProfile?.position || '',
    //   }
    // }
    return baseData
  },
  target: [
    baseForm.setInitialForm,
    studentForm.setInitialForm,
    companyForm.setInitialForm,
  ],
})
