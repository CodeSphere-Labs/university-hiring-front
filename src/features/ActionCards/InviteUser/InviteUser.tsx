import {
  Button,
  Flex,
  Group,
  Input,
  Loader,
  Select,
  Stack,
  TextInput,
} from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'

import { modalOpened } from '@/features/ActionCards/CreateOrganization/model'
import { Role } from '@/shared/api/types'
import { $user } from '@/shared/session'

import { $organizations, $organizationsLoading, form } from './model'

const ROLE_OPTIONS = {
  ADMIN: [
    { label: 'Сотрудник университета', value: 'UNIVERSITY_STAFF' },
    { label: 'Сотрудник компании', value: 'STAFF' },
    { label: 'Студент', value: 'STUDENT' },
  ],
  UNIVERSITY_STAFF: [
    { label: 'Сотрудник университета', value: 'UNIVERSITY_STAFF' },
    { label: 'Студент', value: 'STUDENT' },
    { label: 'Сотрудник компании', value: 'STAFF' },
  ],
  STAFF: [{ label: 'Сотрудник компании', value: 'STAFF' }],
  STUDENT: [],
} as const

export const InviteUser = () => {
  const [organizations, organizationsLoading, user] = useUnit([
    $organizations,
    $organizationsLoading,
    $user,
  ])

  const { fields } = useForm(form)

  const organizationsData = organizations.map((organization) => ({
    label: organization.name,
    value: organization.id.toString(),
  }))

  const availableRoles = user ? ROLE_OPTIONS[user.role as Role] : []

  return (
    <Stack>
      <TextInput
        label="Email"
        description="Email пользователя"
        placeholder="user@mail.ru"
        value={fields.email.value}
        onChange={(e) => fields.email.onChange(e.target.value)}
        error={fields.email.errorText()}
        required
      />

      <Flex
        direction={{ base: 'column', xs: 'row' }}
        align={{ base: 'stretch', xs: 'end' }}
        gap="md"
      >
        <Select
          value={fields.organization.value?.id.toString() ?? null}
          onChange={(value) => {
            const selectedOrg = organizations.find(
              (org) => org.id.toString() === value,
            )
            fields.organization.onChange(selectedOrg ?? null)
          }}
          error={fields.organization.errorText()}
          data={organizationsData}
          comboboxProps={{
            position: 'bottom',
            middlewares: { flip: false, shift: true },
            withinPortal: false,
          }}
          label="Организация"
          description="Выберите организацию к которой будет привязан пользователь"
          placeholder="Выберите организацию"
          w={{ base: '100%', xs: '75%' }}
          required
          searchable
          rightSection={organizationsLoading && <Loader size={16} />}
          disabled={organizationsLoading}
          clearable
        />
        <Group w={{ base: '100%', xs: '25%' }}>
          <Input.Wrapper label="Нет подходящей организации?">
            <Button
              onClick={() => modalOpened()}
              mt={10}
              variant="outline"
              fullWidth
            >
              Создать
            </Button>
          </Input.Wrapper>
        </Group>
      </Flex>
      <Select
        label="Выберите роль будущего пользователя"
        required
        placeholder="Выберите роль"
        defaultValue={fields.role.value}
        onChange={(value) => fields.role.onChange(value ?? 'STAFF')}
        data={availableRoles}
        comboboxProps={{
          position: 'bottom',
          middlewares: { flip: false, shift: true },
          withinPortal: false,
        }}
      />
      {fields.role.value === 'STUDENT' && (
        <Flex
          direction={{ base: 'column', xs: 'row' }}
          align={{ base: 'stretch', xs: 'end' }}
          gap="md"
        >
          <Select
            error={fields.organization.errorText()}
            data={organizationsData}
            comboboxProps={{
              position: 'bottom',
              middlewares: { flip: false, shift: true },
              withinPortal: false,
            }}
            label="Группа"
            description="Выберите группу к которой будет прикреплен студент"
            placeholder="Выберите группу"
            w={{ base: '100%', xs: '75%' }}
            required
            searchable
            rightSection={organizationsLoading && <Loader size={16} />}
            disabled={organizationsLoading}
            clearable
          />
          <Group w={{ base: '100%', xs: '25%' }}>
            <Input.Wrapper label="Нет подходящей группы?">
              <Button
                onClick={() => modalOpened()}
                mt={10}
                variant="outline"
                fullWidth
              >
                Создать
              </Button>
            </Input.Wrapper>
          </Group>
        </Flex>
      )}
    </Stack>
  )
}
