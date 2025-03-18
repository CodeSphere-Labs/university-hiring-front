import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { useUnit } from 'effector-react'

import { projectDeleted } from '@/pages/Profile/model/model'
import { $user } from '@/shared/session/model'

import classes from './Project.module.css'

export const Projects = () => {
  const user = useUnit($user)

  if (!user?.studentProfile) return null

  return (
    <>
      <Title order={3}>Твои проекты</Title>
      <Grid>
        {user.studentProfile.projects?.map((project) => (
          <Grid.Col key={project.name} span={{ base: 12, sm: 6, lg: 4 }}>
            <Card withBorder radius="md" p="md" className={classes.card}>
              <Card.Section className={classes.section} mt="sm">
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Badge variant="dot">Название проекта</Badge>
                    <Text fz="lg" fw={500}>
                      {project.name}
                    </Text>
                  </Stack>
                  <ActionIcon
                    onClick={() => projectDeleted(project.id)}
                    variant="subtle"
                    size="lg"
                    color="red"
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
                <Stack gap={0} mt="md">
                  <Badge variant="dot">О проекте</Badge>
                  <Text fz="sm">{project.description}</Text>
                </Stack>
              </Card.Section>

              <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} c="dimmed">
                  Технологии
                </Text>
                <Group gap={7} mt={5}>
                  {project.technologies.map((technology) => (
                    <Badge key={technology} variant="light">
                      {technology}
                    </Badge>
                  ))}
                </Group>
              </Card.Section>

              <Group mt="xs">
                <Button
                  component="a"
                  href={project.githubUrl}
                  target="_blank"
                  radius="md"
                  style={{ flex: 1 }}
                >
                  Перейти на github
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  )
}
