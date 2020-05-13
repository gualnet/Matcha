import * as graphql from 'graphql';

import UserType from './type';
import UserHandler from '../../handlers/User'

const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

const userQueries = new GraphQLObjectType({
	name   : 'userQueries',
	fields : {
		user : {
			type    : UserType,
			args    : { id: { type: GraphQLID } },

			resolve(parent, args) {
        return UserHandler.getUserById(args.id)
			}
    },
    users: {
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
      resolve(parent, args) {
        return UserHandler.createNewUser(args)
      }
    },
    updateUser: {
      type: UserType,
      args: {
        login: { type: GraphQLString },
        mail: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return UserHandler.updateUser("0", args)
      }
    }
  },
});

const UserSchema = new GraphQLSchema({
  query : userQueries,
  mutation: userMutation,
});

export default UserSchema;