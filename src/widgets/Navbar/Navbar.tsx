import {
  Avatar,
  Badge,
  Button,
  Container,
  Group,
  NavLink,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core'
import { Link } from 'atomic-router-react'
import { useList, useUnit } from 'effector-react'
import { ReactNode } from 'react'

import {
  $sessionPending,
  $user,
  logoutQuery,
  userLogouted,
} from '@/shared/session'
import { getRoleInRussian } from '@/shared/utils'

import { $links } from './links'
import classes from './Navbar.module.css'

interface Props {
  children: ReactNode
}

export const Navbar = ({ children }: Props) => {
  const links = useList($links, {
    getKey: (link) => link.label,
    fn(link) {
      const isActive = useUnit(link.active.$isOpened ?? link.route.$isOpened)

      return (
        <NavLink
          key={link.label}
          className={classes.link}
          component={Link}
          active={isActive}
          to={link.route}
          leftSection={<link.icon className={classes.linkIcon} stroke="1.5" />}
          label={link.label}
        />
      )
    },
  })

  const pending = useUnit(logoutQuery.$pending)

  return (
    <main className={classes.main}>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Stack gap="xs">
              <Group>
                <UserAvatar />
                <UserInfo />
              </Group>
            </Stack>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <Button
            loading={pending}
            variant="subtle"
            fullWidth
            className={classes.link}
            onClick={() => userLogouted()}
          >
            <span>Выйти</span>
          </Button>
        </div>
      </nav>

      <Container fluid pt={15} w="100%">
        {children}
      </Container>
    </main>
  )
}

function UserAvatar() {
  const user = useUnit($user)
  const pending = useUnit($sessionPending)

  if (pending) {
    return <Skeleton circle height={40} />
  }

  if (!user) {
    return null // Этот случай не должен происходить, но TypeScript требует проверки
  }

  return (
    <Avatar
      src={user.avatar}
      alt={`${user.firstName} ${user.lastName}`}
      radius="xl"
      size="md"
    />
  )
}

function UserInfo() {
  const user = useUnit($user)
  const pending = useUnit($sessionPending)

  if (pending) {
    return (
      <Stack gap={0}>
        <Skeleton height={20} width={150} mb={4} />
        <Skeleton height={20} width={100} />
      </Stack>
    )
  }

  if (!user) {
    return null // Этот случай не должен происходить, но TypeScript требует проверки
  }

  const userRole = getRoleInRussian(user.role)

  return (
    <Stack gap={0}>
      <Text fw={700} size="md">
        {user.firstName} {user.lastName}
      </Text>
      <Badge color={userRole.color} variant="light" size="sm">
        {userRole.label}
      </Badge>
    </Stack>
  )
}
