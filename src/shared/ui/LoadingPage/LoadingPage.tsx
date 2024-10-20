import { Loader } from '@mantine/core'

import classes from './LoadingPage.module.css'

export const LoadingPage = () => {
  return (
    <div className={classes.main}>
      <Loader color="blue" />
    </div>
  )
}
