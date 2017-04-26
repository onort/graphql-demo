import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import BookmarkType from './bookmark'

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents user object type',
  fields: () => ({
    userId: {
      type: GraphQLString,
      resolve(user) {
        return user.userId
      }
    },
    firstName: {
      type: GraphQLString,
      resolve(user) {
        return user.firstName
      }
    },
    lastName: {
      type: GraphQLString,
      resolve(user) {
        return user.lastName
      }
    },
    email: {
      type: GraphQLString,
      resolve(user) {
        return user.email
      }
    },
    avatar: {
      type: GraphQLString,
      resolve(user) {
        return user.avatar
      }
    },
    city: {
      type: GraphQLString,
      resolve(user) {
        return user.city
      }
    },
    bookmarks: {
      type: new GraphQLList(BookmarkType),
      resolve(user) {
        return user.getBookmarks() // method provided by sequelize
      }
    }
  })
})

export default UserType
