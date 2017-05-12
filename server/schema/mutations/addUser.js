import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import { CityType, UserType } from '../types'

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    avatar: { type: GraphQLString },
    city: { type: new GraphQLNonNull(CityType) },
  }
})

const AddUserMutation = {
  type: UserType,
  description: 'Add user mutation',
  args: {
    input: { type: new GraphQLNonNull(UserInputType) }
  },
  resolve(obj, args, { db }) {
    // TODO: validate input
    if (!args.input.avatar) args.input.avatar = null
    args.input.userId = `u${Date.now()}`
    return db.models.user.create(args.input)
  }
}

export default AddUserMutation
