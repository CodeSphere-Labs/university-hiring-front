import { Flex } from '@mantine/core'
import {
  IconBuildingCommunity,
  IconSchool,
  IconUserPlus,
  IconUsers,
} from '@tabler/icons-react'

import { WithRoleCheck } from '@/shared/hoc'
import { ActionCard } from '@/shared/ui/ActionCard'

import { modalOpened } from './CreateOrganization/model'
import { modalOpened as inviteUserModalOpened } from './InviteUser/model'

export const AdminActions = () => {
  return (
    <Flex className="shell_main" w="100%" wrap="wrap" gap="md">
      <WithRoleCheck allowedRoles={['ADMIN', 'STAFF', 'UNIVERSITY_STAFF']}>
        <ActionCard
          icon={<IconUserPlus size={28} />}
          title="Пригласить пользователя"
          onClick={() => inviteUserModalOpened()}
        />
      </WithRoleCheck>

      <WithRoleCheck allowedRoles={['ADMIN', 'STAFF', 'UNIVERSITY_STAFF']}>
        <ActionCard
          icon={<IconUsers size={28} />}
          title="Создать учебную группу"
          onClick={() => {
            console.log('Создать учебную группу')
          }}
        />
      </WithRoleCheck>

      <WithRoleCheck allowedRoles={['ADMIN', 'UNIVERSITY_STAFF']}>
        <ActionCard
          icon={<IconBuildingCommunity size={28} />}
          title="Создать организацию"
          onClick={() => modalOpened()}
        />
      </WithRoleCheck>

      <WithRoleCheck allowedRoles={['ADMIN', 'STAFF']}>
        <ActionCard
          icon={<IconSchool size={28} />}
          title="Создать вакансию"
          onClick={() => {
            console.log('Создать вакансию')
          }}
        />
      </WithRoleCheck>
    </Flex>
  )
}
