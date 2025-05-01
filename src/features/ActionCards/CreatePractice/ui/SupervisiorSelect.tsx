import { Loader, Select } from '@mantine/core';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { $organizationUsers, $organizationUsersLoading, form } from '../model';

export const SupervisiorSelect = () => {
  const [organizationUsers, organizationUsersLoading] = useUnit([
    $organizationUsers,
    $organizationUsersLoading
  ]);
  const { fields } = useForm(form);

  const data = organizationUsers.map((user) => ({
    value: user.id.toString(),
    label: `${user.firstName} ${user.lastName}`
  }));

  return (
    <Select
      data={data}
      disabled={organizationUsersLoading}
      label='Руководитель практики'
      value={fields.supervisorId.value || null}
      comboboxProps={{
        position: 'bottom',
        middlewares: { flip: false, shift: true },
        withinPortal: false
      }}
      description='Выберите сотрудника организации, который будет руководителем практики'
      error={fields.supervisorId.errorText()}
      nothingFoundMessage='Руководитель не найден'
      onChange={(value) => fields.supervisorId.onChange(value ?? '')}
      placeholder='Выберите руководителя'
      rightSection={organizationUsersLoading && <Loader size={16} />}
    />
  );
};
