import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import { CityType, UserType } from '../types'

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'Fields expected from user',
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
  description: 'Creates a new user on database.',
  args: {
    input: { type: new GraphQLNonNull(UserInputType) }
  },
  resolve(obj, args, { db }) {
    args.input.userId = `u${Date.now()}`
    return db.models.user.create(args.input)
  }
}

export default AddUserMutation
