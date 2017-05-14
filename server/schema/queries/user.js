import { GraphQLString } from 'graphql'
import { UserType } from '../types'

const UserQuery = {
  type: UserType,
  args: {
    userId: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  resolve(root, args, { db }) {
    return db.models.user.findOne({ where: args })
  }
}

export default UserQuery
