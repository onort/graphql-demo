import { GraphQLObjectType } from 'graphql'
import { allPosts, allUsers, post, user } from './queries'

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Available queries',
  fields: () => ({
    allPosts,
    allUsers,
    post,
    user,
  })
})

export default Query
