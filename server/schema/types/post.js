import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents post object type.',
  fields: () => ({
    slug: { type: new GraphQLNonNull(GraphQLString) },
    postId: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
  })
})

export default PostType
