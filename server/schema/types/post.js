import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { UserType } from './'

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents post object type.',
  fields: () => ({
    slug: { type: new GraphQLNonNull(GraphQLString) },
    postId: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(post) {
        return post.getUser() // provided by sequelize
      }
    }
  })
})

export default PostType
