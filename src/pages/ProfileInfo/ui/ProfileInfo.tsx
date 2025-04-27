import { Stack } from '@mantine/core';
import { useUnit } from 'effector-react';

import { BaseUserInfo } from '@/shared/ui/BaseUserInfo/BaseUserInfo';
import { Projects } from '@/shared/ui/Projects/Projects';
import { UserTopInfo } from '@/shared/ui/UserTopInfo/UserTopInfo';

import { $user } from '../model/model';

const ProfileInfo = () => {
  const user = useUnit($user);

  if (!user) return null;

  return (
    <Stack className='shell_main'>
      <UserTopInfo user={user} />
      <BaseUserInfo user={user} />
      <Projects projects={user?.studentProfile?.projects || []} />
    </Stack>
  );
};

export default ProfileInfo;
