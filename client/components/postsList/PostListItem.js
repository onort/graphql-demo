import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Text } from '../styled'

const PostListItem = ({ post }) => {
  const { postId, title, slug } = post
  return (
    <Link to={`/post/${postId}`}>
      <Text>
        {title}
      </Text>
    </Link>
  )
}

PostListItem.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostListItem
