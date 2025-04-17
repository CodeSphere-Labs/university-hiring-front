import { Grid, Group, Pagination, Stack } from '@mantine/core';
import { IconBuilding, IconCalendar, IconUsers } from '@tabler/icons-react';
import { useUnit } from 'effector-react';
import { useState } from 'react';

import { withRoleCheck } from '@/shared/hoc';
import { getStudentWord } from '@/shared/utils';

import { PracticeCard, SkeletonCards } from '../components';
import { $loading, $practices } from '../model/model';

const Info = () => {
  const [practices, loading] = useUnit([$practices, $loading]);
  const [activePage, setActivePage] = useState(1);

  return (
    <Stack gap='xl'>
      <Grid>
        {loading && <SkeletonCards />}

        {!loading &&
          practices.data.map((practice) => (
            <Grid.Col key={practice.id} span={{ base: 12, sm: 6, md: 4 }}>
              <PracticeCard>
                <PracticeCard.Title order={4}>{practice.name}</PracticeCard.Title>
                <PracticeCard.Option
                  label={practice.organization.name}
                  icon={<IconBuilding size={16} />}
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
        <Group justify='center'>
          <Pagination
            value={activePage}
            onChange={setActivePage}
            total={practices.meta.totalPages}
          />
        </Group>
      )}
    </Stack>
  );
};

export const UniversityStaff = withRoleCheck(Info, ['UNIVERSITY_STAFF']);
