import { GraphQLObjectType } from 'graphql'
import AddUserMutation from './addUser'

const RootMutation =  new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Available mutations.',
  fields: () => ({
    AddUser: AddUserMutation
  })
})

export default RootMutation
