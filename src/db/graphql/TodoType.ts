import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';
import { UserType } from './UserType';

export const TodoItemType = new GraphQLObjectType({
    name: 'todo',
    description: 'todo item',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The id of the todo item',
        },
        text: {
            type: GraphQLString,
            description: 'The text of the todo item',
        },
        completed: {
            type: GraphQLBoolean,
            description: 'The status of the todo item',
        },
        owner: {
            type: UserType,
            description: 'The owner of this todo item',
        },
        createdAt: {
            type: GraphQLString,
            description: 'The created datetime of the todo item',
        },
        updatedAt: {
            type: GraphQLString,
            description: 'The updated datetime of the todo item',
        },
    },
});
