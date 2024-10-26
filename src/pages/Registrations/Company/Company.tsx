import {
  Button,
  Center,
  Flex,
  Grid,
  Input,
  TextInput,
  Title,
} from '@mantine/core'
import { IMaskInput } from 'react-imask'

import classes from './Company.module.css'

const Company = () => {
  return (
    <Center className={classes.main}>
      <Flex
        gap="md"
        justify="flex-start"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Title order={2}>Регистрация компании</Title>

        <form className={classes.form}>
          <Grid>
            <Grid.Col span={{ xs: 12, sm: 6 }}>
              <TextInput
                className={classes.input}
                label="Название компании"
                placeholder="Введите название компании"
              />
              <TextInput
                className={classes.input}
                label="Контактное лицо"
                placeholder="Введите имя контактного лица"
              />
              <TextInput
                className={classes.input}
                label="Адрес"
                placeholder="Введите адрес компании"
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6 }}>
              <TextInput
                className={classes.input}
                label="Электронная почта"
                placeholder="example@company.com"
              />
              <Input.Wrapper className={classes.input} label="Телефон">
                <Input
                  component={IMaskInput}
                  mask="+7 (000) 000-00-00"
                  placeholder="Введите номер телефона"
                />
              </Input.Wrapper>
              <TextInput
                className={classes.input}
                label="Отрасль"
                placeholder="Укажите отрасль компании"
              />
            </Grid.Col>
          </Grid>

          <TextInput
            className={classes.input}
            classNames={{ description: classes.description }}
            label="Пароль"
            placeholder="Придумайте пароль"
            description="Пароль должен содержать не менее 8 символов, включать одну заглавную букву, одну строчную букву, цифру и специальный символ (например, !@#$%)"
          />
          <TextInput
            className={classes.input}
            label="Подтверждение пароля"
            placeholder="Повторите пароль"
          />

          <Button mt={15} w="100%">
            Зарегистрироваться
          </Button>
        </form>
      </Flex>
    </Center>
  )
}

// eslint-disable-next-line import/no-default-export
export default Company
