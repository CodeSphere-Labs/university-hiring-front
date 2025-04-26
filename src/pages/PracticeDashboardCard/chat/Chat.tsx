import { Avatar, Button, Group, Paper, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';

import { $practice } from '../model';
import { $message, $messages, messageChanged, messageSended } from './chat.model';

import classes from './Chat.module.css';

export const Chat = () => {
  const [message, messages, practice] = useUnit([$message, $messages, $practice]);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const isSupervisor = (userId: number | string) => {
    return practice && practice.supervisor && String(practice.supervisor.id) === String(userId);
  };

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

              return (
                <Group
                  key={msg.id}
                  className={msg.isMine ? classes.myMessage : classes.otherMessage}
                >
                  {!msg.isMine && (
                    <Avatar
                      alt={`${msg.user.firstName} ${msg.user.lastName}`}
                      className={isFromSupervisor ? classes.supervisorAvatar : ''}
                      radius='xl'
                      size='sm'
                      src={msg.user.avatarUrl}
                    />
                  )}
                  <div className={classes.messageContent}>
                    {!msg.isMine && (
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
                        msg.isMine
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
                      {dayjs(msg.timestamp).format('HH:mm')}
                    </Text>
                  </div>
                </Group>
              );
            })}
          </Stack>
        </ScrollArea>

        <Group>
          <TextInput
            className={classes.input}
            radius='md'
            value={message}
            onChange={(e) => messageChanged(e.currentTarget.value)}
            placeholder='Напишите сообщение...'
          />
          <Button
            disabled={!message.trim()}
            radius='md'
            variant='filled'
            onClick={() => messageSended()}
          >
            <IconSend size={18} />
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};
