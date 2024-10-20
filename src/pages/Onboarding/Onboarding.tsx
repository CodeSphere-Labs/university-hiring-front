import {
  Button,
  Container,
  Group,
  Image,
  List,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { Link } from 'atomic-router-react'

// eslint-disable-next-line import/no-unresolved
import image from '/onboarding.svg'
import { routes } from '@/shared/routing'

import classes from './onboarding.module.css'

function Onboarding() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Современная</span> платформа для{' '}
            <br /> университетов и компаний
          </Title>
          <Text c="dimmed" mt="md">
            Наша платформа помогает университетам и компаниям эффективно
            организовывать стажировки и практики для студентов. Управляйте
            студентами, отслеживайте их навыки и находите лучших кандидатов.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={<ThemeIcon size={20} radius="xl" />}
          >
            <List.Item>
              <b>Для университетов</b> – контролируйте процесс стажировок,
              находите компании для проведения практик
            </List.Item>
            <List.Item>
              <b>Для компаний</b> – находите студентов по навыкам и уровню
              образования для предложений по стажировкам
            </List.Item>
            <List.Item>
              <b>Простая регистрация</b> – быстрая регистрация, выберите вашу
              организацию для продолжения
            </List.Item>
          </List>

          <Group mt={30}>
            <Button
              component={Link}
              to={routes.auth.company}
              radius="xl"
              size="md"
              className={classes.control}
            >
              Компания
            </Button>
            <Button
              component={Link}
              to={routes.auth.university}
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Университет
            </Button>
          </Group>
        </div>

        <Image src={image} className={classes.image} />
      </div>
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default Onboarding
