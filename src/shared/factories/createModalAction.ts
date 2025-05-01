import type { Query } from '@farfetched/core';
import type { Effect, Event } from 'effector';
import type { AnyFormValues } from 'effector-forms';

import { modals } from '@mantine/modals';
import { createEffect, createEvent, sample } from 'effector';
import { createForm } from 'effector-forms';

import { showError, showSuccess } from '@/shared/notifications/model';

const DEFAULT_Z_INDEX = 1002;
const DEFAULT_SIZE = 'lg';

interface ModalActionParams<TypeFormFields extends AnyFormValues, SubmitTypes> {
  Component: React.ReactNode;
  errorNotification?: string;
  formConfig: Parameters<typeof createForm<TypeFormFields>>[0];

  modalClassNames?: Parameters<typeof modals.openConfirmModal>[0]['classNames'];
  openTargets?: Array<Effect<any, any, any> | Event<any>>;
  size?: Parameters<typeof modals.openConfirmModal>[0]['size'];
  submitTarget: Query<SubmitTypes, any, any>;
  successNotification: { title: string; message: string };
  title: string;
  zIndex?: number;
  transformValues?: (fields: TypeFormFields) => SubmitTypes;
  labels: {
    confirm: string;
    cancel: string;
  };
}

export const createModalAction = <TypeFormFields extends AnyFormValues, SubmitTypes>({
  title,
  Component,
  formConfig,
  submitTarget,
  successNotification,
  errorNotification,
  openTargets = [],
  transformValues,
  modalClassNames,
  labels,
  size = DEFAULT_SIZE,
  zIndex = DEFAULT_Z_INDEX
}: ModalActionParams<TypeFormFields, SubmitTypes>) => {
  const modalOpened = createEvent();
  const form = createForm(formConfig);

  const modalConfirmFx = createEffect(() => {
    form.submit();
  });

  const openModalFx = createEffect(() =>
    modals.openConfirmModal({
      title,
      children: Component,
      labels,
      onConfirm: () => modalConfirmFx(),
      closeOnConfirm: false,
      size,
      zIndex,
      classNames: modalClassNames
    })
  );

  const modalCloseFx = createEffect<string, void>((id) => {
    modals.close(id);
  });

  sample({
    clock: modalOpened,
    target: [form.reset, openModalFx, ...openTargets]
  });

  sample({
    clock: form.formValidated,
    fn: transformValues || ((fields) => fields as unknown as SubmitTypes),
    target: submitTarget.start
  });

  sample({
    clock: submitTarget.finished.success,
    source: openModalFx.doneData,
    target: [modalCloseFx, showSuccess(successNotification)]
  });

  if (errorNotification) {
    sample({
      clock: submitTarget.finished.failure,
      target: showError(errorNotification)
    });
  }

  return {
    modalOpened,
    form,
    modalConfirmFx,
    openModalFx,
    modalCloseFx
  };
};
