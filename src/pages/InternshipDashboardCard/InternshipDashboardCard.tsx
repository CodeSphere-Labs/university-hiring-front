import type { GroupProps } from '@mantine/core';

import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Loader,
  Pagination as MantinePagination,
  Stack,
  Tabs,
  Text,
  Title
} from '@mantine/core';
import {
  IconCalendar,
  IconRosetteDiscountCheck,
  IconRosetteDiscountCheckOff,
  IconUsers
} from '@tabler/icons-react';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';

import type { OpportunityResponsesFilter } from '@/shared/api/types';

import { routes } from '@/shared/routing';
import { formatDate } from '@/shared/utils';

import { SkeletonList } from './InternshipDashboardCardSkeleton';
import {
  $opportinity,
  $opportinityLoading,
  $responses,
  $responsesLoading,
  $responseStatusChangeLoading,
  $responseStatusChanging,
  $status,
  filterChanged,
  pageChanged,
  responseStatusChanged
} from './model';

const FilterTabs = () => {
  const [status] = useUnit([$status]);

  return (
    <Tabs
      value={status}
      variant='pills'
      onChange={(value) => filterChanged(value as OpportunityResponsesFilter)}
    >
      <Tabs.List>
        <Tabs.Tab value='WAITING' leftSection={<IconUsers size={24} />}>
          В ожидании
        </Tabs.Tab>
        <Tabs.Tab value='ACCEPTED' leftSection={<IconRosetteDiscountCheck size={24} />}>
          Одобренные
        </Tabs.Tab>
        <Tabs.Tab value='REJECTED' leftSection={<IconRosetteDiscountCheckOff size={24} />}>
          Отклоненные
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

const Pagination = ({ ...props }: GroupProps) => {
  const [responses] = useUnit([$responses]);

  return (
    <Group {...props}>
      <MantinePagination
        size='lg'
        value={responses.meta.page}
        onChange={pageChanged}
        total={responses.meta.totalPages}
      />
    </Group>
  );
};

const InternshipDashboardCard = () => {
  const [
    opportinity,
    loading,
    responses,
    responsesLoading,
    responseStatusChanging,
    responseStatusChangeLoading
  ] = useUnit([
    $opportinity,
    $opportinityLoading,
    $responses,
    $responsesLoading,
    $responseStatusChanging,
    $responseStatusChangeLoading
  ]);

  if (loading || !opportinity) {
    return null;
  }

  return (
    <Stack className='shell_main' gap='xl'>
      <Stack gap='md'>
        <Group align='flex-start' justify='space-between'>
          <Stack gap='xs'>
            <Title order={2}>{opportinity.title}</Title>
          </Stack>
          <Badge size='lg' variant='light' color='gray' leftSection={<IconCalendar size={14} />}>
            {formatDate(opportinity.createdAt)}
          </Badge>
        </Group>

        <Divider />

        <Stack gap='xs'>
          <Title order={4}>Описание</Title>
          <Text>{opportinity.description}</Text>
        </Stack>

        <Stack gap='xs'>
          <Title order={4}>Требуемые навыки</Title>
          <Group gap='xs'>
            {opportinity.requiredSkills.map((skill) => (
              <Badge key={skill.id} size='lg' variant='light'>
                {skill.name}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Stack>

      <Stack gap='md'>
        <Group gap='xs'>
          <IconUsers size={20} />
          <Title order={3}>Отклики студентов</Title>
          <Badge size='lg' variant='light'>
            {responses.meta.totalItems}
          </Badge>
        </Group>

        <Group justify='space-between'>
          <FilterTabs />
          <Pagination />
        </Group>

        <Stack gap='md'>
          {responsesLoading && <SkeletonList />}

          {!responsesLoading &&
            responses.data.map((response) => (
              <Card key={response.id} withBorder>
                <Stack gap='md'>
                  <Group justify='space-between'>
                    <Group>
                      <Avatar radius='xl' size='lg'>
                        {response.student.firstName[0]}
                        {response.student.lastName[0]}
                      </Avatar>
                      <Stack gap={0}>
                        <Text fw={500} size='lg'>
                          {response.student.firstName} {response.student.lastName}
                        </Text>
                        <Text c='dimmed' size='sm'>
                          {response.student.email}
                        </Text>
                      </Stack>
                    </Group>

                    <Tabs
                      value={response.status}
                      variant='pills'
                      onChange={(value) =>
                        responseStatusChanged({
                          id: response.id,
                          status: value as OpportunityResponsesFilter
                        })
                      }
                    >
                      <Tabs.List>
                        {responseStatusChanging === response.id.toString() &&
                        responseStatusChangeLoading ? (
                          <Group gap='xs' style={{ padding: '8px 12px' }}>
                            <Loader size={16} />
                            <Text c='dimmed' size='sm'>
                              Изменение статуса...
                            </Text>
                          </Group>
                        ) : (
                          <>
                            <Tabs.Tab
                              disabled={responseStatusChanging === response.id.toString()}
                              value='WAITING'
                              leftSection={<IconUsers size={18} />}
                            >
                              В ожидании
                            </Tabs.Tab>
                            <Tabs.Tab
                              disabled={responseStatusChanging === response.id.toString()}
                              value='ACCEPTED'
                              leftSection={<IconRosetteDiscountCheck size={18} />}
                            >
                              Одобрить
                            </Tabs.Tab>
                            <Tabs.Tab
                              disabled={responseStatusChanging === response.id.toString()}
                              value='REJECTED'
                              leftSection={<IconRosetteDiscountCheckOff size={18} />}
                            >
                              Отклонить
                            </Tabs.Tab>
                          </>
                        )}
                      </Tabs.List>
                    </Tabs>
                  </Group>

                  {response.student.aboutMe && (
                    <Stack gap='xs'>
                      <Text fw={500}>О себе</Text>
                      <Text>{response.student.aboutMe}</Text>
                    </Stack>
                  )}

                  {response.coverLetter && (
                    <Stack gap='xs'>
                      <Text fw={500}>Сопроводительное письмо</Text>
                      <Text lineClamp={2}>{response.coverLetter}</Text>
                    </Stack>
                  )}

                  <Group gap='xs'>
                    {response.student.studentProfile.skills.map((skill) => (
                      <Badge key={skill} size='lg' variant='light'>
                        {skill}
                      </Badge>
                    ))}
                  </Group>

                  <Group>
                    <Button
                      params={{ id: response.student.id }}
                      target='_blank'
                      component={Link}
                      // atomic-router types are not correct for mantine Link component
                      // eslint-disable-next-line ts/ban-ts-comment
                      // @ts-expect-error
                      to={routes.profileInfo}
                    >
                      Открыть профиль
                    </Button>
                    <Button>Написать в чат</Button>
                  </Group>
                </Stack>
              </Card>
            ))}
        </Stack>
      </Stack>
      <Pagination justify='center' pb='md' />
    </Stack>
  );
};

export default InternshipDashboardCard;
