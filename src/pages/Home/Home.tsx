import { Button, Container } from '@mantine/core'

import { Navbar } from '@/widgets/Navbar/Navbar'

const Home = () => {
  return (
    <Navbar>
      <Container pt={15}>
        Home test <Button>123</Button>
      </Container>
    </Navbar>
  )
}

// eslint-disable-next-line import/no-default-export
export default Home
