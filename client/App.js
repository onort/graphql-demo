import React from 'react'
import { Link } from 'react-router-dom'

import { Button, MainContainer, Subtitle, Title } from './components/styled'

const App = () => (
  <MainContainer>
    <Title>Apollo React Client</Title>
    <Subtitle>Learning to consume graphql api using apollo.</Subtitle>
    <Link to="/users">
      <Button>Users List</Button>
    </Link>
  </MainContainer>
)

export default App
