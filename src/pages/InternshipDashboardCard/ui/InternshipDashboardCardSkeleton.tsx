import { Card, Group, Skeleton, Stack } from '@mantine/core';

const InternshipDashboardCardSkeleton = () => (
  <Card withBorder>
    <Stack gap='md'>
      <Group>
        <Skeleton circle height={48} />
        <Stack gap={0} style={{ flex: 1 }}>
          <Skeleton height={24} width='60%' />
          <Skeleton height={16} mt={8} width='80%' />
        </Stack>
      </Group>

      <Stack gap='xs'>
        <Skeleton height={20} width='20%' />
        <Skeleton height={16} width='100%' />
      </Stack>

      <Stack gap='xs'>
        <Skeleton height={20} width='30%' />
        <Skeleton height={16} width='100%' />
      </Stack>

      <Group gap='xs'>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height={28} width={80} />
        ))}
      </Group>
    </Stack>
  </Card>
);

export const SkeletonList = () => (
  <Stack gap='md'>
    {Array.from({ length: 10 }).map((_, i) => (
      <InternshipDashboardCardSkeleton key={i} />
    ))}
  </Stack>
);
