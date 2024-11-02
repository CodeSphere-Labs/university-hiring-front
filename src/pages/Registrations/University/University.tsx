import { Button, Center, Flex, Grid, Title } from '@mantine/core'
import { FormEventHandler, useEffect } from 'react'

import {
  Address,
  ContactName,
  Email,
  Password,
  PasswordRepeat,
  Phone,
  UniversityName,
} from '../components'
import { pageMounted, registretionFormSubmitted } from '../model'
import classes from './University.module.css'

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
              <UniversityName />
              <ContactName />
              <Address />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6 }}>
              <Email />
              <Phone />
            </Grid.Col>
          </Grid>

          <Password />
          <PasswordRepeat />

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
