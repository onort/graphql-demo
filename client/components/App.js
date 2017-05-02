import React from 'react'

import { MainContainer, Subtitle, Title } from './styled'
import UsersList from './UsersList'

const App = () => (
  <MainContainer>
    <Title>Apollo React Client</Title>
    <Subtitle>Learning to consume graphql api using apollo.</Subtitle>
    <UsersList />
  </MainContainer>
)

export default App
