import { Card, Grid, Skeleton, Stack } from '@mantine/core';

export const SkeletonCards = () => {
  return Array.from({ length: 9 }).map((_, index) => (
    <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
      <Card padding='lg' radius='md' shadow='sm' withBorder>
        <Stack gap='md'>
          <Skeleton height={20} width='60%' />
          <Skeleton height={16} width='80%' />
          <Skeleton height={16} width='40%' />
          <Skeleton height={16} width='30%' />
        </Stack>
      </Card>
    </Grid.Col>
  ));
};
