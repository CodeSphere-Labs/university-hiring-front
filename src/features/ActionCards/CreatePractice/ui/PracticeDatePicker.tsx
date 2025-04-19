import 'dayjs/locale/ru';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useForm } from 'effector-forms';

import { form } from '../model';

export const PracticeDatePicker = () => {
  const { fields } = useForm(form);

  return (
    <DatesProvider
      settings={{ locale: 'ru', firstDayOfWeek: 1, weekendDays: [0, 6], timezone: 'UTC' }}
    >
      <DatePickerInput
        required
        label='Даты проведения практики'
        type='range'
        value={[fields.startDate.value, fields.endDate.value]}
        dropdownType='popover'
        error={fields.startDate.errorText()}
        leftSection={<IconCalendar size={18} stroke={1.5} />}
        onChange={(values) => {
          fields.startDate.onChange(values[0]);
          fields.endDate.onChange(values[1]);
        }}
        placeholder='Выберите диапазон дат проведения практики'
        popoverProps={{ withinPortal: false }}
      />
    </DatesProvider>
  );
};
