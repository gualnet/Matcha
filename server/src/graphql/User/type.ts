import * as graphql from 'graphql';

const { GraphQLObjectType } = graphql;
const { GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLFloat } = graphql;

const USERS = [{ id: 1, login: 'starTest' }];

const userFields = () => {
  return {
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    login: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    mail: { type: GraphQLString },
    gender: { type: GraphQLInt },
    orientation: { type: GraphQLInt },
    bio: { type: GraphQLString },
    interest: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    geolocAuth: { type: GraphQLInt },
    blockedUsers: { type: GraphQLString },
    reported: { type: GraphQLString },
    height: { type: GraphQLFloat },
    eyeColor: { type: GraphQLInt },
    hairColor: { type: GraphQLInt },
    connected: { type: GraphQLBoolean }
  };
};

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: userFields(),
});

export default UserType;