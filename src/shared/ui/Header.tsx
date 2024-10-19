import { Burger, Container, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactNode, useState } from 'react'

import classes from './header.module.css'

interface Props {
  children: ReactNode
}

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
]

export const Header = ({ children }: Props) => {
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.link)
      }}
    >
      {link.label}
    </a>
  ))

  return (
    <>
      <header className={classes.header}>
        <Container size="lg" className={classes.inner}>
          <div>logo</div>
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Container>
      </header>

      {children}
    </>
  )
}
