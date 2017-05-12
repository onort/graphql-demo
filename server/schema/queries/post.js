import { GraphQLString } from 'graphql'
import { PostType } from '../types'

const PostQuery = {
  type: PostType,
  args: {
    postId: { type: GraphQLString }
  },
  resolve(root, args, { db }) {
    return db.models.post.findOne({ where: args })
  }
}

export default PostQuery
