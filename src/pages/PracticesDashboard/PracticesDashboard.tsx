import { Title } from '@mantine/core';

import { Filter, Search } from './components';
import { Staff, Student, UniversityStaff } from './ui';

const PracticesDashboard = () => {
  return (
    <>
      <Title mb='lg' order={2}>
        Практики
      </Title>
      <Filter />
      <Search pb='md' />

      <UniversityStaff />
      <Staff />
      <Student />
    </>
  );
};

export default PracticesDashboard;
