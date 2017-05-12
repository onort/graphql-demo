import { GraphQLList } from 'graphql'
import { CityType, UserType } from '../types'

const AllUsersQuery = {
  type: new GraphQLList(UserType),
  args: {
    city: { type: CityType },
  },
  resolve(root, args, { db }) {
    return db.models.user.findAll({ where: args }) // returns a promise
  }
}

export default AllUsersQuery
