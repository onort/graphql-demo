import { GraphQLInt, GraphQLList } from 'graphql'
import { PostType } from '../types'

const AllPostsQuery = {
  type: new GraphQLList(PostType),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
  },
  resolve(root, args, { db }) {
    return db.models.post.findAll({ limit: args.limit, offset: args.offset, order: [[ 'createdAt', 'DESC' ]] })
  }
}

export default AllPostsQuery
