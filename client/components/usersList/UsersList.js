import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, gql } from 'react-apollo'

import { MainContainer, Text, Title } from '../styled'
import UserListItem from './UserListItem'

class UsersList extends Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      users: PropTypes.array,
    }).isRequired,
  }

  render() {
    // console.log('Render Logs props', this.props) // eslint-disable-line
    const { loading, users } = this.props.data
    if (loading) return <div>Loading...</div>
    return (
      <MainContainer>
        <Title>Users List</Title>
        <Text>Users list has {users.length} items.</Text>
        {users.map(user => <UserListItem key={user.userId} user={user} />)}
      </MainContainer>
    )
  }
}

const UsersListQuery = gql`
  query {
    users {
      ...UserListItem
    }
  }
  ${UserListItem.fragments.user}
`

const UsersListWithData = graphql(UsersListQuery)(UsersList)

export default UsersListWithData
