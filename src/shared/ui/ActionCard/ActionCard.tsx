import { Button, Stack, Text } from '@mantine/core'
import { ReactNode } from 'react'

import classes from './ActionCard.module.css'

interface ActionCardProps {
  icon: ReactNode
  title: string
  onClick?: () => void
}

export const ActionCard = ({ icon, title, onClick }: ActionCardProps) => {
  return (
    <Button
      className={classes.button}
      variant="filled"
      h={80}
      radius="md"
      w={{ base: '100%', sm: '48%', md: '23%' }}
      onClick={onClick}
    >
      <Stack gap={5} align="center">
        {icon}
        <Text size="sm">{title}</Text>
      </Stack>
    </Button>
  )
}
