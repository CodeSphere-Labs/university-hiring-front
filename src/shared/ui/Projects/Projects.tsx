import { ActionIcon, Badge, Button, Card, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import type { Project } from '@/shared/api/types';

import { projectDeleted } from '@/pages/Profile/model/model';

import classes from './Project.module.css';

export const Projects = ({
  projects,
  isReadOnly = true
}: {
  projects: Project[];
  isReadOnly?: boolean;
}) => {
  if (!projects.length) return null;

  return (
    <>
      <Title order={3}>Проекты</Title>
      <Grid>
        {projects.map((project) => (
          <Grid.Col key={project.name} span={{ base: 12, sm: 6, lg: 4 }}>
            <Card className={classes.card} p='md' radius='md' withBorder>
              <Card.Section className={classes.section} mt='sm'>
                <Group justify='space-between'>
                  <Stack gap={0}>
                    <Badge variant='dot'>Название проекта</Badge>
                    <Text fw={500} fz='lg'>
                      {project.name}
                    </Text>
                  </Stack>
                  {!isReadOnly && (
                    <ActionIcon
                      size='lg'
                      variant='subtle'
                      color='red'
                      onClick={() => projectDeleted(project.id)}
                    >
                      <IconTrash />
                    </ActionIcon>
                  )}
                </Group>
                <Stack gap={0} mt='md'>
                  <Badge variant='dot'>О проекте</Badge>
                  <Text fz='sm'>{project.description}</Text>
                </Stack>
              </Card.Section>

              <Card.Section className={classes.section}>
                <Text c='dimmed' className={classes.label} mt='md'>
                  Технологии
                </Text>
                <Group gap={7} mt={5}>
                  {project.technologies.map((technology) => (
                    <Badge key={technology} variant='light'>
                      {technology}
                    </Badge>
                  ))}
                </Group>
              </Card.Section>

              <Group mt='xs'>
                <Button
                  href={project.githubUrl}
                  radius='md'
                  style={{ flex: 1 }}
                  target='_blank'
                  component='a'
                >
                  Перейти на github
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};
