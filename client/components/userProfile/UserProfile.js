import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { MainContainer, Subtitle, Text, Title } from '../styled'

class UserProfile extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ 
        userId: PropTypes.string.isRequired
      })
    }).isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      user: PropTypes.object
    }).isRequired,
  }

  static fragments = {
    user: gql`
      fragment UserProfile on User {
        firstName
        lastName
        fullName
        avatar
        email
        city
        posts {
          title
          postId
        }
      }
      
    `
  }

  render () {
    // console.log('User Profile logs props', this.props)
    const { loading, user } = this.props.data
    if (loading) return <Text>Loading...</Text>
    const { firstName, email, city, avatar, fullName, posts } = user
    return (
      <MainContainer>
        <Title>{firstName}'s Profile</Title>
        <img src={avatar} />
        <Subtitle>{fullName}</Subtitle>
        <Text>From {city}</Text>
        <Text>{email.toLowerCase()}</Text>
        <Text>{firstName} has {posts.length} posts</Text>
      </MainContainer>
    )
  }
}

const UserProfileQuery = gql`
  query UserProfileDataQuery($userId: String!) {
    user(userId: $userId) {
      ...UserProfile
    }
  }
  ${UserProfile.fragments.user}
`

const UserProfileWithData = graphql(UserProfileQuery, {
  options: (ownProps) => ({
    variables: {
      userId: ownProps.match.params.userId,
    }
  })
})(UserProfile)

export default UserProfileWithData

