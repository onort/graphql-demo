import { GraphQLSchema } from 'graphql'
import Query from './query'
import RootMutation from './mutations'

const Schema = new GraphQLSchema({
  query: Query,
  mutation: RootMutation,
})

export default Schema
