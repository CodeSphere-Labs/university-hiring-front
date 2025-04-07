import { createEvent, sample } from 'effector';

import { deleteInvitationQuery, refreshInvitationQuery } from '@/pages/Invitations/api/api';
import { showError, showSuccess } from '@/shared/notifications/model';

export const deletedInvitation = createEvent<number>();
export const refreshedInvitation = createEvent<number>();

sample({
  clock: deletedInvitation,
  target: deleteInvitationQuery.start
});

sample({
  clock: refreshedInvitation,
  target: refreshInvitationQuery.start
});

sample({
  clock: deleteInvitationQuery.finished.success,
  target: showSuccess({
    title: 'Приглашение удалено',
    message: 'Приглашение успешно удалено'
  })
});

sample({
  clock: refreshInvitationQuery.finished.success,
  target: showSuccess({
    title: 'Приглашение обновлено',
    message: 'Приглашение успешно обновлено'
  })
});
sample({
  clock: deleteInvitationQuery.finished.failure,
  target: showError('Не удалось удалить приглашение')
});

sample({
  clock: refreshInvitationQuery.finished.failure,
  target: showError('Не удалось обновить приглашение')
});
