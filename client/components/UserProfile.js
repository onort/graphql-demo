import React from 'react'
import PropTypes from 'prop-types'
import { MainContainer, Subtitle, Title } from './styled'

const UserProfile = (props) => {
  const {userId} = props.match.params
  return (
    <MainContainer>
      <Title>User Profile</Title>
      <Subtitle>userId: {userId}</Subtitle>
    </MainContainer>
  )
}

UserProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ 
      userId: PropTypes.string.isRequired
    })
  }).isRequired,
}

export default UserProfile
