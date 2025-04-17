import { Card, Stack } from '@mantine/core';

import { Option } from './Option/Option';
import { Title } from './Title/Title';

export const PracticeCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card padding='lg' radius='md' shadow='sm' withBorder>
      <Stack gap='md'>{children}</Stack>
    </Card>
  );
};

PracticeCard.Title = Title;
PracticeCard.Option = Option;
