import * as graphql from 'graphql';

import UserType, {inputUpdateUserType} from './type';
import UserHandler from '../../handlers/User'

const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

const userQueries = new GraphQLObjectType({
	name   : 'userQueries',
	fields : {
		getUser : {
			type    : UserType,
			args    : { id: { type: GraphQLID } },

			async resolve(parent, args) {
        return await UserHandler.getUserById(args.id)
			}
    },
    getUsers: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        return UserHandler.getAllUsers()
      }
    },
	}
});

const userMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        login: { type: GraphQLString },
        mail: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await UserHandler.createNewUser(args)
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        data: { type: inputUpdateUserType},
      },
      async resolve(parent, args) {
        return await UserHandler.updateUser(args)
      }
    }
  },
});

const UserSchema = new GraphQLSchema({
  query : userQueries,
  mutation: userMutation,
});

export default UserSchema;