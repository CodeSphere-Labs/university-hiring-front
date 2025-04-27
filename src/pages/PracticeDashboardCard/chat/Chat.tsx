import { Avatar, Button, Group, Paper, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';

import { $user } from '@/shared/session/model';

import { $practice } from '../model/model';
import { $message, $messages, messageChanged, messageSended } from './chat.model';

import classes from './styles.module.css';

export const Chat = () => {
  const [message, messages, practice, user] = useUnit([$message, $messages, $practice, $user]);
  const viewportRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    messageSended();
  };

  const isSupervisor = (userId: number | string) => {
    return practice && practice.supervisor && String(practice.supervisor.id) === String(userId);
  };

  const isMyMessage = (userId: number | string) => {
    return user?.id === userId;
  };

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Paper className={classes.chatContainer} h='100%' p='md' shadow='xs'>
      <Stack h='100%'>
        <Text fw={700} size='lg'>
          Чат
        </Text>

        <ScrollArea className={classes.scrollArea} viewportRef={viewportRef}>
          <Stack gap='md'>
            {messages.map((msg: any) => {
              const isFromSupervisor = isSupervisor(msg.user.id);
              const isMine = isMyMessage(msg.userId);

              return (
                <Group key={msg.id} className={isMine ? classes.myMessage : classes.otherMessage}>
                  {!isMine && (
                    <Avatar
                      alt={`${msg.user.firstName} ${msg.user.lastName}`}
                      className={isFromSupervisor ? classes.supervisorAvatar : ''}
                      radius='xl'
                      size='sm'
                      src={msg.user.avatarUrl}
                    />
                  )}
                  <div className={classes.messageContent}>
                    {!isMine && (
                      <Text
                        c='dimmed'
                        className={isFromSupervisor ? classes.supervisorName : ''}
                        fw={500}
                        size='xs'
                      >
                        {msg.user.firstName} {msg.user.lastName}
                        {isFromSupervisor && ' • Руководитель практики'}
                      </Text>
                    )}
                    <Paper
                      className={
                        isMine
                          ? classes.myMessageBubble
                          : isFromSupervisor
                            ? classes.supervisorMessageBubble
                            : classes.otherMessageBubble
                      }
                      p='xs'
                      radius='md'
                    >
                      <Text size='sm'>{msg.content}</Text>
                    </Paper>
                    <Text c='dimmed' size='xs'>
                      {dayjs(msg.createdAt).format('HH:mm')}
                    </Text>
                  </div>
                </Group>
              );
            })}
          </Stack>
        </ScrollArea>

        <Group
          component='form'
          // incorrect type definition for onSubmit for Group component
          // eslint-disable-next-line ts/ban-ts-comment
          // @ts-expect-error
          onSubmit={handleSubmit}
        >
          <TextInput
            className={classes.input}
            radius='md'
            value={message}
            onChange={(e) => messageChanged(e.currentTarget.value)}
            placeholder='Напишите сообщение...'
          />
          <Button disabled={!message.trim()} radius='md' type='submit' variant='filled'>
            <IconSend size={18} />
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};
