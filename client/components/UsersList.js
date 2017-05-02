import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import {Text} from './styled'

class UsersList extends Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      users: PropTypes.array,
    }).isRequired,
  }

  render() {
    console.log('Render Logs props', this.props) // eslint-disable-line
    const { loading, users } = this.props.data
    if (loading) return <div>Loading...</div>
    return (
      <div>
        <Text>Users list has {users.length} items.</Text>
      </div>
    )
  }
}

const UsersQuery = gql`
  query {
    users {
      firstName
      lastName
    }
  }
`

const UsersListWithData = graphql(UsersQuery)(UsersList)

export default UsersListWithData
