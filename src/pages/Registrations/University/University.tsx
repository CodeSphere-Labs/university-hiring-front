import { Button, Center, Flex, Grid, Title } from '@mantine/core'
import { FormEventHandler, useEffect } from 'react'

import {
  Address,
  ContactName,
  Email,
  OrganizationName,
  Password,
  PasswordRepeat,
  Phone,
} from '../components'
import { pageMounted, registretionFormSubmitted } from './model'
import classes from './University.module.css'

import { fields } from './model'

const University = () => {
  useEffect(() => {
    pageMounted()
  }, [])

  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    registretionFormSubmitted()
  }

  return (
    <Center className={classes.main}>
      <Flex
        gap="md"
        justify="flex-start"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Title order={2}>Регистрация университета</Title>

        <form className={classes.form} onSubmit={onFormSubmit}>
          <Grid>
            <Grid.Col span={{ xs: 12, sm: 6 }}>
              <OrganizationName label="Название университета" placeholder="Введите название университета" model={fields.university} />
              <ContactName model={fields.contactName}/>
              <Address model={fields.address} />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6 }}>
              <Email model={fields.email} />
              <Phone model={fields.phone} />
            </Grid.Col>
          </Grid>

          <Password model={fields.password} />
          <PasswordRepeat model={fields.passwordRepeat}/>

          <Button type="submit" mt={15} w="100%">
            Зарегистрироваться
          </Button>
        </form>
      </Flex>
    </Center>
  )
}

// eslint-disable-next-line import/no-default-export
export default University
