import { Flex } from '@mantine/core';
import {
  IconBriefcase2,
  IconBuildingCommunity,
  IconSchool,
  IconUserPlus,
  IconUsers
} from '@tabler/icons-react';

import { WithRoleCheck } from '@/shared/hoc';
import { ActionCard } from '@/shared/ui/ActionCard';

import { modalOpened as createGroupModalOpened } from './CreateGroup/model';
import { modalOpened as createOrganizationModalOpened } from './CreateOrganization/model';
import { modalOpened as createPracticeModalOpened } from './CreatePractice/model';
import { modalOpened as createVacancyModalOpened } from './CreateVacancy/model';
import { modalOpened as inviteUserModalOpened } from './InviteUser/model';

export const ActionCards = () => {
  return (
    <Flex className='shell_main' gap='md' w='100%' wrap='wrap'>
      <WithRoleCheck allowedRoles={['ADMIN', 'STAFF', 'UNIVERSITY_STAFF']}>
        <ActionCard
          title='Пригласить пользователя'
          icon={<IconUserPlus size={28} />}
          onClick={() => inviteUserModalOpened()}
        />
      </WithRoleCheck>

      <WithRoleCheck allowedRoles={['ADMIN', 'STAFF', 'UNIVERSITY_STAFF']}>
        <ActionCard
          title='Создать учебную группу'
          icon={<IconUsers size={28} />}
          onClick={() => createGroupModalOpened()}
        />
      </WithRoleCheck>

      <WithRoleCheck allowedRoles={['ADMIN', 'UNIVERSITY_STAFF']}>
        <ActionCard
          title='Создать организацию'
          icon={<IconBuildingCommunity size={28} />}
          onClick={() => createOrganizationModalOpened()}
        />
      </WithRoleCheck>

      <WithRoleCheck allowedRoles={['ADMIN', 'STAFF']}>
        <ActionCard
          title='Создать вакансию'
          icon={<IconSchool size={28} />}
          onClick={() => createVacancyModalOpened()}
        />
      </WithRoleCheck>

      <WithRoleCheck allowedRoles={['ADMIN', 'UNIVERSITY_STAFF']}>
        <ActionCard
          title='Создать практику'
          icon={<IconBriefcase2 size={28} />}
          onClick={() => createPracticeModalOpened()}
        />
      </WithRoleCheck>
    </Flex>
  );
};
