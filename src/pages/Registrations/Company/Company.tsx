import { Button, Center, Flex, Grid, Title } from '@mantine/core'
import { FormEventHandler, useEffect } from 'react'

import {
  Address,
  ContactName,
  Email,
  Industry,
  OrganizationName,
  Password,
  PasswordRepeat,
  Phone,
} from '../components'
import classes from './Company.module.css'
import { fields, pageMounted, registretionFormSubmitted } from './model'

const Company = () => {
  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    registretionFormSubmitted()
  }

  useEffect(() => {
    pageMounted()
  }, [])

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

        <form className={classes.form} onSubmit={onFormSubmit}>
          <Grid>
            <Grid.Col span={{ xs: 12, sm: 6 }}>
              <OrganizationName
                label="Название компании"
                placeholder="Введите название компании"
                model={fields.company}
              />
              <ContactName model={fields.contactName} />
              <Address model={fields.address} />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6 }}>
              <Email model={fields.email} />
              <Phone model={fields.phone} />

              <Industry model={fields.industry} />
            </Grid.Col>
          </Grid>

          <Password model={fields.password} />
          <PasswordRepeat model={fields.passwordRepeat} />

          <Button type="submit" mt={15} w="100%">
            Зарегистрироваться
          </Button>
        </form>
      </Flex>
    </Center>
  )
}

// eslint-disable-next-line import/no-default-export
export default Company
