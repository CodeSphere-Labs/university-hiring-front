import type { Socket } from 'socket.io-client';

import { createEffect, createEvent, createStore, scopeBind } from 'effector';
import { io } from 'socket.io-client';

export const disconnected = createEvent();
export const messageSent = createEvent<string>();
export const rawMessageReceived = createEvent<string>();
export const practiceChatConnected = createEvent<string>();
export const historyReceived = createEvent<any>();

export const connectFx = createEffect((practiceId: string) => {
  const socket = io(`${import.meta.env.VITE_WS_URL}/practice-chat`, {
    transports: ['websocket']
  });

  const bindDisconnected = scopeBind(disconnected, { safe: true });
  const bindRawMessageReceived = scopeBind(rawMessageReceived, { safe: true });
  const bindHistoryReceived = scopeBind(historyReceived, { safe: true });

  return new Promise<Socket>((resolve, reject) => {
    socket.on('connect', () => {
      resolve(socket);
    });

    socket.on('newMessage', (message) => {
      bindRawMessageReceived(JSON.stringify(message));
    });

    socket.emit('joinPracticeChat', practiceId, (messages: any) => {
      bindHistoryReceived(messages);
    });

    socket.on('disconnect', () => {
      bindDisconnected();
    });

    socket.on('connect_error', (err) => {
      bindDisconnected();
      reject(err);
    });
  });
});

export const $connection = createStore<Socket | null>(null)
  .on(connectFx.doneData, (_, socket) => socket)
  .on(disconnected, (socket) => socket?.disconnect() && null);

const $messages = createStore<any>([]).on(historyReceived, (state, message) => [
  ...state,
  ...message
]);

$messages.watch((messages) => {
  console.log('messages', messages);
});
