import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { BookmarkType, UserType } from './types'
import Db from '../db'

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is root query.',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      args: {
        userId: { type: GraphQLString },
        firstName: { type: GraphQLString },
        city: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(root, args) {
        return Db.models.user.findAll({ where: args }) // returns a promise
      }
    },
    bookmarks: {
      type: new GraphQLList(BookmarkType),
      args: {
        bookmarkId: { type: GraphQLString },
        title: { type: GraphQLString },
      },
      resolve(root, args) {
        return Db.models.bookmark.findAll({ where: args })
      }
    }
  })
})

export default Query
