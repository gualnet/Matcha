import * as graphql from 'graphql';

import UserType from './type';

const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

const userQueries = new GraphQLObjectType({
	name   : 'userQueries',
	fields : {
		user : {
			type    : UserType,
			args    : { id: { type: GraphQLID } },

			resolve(parent, args) {
        try {
          // code to get data from db
        } catch (error) {
          console.error(error);
        }
			}
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        // return DB_DATA.books;
        try {
          // code to get data from db
          return [{id: 1, login: "Test01"}, {id: 2, login: "Test02"}]
        } catch (error) {
          console.error(error); 
        }
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
    },
  },
});

const UserSchema = new GraphQLSchema({
  query : userQueries,
  // mutation: userMutation,
});

export default UserSchema;