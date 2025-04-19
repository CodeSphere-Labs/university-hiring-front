import { Grid, Group, Pagination, Stack } from '@mantine/core';
import { IconBuilding, IconCalendar, IconUsers, IconUserSquareRounded } from '@tabler/icons-react';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';

import { withRoleCheck } from '@/shared/hoc';
import { routes } from '@/shared/routing';
import { getStudentWord } from '@/shared/utils';

import { PracticeCard, SkeletonCards } from '../components';
import { $loading, $page, $practices, pageChanged } from '../model/model';

const Info = () => {
  const [practices, loading, page] = useUnit([$practices, $loading, $page]);

  return (
    <Stack gap='xl'>
      <Grid>
        {loading && <SkeletonCards />}

        {!loading &&
          practices.data.map((practice) => (
            <Grid.Col key={practice.id} span={{ base: 12, sm: 6, md: 4 }}>
              <PracticeCard
                params={{ id: practice.id }}
                component={Link}
                // atomic-router types are not correct for mantine Link component
                // eslint-disable-next-line ts/ban-ts-comment
                // @ts-expect-error
                to={routes.practice}
              >
                <PracticeCard.Title order={4}>{practice.name}</PracticeCard.Title>
                <PracticeCard.Option
                  label={practice.organization.name}
                  icon={<IconBuilding size={16} />}
                />

                <PracticeCard.Option
                  label={`${practice.supervisor.firstName} ${practice.supervisor.lastName}`}
                  icon={<IconUserSquareRounded size={16} />}
                />

                <PracticeCard.Option
                  label={`${new Date(practice.startDate).toLocaleDateString()} - ${new Date(practice.endDate).toLocaleDateString()}`}
                  icon={<IconCalendar size={16} />}
                />

                <PracticeCard.Option
                  label={`${practice.students.length} ${getStudentWord(practice.students.length)}`}
                  icon={<IconUsers size={16} />}
                />
              </PracticeCard>
            </Grid.Col>
          ))}
      </Grid>

      {!loading && practices.meta.totalPages > 1 && (
        <Group justify='center' pb='md'>
          <Pagination value={page} onChange={pageChanged} total={practices.meta.totalPages} />
        </Group>
      )}
    </Stack>
  );
};

export const UniversityStaff = withRoleCheck(Info, ['UNIVERSITY_STAFF']);
