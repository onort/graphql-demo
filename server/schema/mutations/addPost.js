import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import { PostType } from '../types'

const PostInputType = new GraphQLInputObjectType({
  name: 'PostInput',
  description: 'Fields expected from client to create a new post',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
  }
})

const AddPostMutation = {
  type: PostType,
  description: 'Creates a new post entry in database.',
  args: {
    post: { type: new GraphQLNonNull(PostInputType) },
  },
  resolve(obj, args, context) {
    args.post.postId = `p${Date.now()}`
    return context.db.models.post.create(args.post)
  }
}

export default AddPostMutation
