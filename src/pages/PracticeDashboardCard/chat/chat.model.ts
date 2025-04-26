import type { Socket } from 'socket.io-client';

import { createEffect, createEvent, createStore, sample, scopeBind } from 'effector';
import { io } from 'socket.io-client';

export const historyReceived = createEvent<any>();
export const rawMessageReceived = createEvent<string>();
export const practiceChatConnected = createEvent<string>();
export const messageSend = createEvent<string>();
export const disconnected = createEvent();

export const messageChanged = createEvent<string>();
export const messageSended = createEvent();
export const messageReset = createEvent();

export const $message = createStore('')
  .on(messageChanged, (_, message) => message)
  .reset([disconnected, messageReset]);

export const connectFx = createEffect((practiceId: string) => {
  practiceChatConnected(practiceId);

  const socket = io(`${import.meta.env.VITE_WS_URL}/practice-chat`, {
    transports: ['websocket']
  });

  const bindDisconnected = scopeBind(disconnected, { safe: true });
  const bindRawMessageReceived = scopeBind(rawMessageReceived, { safe: true });
  const bindHistoryReceived = scopeBind(historyReceived, { safe: true });
  const bindMessageSended = scopeBind(messageSend, { safe: true });

  return new Promise<Socket>((resolve, reject) => {
    socket.on('connect', () => {
      resolve(socket);
    });

    socket.on('newMessage', (message) => {
      bindRawMessageReceived(message);
    });

    socket.emit('joinPracticeChat', practiceId, (messages: any) => {
      bindHistoryReceived(messages);
    });

    socket.emit('sendMessage', (message: any) => {
      console.log('message', message);
      bindMessageSended(message);
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
  .on(disconnected, (socket) => {
    socket?.disconnect();
    return null;
  });

export const $practiceId = createStore<string | null>(null)
  .on(practiceChatConnected, (_, id) => id)
  .reset(disconnected);

export const $messages = createStore<any>([])
  .on(historyReceived, (_, messages) => messages)
  .on(rawMessageReceived, (state, rawMessage) => {
    try {
      return [...state, rawMessage];
    } catch (e) {
      console.error('Failed to parse message', e);
      return state;
    }
  });

export const sendMessageFx = createEffect(
  ({ socket, practiceId, content }: { socket: Socket; practiceId: string; content: string }) => {
    socket.emit('sendMessage', {
      practiceId,
      message: { content }
    });
  }
);

sample({
  clock: messageSended,
  source: {
    socket: $connection,
    practiceId: $practiceId,
    content: $message
  },
  filter: ({ socket, practiceId, content }) => !!socket && !!practiceId && !!content.trim(),
  fn: ({ socket, practiceId, content }) => {
    console.log('data', {
      socket: socket!,
      practiceId: practiceId!,
      content
    });
    return {
      socket: socket!,
      practiceId: practiceId!,
      content
    };
  },
  target: sendMessageFx
});

sample({
  clock: sendMessageFx.doneData,
  target: messageReset
});
