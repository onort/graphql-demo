import { GraphQLList } from 'graphql'
import { PostType } from '../types'

const AllPostsQuery = {
  type: new GraphQLList(PostType),
  resolve(root, args, { db }) {
    return db.models.post.findAll()
  }
}

export default AllPostsQuery
