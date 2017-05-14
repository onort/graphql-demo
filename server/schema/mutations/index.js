import { GraphQLObjectType } from 'graphql'
import AddUserMutation from './addUser'
import AddPostMutation from './addPost'

const RootMutation =  new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Available mutations.',
  fields: () => ({
    AddUser: AddUserMutation,
    AddPost: AddPostMutation,
  })
})

export default RootMutation
