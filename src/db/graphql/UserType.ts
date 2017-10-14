import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';

export const UserType = new GraphQLObjectType({
    name: 'user',
    description: 'normal user',
    fields: {
        _id: {
            type: GraphQLID,
            description: 'The id of the user',
        },
        firstName: {
            type: GraphQLString,
            description: 'The first name',
        },
        lastName: {
            type: GraphQLString,
            description: 'The last name',
        },
        email: {
            type: GraphQLString,
            description: 'The email address',
        },
        createdAt: {
            type: GraphQLString,
            description: 'The created datetime of the user',
        },
        updatedAt: {
            type: GraphQLString,
            description: 'The updated datetime of the user',
        },
    },
});
