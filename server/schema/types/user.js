import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { CityType, PostType } from './'

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents user object type. Posts can be limited or have an offset',
  fields: () => ({
    userId: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: user => `${user.firstName} ${user.lastName}`
    },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString },
    city: { type: CityType },
    posts: {
      type: new GraphQLList(PostType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt }
      },
      resolve: (user, args) => user.getPosts(args) // method provided by sequelize
    }
  })
})

export default UserType
