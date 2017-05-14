import { GraphQLInt, GraphQLList } from 'graphql'
import { CityType, UserType } from '../types'

const AllUsersQuery = {
  type: new GraphQLList(UserType),
  args: {
    city: { type: CityType },
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
  },
  resolve(root, args, { db }) {
    const { limit, offset } = args
    let conditions = {}
    if (args.city) conditions = { city: args.city}
    return db.models.user.findAll({ where: conditions, limit, offset })
  }
}

export default AllUsersQuery
