/* eslint-disable jsx-a11y/anchor-is-valid */

import { Code, Group } from '@mantine/core'
import { ReactNode, useState } from 'react'
import { CgProfile, CgWorkAlt } from 'react-icons/cg'
import { GoPeople } from 'react-icons/go'
import { RxDashboard } from 'react-icons/rx'

import classes from './Navbar.module.css'

interface Props {
  children: ReactNode
}

const data = [
  {
    link: '',
    label: 'Панель управления',
    icon: RxDashboard,
  },
  {
    link: '',
    label: 'Студенты',
    icon: GoPeople,
  },
  {
    link: '',
    label: 'Стажировки',
    icon: CgWorkAlt,
  },
  {
    link: '',
    label: 'Профиль',
    icon: CgProfile,
  },
]

export const Navbar = ({ children }: Props) => {
  const [active, setActive] = useState('Billing')

  const links = data.map((item) => (
    <a
      key={item.label}
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke="1.5" />

      <span>{item.label}</span>
    </a>
  ))

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
            <span>Logout</span>
          </a>
        </div>
      </nav>

      <div>{children}</div>
    </main>
  )
}
