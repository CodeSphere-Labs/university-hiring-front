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
import { $user } from '@/shared/session/model'
import { getRoleOptions } from '@/shared/utils'

import { modalOpened as createGroupModalOpened } from '../CreateGroup/model'
import {
  $groups,
  $groupsLoading,
  $organizations,
  $organizationsLoading,
  form,
} from './model'

export const InviteUser = () => {
  const [organizations, groups, organizationsLoading, groupsLoading, user] =
    useUnit([
      $organizations,
      $groups,
      $organizationsLoading,
      $groupsLoading,
      $user,
    ])

  const { fields } = useForm(form)

  const organizationsData = organizations.map((organization) => ({
    label: organization.name,
    value: organization.id.toString(),
  }))

  const groupsData = groups.map((group) => ({
    label: group.name,
    value: group.id.toString(),
  }))

  const availableRoles = getRoleOptions(user?.role)

  return (
    <Stack>
      <TextInput
        required
        label="Email"
        value={fields.email.value}
        description="Email пользователя"
        error={fields.email.errorText()}
        onChange={(e) => fields.email.onChange(e.target.value)}
        placeholder="user@mail.ru"
      />

      <Flex
        align={{ base: 'stretch', xs: 'end' }}
        gap="md"
        direction={{ base: 'column', xs: 'row' }}
      >
        <Select
          clearable
          required
          searchable
          data={organizationsData}
          disabled={organizationsLoading}
          label="Организация"
          value={fields.organization.value?.id.toString() ?? null}
          w={{ base: '100%', xs: '75%' }}
          comboboxProps={{
            position: 'bottom',
            middlewares: { flip: false, shift: true },
            withinPortal: false,
          }}
          description="Выберите организацию к которой будет привязан пользователь"
          error={fields.organization.errorText()}
          onChange={(value) => {
            const selectedOrg = organizations.find(
              (org) => org.id.toString() === value,
            )
            fields.organization.onChange(selectedOrg ?? null)
          }}
          placeholder="Выберите организацию"
          rightSection={organizationsLoading && <Loader size={16} />}
        />
        <Group w={{ base: '100%', xs: '25%' }}>
          <Input.Wrapper label="Нет подходящей организации?">
            <Button
              fullWidth
              mt={10}
              variant="outline"
              onClick={() => modalOpened()}
            >
              Создать
            </Button>
          </Input.Wrapper>
        </Group>
      </Flex>
      <Select
        required
        data={availableRoles}
        defaultValue={fields.role.value}
        label="Выберите роль будущего пользователя"
        comboboxProps={{
          position: 'bottom',
          middlewares: { flip: false, shift: true },
          withinPortal: false,
        }}
        error={fields.role.errorText()}
        onChange={(value) => fields.role.onChange(value ?? 'STAFF')}
        placeholder="Выберите роль"
      />
      {fields.role.value === 'STUDENT' && (
        <Flex
          align={{ base: 'stretch', xs: 'end' }}
          gap="md"
          direction={{ base: 'column', xs: 'row' }}
        >
          <Select
            clearable
            required
            searchable
            data={groupsData}
            disabled={groupsLoading}
            label="Группа"
            value={fields.group.value?.id.toString() ?? null}
            w={{ base: '100%', xs: '75%' }}
            comboboxProps={{
              position: 'bottom',
              middlewares: { flip: false, shift: true },
              withinPortal: false,
            }}
            description="Выберите группу к которой будет прикреплен студент"
            error={fields.group.errorText()}
            onChange={(value) => {
              const selectedGroup = groups.find(
                (group) => group.id.toString() === value,
              )
              fields.group.onChange(selectedGroup ?? null)
            }}
            placeholder="Выберите группу"
            rightSection={groupsLoading && <Loader size={16} />}
          />
          <Group w={{ base: '100%', xs: '25%' }}>
            <Input.Wrapper label="Нет подходящей группы?">
              <Button
                fullWidth
                mt={10}
                variant="outline"
                onClick={() => createGroupModalOpened()}
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
