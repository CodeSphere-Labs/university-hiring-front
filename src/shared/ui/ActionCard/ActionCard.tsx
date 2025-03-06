import { Stack, Text, UnstyledButton } from '@mantine/core'
import { ReactNode } from 'react'

import classes from './ActionCard.module.css'

interface ActionCardProps {
  icon: ReactNode
  title: string
  onClick?: () => void
}

/**
 * Компонент карточки действия
 * @param icon - Иконка действия
 * @param title - Название действия
 * @param onClick - Функция, вызываемая при клике на карточку
 */
export const ActionCard = ({ icon, title, onClick }: ActionCardProps) => {
  return (
    <UnstyledButton
      className={classes.button}
      h={80}
      w={{ base: '100%', sm: '48%', md: '23%' }}
      onClick={onClick}
    >
      <Stack gap={5} align="center">
        {icon}
        <Text size="sm">{title}</Text>
      </Stack>
    </UnstyledButton>
  )
}
