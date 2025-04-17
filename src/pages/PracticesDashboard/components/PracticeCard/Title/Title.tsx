import type { TitleProps } from '@mantine/core';

import { Title as MantineTitle } from '@mantine/core';

export const Title = (props: TitleProps) => {
  return <MantineTitle {...props} />;
};
