import { Accordion, Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { IconSchool, IconUser, IconUsers } from '@tabler/icons-react';

interface TestAccountsProps {
  onAccountSelect: (email: string, password: string) => void;
}

const TestAccounts = ({ onAccountSelect }: TestAccountsProps) => {
  const students = [
    { email: 'student1@example.com', name: 'Алексей Петров Иванович' },
    { email: 'student2@example.com', name: 'Мария Сидорова Александровна' },
    { email: 'student3@example.com', name: 'Дмитрий Иванов Петрович' },
    { email: 'student4@example.com', name: 'Елена Козлова Сергеевна' },
    { email: 'student5@example.com', name: 'Андрей Смирнов Дмитриевич' }
  ];

  const staff = [
    { email: 'admin@example.com', name: 'Admin Admin Admin', role: 'ADMIN' },
    { email: 'staff@university.com', name: 'John Doe Smith', role: 'UNIVERSITY_STAFF' },
    { email: 'hr@company.com', name: 'Jane Smith Brown', role: 'STAFF' },
    { email: 'supervisor1@company.com', name: 'Иван Петров Сергеевич', role: 'STAFF' },
    { email: 'supervisor2@company.com', name: 'Анна Сидорова Ивановна', role: 'STAFF' }
  ];

  const handleAccountClick = (email: string) => {
    onAccountSelect(email, '12345');
  };

  return (
    <Card padding='lg' radius='md' shadow='sm' withBorder>
      <Stack gap='md'>
        <Group>
          <IconUsers size={24} />
          <Title order={3}>Тестовые аккаунты</Title>
        </Group>

        <Text c='dimmed' size='sm'>
          Для тестирования системы используйте следующие аккаунты.
          <Text fw={600} component='span'>
            {' '}
            Пароль для всех: 12345
          </Text>
        </Text>

        <Accordion variant='contained'>
          <Accordion.Item value='students'>
            <Accordion.Control>
              <Group>
                <IconSchool size={20} />
                <Text fw={500}>Студенты</Text>
                <Badge variant='light' color='blue'>
                  {students.length}
                </Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap='xs'>
                {students.map((student) => (
                  <Group key={student.email} justify='space-between' wrap='nowrap'>
                    <Stack gap={0} style={{ flex: 1 }}>
                      <Text fw={500} size='sm'>
                        {student.name}
                      </Text>
                      <Text c='dimmed' ff='monospace' size='xs'>
                        {student.email}
                      </Text>
                    </Stack>
                    <Group gap='xs'>
                      <Badge size='sm' variant='light' color='blue'>
                        STUDENT
                      </Badge>
                      <Button
                        size='xs'
                        variant='light'
                        onClick={() => handleAccountClick(student.email)}
                      >
                        Выбрать
                      </Button>
                    </Group>
                  </Group>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value='staff'>
            <Accordion.Control>
              <Group>
                <IconUser size={20} />
                <Text fw={500}>Администраторы и сотрудники</Text>
                <Badge variant='light' color='green'>
                  {staff.length}
                </Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap='xs'>
                {staff.map((user) => (
                  <Group key={user.email} justify='space-between' wrap='nowrap'>
                    <Stack gap={0} style={{ flex: 1 }}>
                      <Text fw={500} size='sm'>
                        {user.name}
                      </Text>
                      <Text c='dimmed' ff='monospace' size='xs'>
                        {user.email}
                      </Text>
                    </Stack>
                    <Group gap='xs'>
                      <Badge
                        size='sm'
                        variant='light'
                        color={user.role === 'ADMIN' ? 'red' : 'green'}
                      >
                        {user.role}
                      </Badge>
                      <Button
                        size='xs'
                        variant='light'
                        onClick={() => handleAccountClick(user.email)}
                      >
                        Выбрать
                      </Button>
                    </Group>
                  </Group>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Card>
  );
};

export default TestAccounts;
