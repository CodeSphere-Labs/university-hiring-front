import { Flex } from '@mantine/core'
import {
  IconBuildingCommunity,
  IconSchool,
  IconUserPlus,
  IconUsers,
} from '@tabler/icons-react'

import { WithRoleCheck } from '@/shared/hoc'
import { ActionCard } from '@/shared/ui/ActionCard'

export const AdminActions = () => {
  return (
    <Flex w="100%" wrap="wrap" gap="md">
      <WithRoleCheck allowedRoles={['ADMIN', 'STAFF']}>
        <ActionCard
          icon={<IconUserPlus size={28} />}
          title="Пригласить пользователя"
          onClick={() => {
            console.log('Пригласить пользователя')
          }}
        />
      </WithRoleCheck>

      <WithRoleCheck allowedRoles={['ADMIN', 'STAFF']}>
        <ActionCard
          icon={<IconUsers size={28} />}
          title="Создать учебную группу"
          onClick={() => {
            console.log('Создать учебную группу')
          }}
        />
      </WithRoleCheck>

      <WithRoleCheck allowedRoles={['ADMIN']}>
        <ActionCard
          icon={<IconBuildingCommunity size={28} />}
          title="Создать организацию"
          onClick={() => {
            console.log('Создать организацию')
          }}
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
