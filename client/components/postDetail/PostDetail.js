import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

import { MainContainer, Subtitle, Text, Title } from '../styled'

class PostDetail extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ 
        postId: PropTypes.string.isRequired
      })
    }).isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      post: PropTypes.object
    }).isRequired,
  }

  static fragments = {
    post: gql`
      fragment PostDetail on Post {
        title
        content
        author {
          fullName
        }
      }
    `
  }

  render() {
    // console.log('Post detail render logs props', this.props)
    const { loading, post } = this.props.data
    if (loading) return <Text>Loading...</Text>
    const { author, content, title } = post
    return (
      <MainContainer>
        <Title>{title}</Title>
        <Subtitle>By {author.fullName}</Subtitle>
        <Text>{content}</Text>
      </MainContainer>
    )
  }
}

const PostDetailQuery = gql`
  query PostDetailQuery($postId: String!) {
    post(postId: $postId) {
      ...PostDetail
    }
  }
  ${PostDetail.fragments.post}
`

const PostDetailWithData = graphql(PostDetailQuery, {
  options: (ownProps) => ({
    variables: {
      postId: ownProps.match.params.postId,
    }
  })
})(PostDetail)

export default PostDetailWithData
