import { Avatar, Button, Group, Stack, Text } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useUnit } from 'effector-react'

import { $user } from '@/shared/session'
import { getRoleInRussian } from '@/shared/utils'

import classes from './UserInfoIcons.module.css'

const Profile = () => {
  return (
    <Stack>
      <Group justify="space-between" wrap="wrap" gap="md">
        <UserInfoIcons />
        <Button>Редактировать</Button>
      </Group>
      asda
    </Stack>
  )
}

// eslint-disable-next-line import/no-default-export
export default Profile

function UserInfoIcons() {
  const user = useUnit($user)
  if (!user) return null

  const userRole = getRoleInRussian(user.role)

  return (
    <div>
      <Group wrap="nowrap">
        <Avatar
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
          size={134}
          radius="md"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c={userRole.color}>
            {userRole.label}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {user.firstName} {user.lastName}
          </Text>
          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size={16} className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user.email}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  )
}
