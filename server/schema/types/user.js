import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { CityType, PostType } from './'

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents user object type',
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
      resolve: user => user.getPosts() // method provided by sequelize
    }
  })
})

export default UserType
