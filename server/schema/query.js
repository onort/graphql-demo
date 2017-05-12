import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { CityType, PostType, UserType } from './types'

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is root query.',
  fields: () => ({
    allUsers: {
      type: new GraphQLList(UserType),
      args: {
        city: { type: CityType },
      },
      resolve(root, args, { db }) {
        return db.models.user.findAll({ where: args }) // returns a promise
      }
    },
    user: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve(root, args, { db }) {
        return db.models.user.findOne({ where: args })
      }
    },
    post: {
      type: PostType,
      args: {
        postId: { type: GraphQLString }
      },
      resolve(root, args, { db }) {
        return db.models.post.findOne({ where: args })
      }
    },
    allPosts: {
      type: new GraphQLList(PostType),
      resolve(root, args, { db }) {
        return db.models.post.findAll()
      }
    }
  })
})

export default Query
