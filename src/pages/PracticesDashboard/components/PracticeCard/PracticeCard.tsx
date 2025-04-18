import type { CardProps, PolymorphicComponentProps } from '@mantine/core';

import { Card, Stack } from '@mantine/core';

import { Option } from './Option/Option';
import { Title } from './Title/Title';

export const PracticeCard = <C extends React.ElementType = 'div'>(
  props: PolymorphicComponentProps<C, CardProps>
) => {
  const { component, ...rest } = props;

  return (
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    <Card padding='lg' radius='md' component={component} shadow='sm' withBorder {...rest}>
      <Stack gap='md'>{props.children}</Stack>
    </Card>
  );
};

PracticeCard.Title = Title;
PracticeCard.Option = Option;
