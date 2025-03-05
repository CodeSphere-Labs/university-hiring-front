/* eslint-disable jsx-a11y/anchor-is-valid */
import { Code, Group, NavLink } from '@mantine/core'
import { ReactNode } from 'react'
import { $links } from './links'
import classes from './Navbar.module.css'

import { useList, useUnit } from 'effector-react'
import { Link } from 'atomic-router-react'

interface Props {
  children: ReactNode
}

export const Navbar = ({ children }: Props) => {
  const links = useList($links, {
    getKey: (link) => link.label,
    fn(link) {
      const isActive = useUnit(link.active?.$isOpened ?? link.route.$isOpened)

      return (
        <NavLink
          className={classes.link}
          component={Link}
          active={isActive}
          key={link.label}
          to={link.route}
          leftSection={<link.icon className={classes.linkIcon} stroke="1.5" />}
          label={link.label}
        />
      )
    },
  })

  return (
    <main className={classes.main}>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Code fw={700}>account name</Code>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <span>Выйти</span>
          </a>
        </div>
      </nav>

      <main>{children}</main>
    </main>
  )
}
