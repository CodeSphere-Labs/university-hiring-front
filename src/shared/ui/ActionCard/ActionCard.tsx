import type { ReactNode } from 'react';

import { Button, Stack, Text } from '@mantine/core';

import classes from './ActionCard.module.css';

interface ActionCardProps {
  grow?: boolean;
  icon: ReactNode;
  title: string;
  onClick?: () => void;
}

export const ActionCard = ({ icon, title, onClick }: ActionCardProps) => {
  return (
    <Button
      className={classes.button}
      h={80}
      radius='md'
      variant='filled'
      w={{ base: '100%', sm: '48%', md: '23%' }}
      onClick={onClick}
    >
      <Stack align='center' gap={5}>
        {icon}
        <Text size='sm'>{title}</Text>
      </Stack>
    </Button>
  );
};
