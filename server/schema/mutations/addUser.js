import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { CityType, UserType } from '../types'
import { validateUserInput } from '../../utils'

const UserInputErrorType = new GraphQLObjectType({
  name: 'UserInputError',
  description: 'Errors on user\'s input.',
  fields: {
    field: { type: GraphQLString },
    message: { type: new GraphQLNonNull(GraphQLString) },
  }
})

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

const CreatedUserType = new GraphQLObjectType({
  name: 'CreatedUser',
  description: 'Created user or validation errors',
  fields: {
    user: { type: UserType },
    errors: { type: new GraphQLList(UserInputErrorType) }
  }
})

const AddUserMutation = {
  type: CreatedUserType,
  description: 'Creates a new user on database.',
  args: {
    input: { type: new GraphQLNonNull(UserInputType) }
  },
  resolve(obj, args, { db }) {
    let user = null
    const errors = validateUserInput(args.input)
    if (!args.input.avatar) args.input.avatar = null
    args.input.userId = `u${Date.now()}`
    if (!errors.length) user = db.models.user.create(args.input)
    return { errors, user}
  }
}

export default AddUserMutation
