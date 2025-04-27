import type { ReactNode } from 'react';

import {
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  NavLink,
  Stack,
  useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'atomic-router-react';
import { useList, useUnit } from 'effector-react';

import { WithRoleCheck } from '@/shared/hoc';
import { logoutQuery } from '@/shared/session/api';
import { userLogouted } from '@/shared/session/model';

import { UserAvatar, UserInfo } from './components';
import { $links } from './links';

import classes from './styles.module.css';

export const Navbar = ({ children }: { children: ReactNode }) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = useList($links, {
    getKey: (link) => link.label,
    fn(link) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const isActive = useUnit(link.active.$isOpened);

      return (
        <WithRoleCheck allowedRoles={link.roles}>
          <NavLink
            key={link.label}
            active={isActive}
            className={classes.link}
            label={link.label}
            component={Link}
            leftSection={<link.icon className={classes.linkIcon} stroke='1.5' />}
            onClick={() => close()}
            to={link.route}
          />
        </WithRoleCheck>
      );
    }
  });

  const pending = useUnit(logoutQuery.$pending);

  const navbarContent = (
    <>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <Button
          fullWidth
          variant='subtle'
          color='red'
          loading={pending}
          onClick={() => userLogouted()}
        >
          <span>Выйти</span>
        </Button>
      </div>
    </>
  );

  return (
    <main className={classes.main}>
      <div className={classes.mobileNavbar}>
        <Drawer
          title={
            <Stack gap='xs'>
              <Group>
                <UserAvatar />
                <UserInfo />
              </Group>
            </Stack>
          }
          padding='md'
          size='sm'
          zIndex={1000}
          onClose={close}
          opened={opened}
          overlayProps={{ opacity: 0.5, blur: 4 }}
        >
          {navbarContent}
        </Drawer>

        <Group h={70} justify='space-between' p='md' style={{ width: '100%' }}>
          <div />
          <Burger
            className={classes.burger}
            size='md'
            color={theme.colors.blue[7]}
            onClick={toggle}
            opened={opened}
          />
        </Group>
      </div>

      <nav className={classes.navbar}>
        <Group className={classes.header} justify='space-between'>
          <Stack gap='xs'>
            <Group>
              <UserAvatar />
              <UserInfo />
            </Group>
          </Stack>
        </Group>

        {navbarContent}
      </nav>

      <Container fluid pt={15} w='100%'>
        {children}
      </Container>
    </main>
  );
};
