import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, gql } from 'react-apollo'

import { MainContainer, Text } from '../styled'
import PostListItem from './PostListItem'

class PostsList extends Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allPosts: PropTypes.array,
    }).isRequired,
  }

  render() {
    const { loading, allPosts } = this.props.data
    if (loading) return <div>Loading...</div>
    return (
      <MainContainer>
        <Text>This is posts list component.</Text>
        {allPosts.map(post => <PostListItem key={post.postId} post={post} />)}
      </MainContainer>
    )
  }
}

const PostsListQuery = gql`
  query PostListQuery {
    allPosts {
      title
      postId
      slug
    }
  }
`

const PostListWithData = graphql(PostsListQuery)(PostsList)

export default PostListWithData
