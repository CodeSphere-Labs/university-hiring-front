import { Group, Text } from '@mantine/core';

export const Option = ({ icon, label }: { icon: React.ReactNode; label: React.ReactNode }) => {
  return (
    <Group gap='xs'>
      {icon}
      <Text size='sm'>{label}</Text>
    </Group>
  );
};
