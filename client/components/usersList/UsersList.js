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
      allUsers: PropTypes.array,
    }).isRequired,
  }

  render() {
    // console.log('Render Logs props', this.props) // eslint-disable-line
    const { loading, allUsers } = this.props.data
    if (loading) return <div>Loading...</div>
    return (
      <MainContainer>
        <Title>Users List</Title>
        <Text>Users list has {allUsers.length} items.</Text>
        {allUsers.map(user => <UserListItem key={user.userId} user={user} />)}
      </MainContainer>
    )
  }
}

const UsersListQuery = gql`
  query getUsersInfo {
    allUsers {
      ...UserListItem
    }
  }
  ${UserListItem.fragments.user}
`

const UsersListWithData = graphql(UsersListQuery)(UsersList)

export default UsersListWithData
