import { GraphQLObjectType } from 'graphql'
import AddUserMutation from './addUser'

const RootMutation =  new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    AddUser: AddUserMutation
  })
})

export default RootMutation
