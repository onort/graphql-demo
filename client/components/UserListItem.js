import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { gql } from 'react-apollo'
import styled from 'styled-components'

import { Text } from './styled'

const Frame = styled.div`
  padding: 1em;
  width: 120px;
  height: 120px;
  display: inline-block;
  border: 1px solid #939393;
  border-radius: 4px;
  margin: 4px;
  cursor: pointer;
  background-color: #ededed;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 8px;
`

const Name = styled(Text)`
  text-align: center;
  padding-top: 4px;
`

const UserListItem = ({ user }) => {
  return (
    <Link to={`/user/${user.userId}`}>
      <Frame>
        <ImageContainer>
          <img src={user.avatar} width="100px" height="100px" />
        </ImageContainer>
        <Name>
          {user.firstName}
        </Name>
      </Frame>
    </Link>
  )
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
}

UserListItem.fragments = {
  user: gql`
    fragment UserListItem on User {
      userId
      firstName
      lastName
      avatar
    }
  `
}

export default UserListItem
