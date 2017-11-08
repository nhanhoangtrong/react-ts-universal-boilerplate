import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { userType } from './UserType';
import { TodoItem } from '../';
import * as uuidv1 from 'uuid/v1';

export const todoItemType = new GraphQLObjectType({
    name: 'TodoItem',
    description: 'The todo item with text and its status.',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The id of the todo item',
            resolve(todoItem) {
                return todoItem.id.toString();
            }
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
            type: new GraphQLNonNull(GraphQLID),
            description: 'The owner of this todo item',
        },
        createdAt: {
            type: GraphQLString,
            description: 'The created datetime of the todo item',
            resolve(todoItem) {
                return todoItem.createdAt.toString();
            },
        },
        updatedAt: {
            type: GraphQLString,
            description: 'The updated datetime of the todo item',
            resolve(todoItem) {
                return todoItem.updatedAt.toString();
            },
        },
    },
});

export const todoItemQueryType = new GraphQLObjectType({
    name: 'TodoItemQuery',
    description: 'Query the todo item.',
    fields: {
        edges: {
            type: new GraphQLNonNull(new GraphQLList(todoItemType)),
            resolve(root, {}, { user }, info) {
                return TodoItem.find({owner: user.sub}).exec();
            },
        },
        node: {
            type: todoItemType,
            args: {
                id: {
                    name: 'ID of TodoItem',
                    description: 'Get The todo item by its ID',
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
            resolve(root, { id }, { user }, info) {
                // Make sure user is the owner
                if (!user) {
                    return null;
                }
                return TodoItem.findOne({id, owner: user.sub}).exec();
            },
        },
    },
});

export const todoItemMutationType = new GraphQLObjectType({
    name: 'TodoItemMutation',
    description: 'Mutation of todo item',
    fields: {
        addTodo: {
            type: todoItemType,
            args: {
                text: {
                    type: GraphQLString,
                    description: 'Text of todo',
                },
            },
            resolve(root, { text }, { user }, info) {
                console.log('context user', user);
                if (!user || !user.sub) {
                    return null;
                }
                return TodoItem.create({
                    id: uuidv1(),
                    text,
                    owner: user.sub,
                });
            },
        },
        markTodo: {
            type: todoItemType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'ID of item for marking',
                },
            },
            resolve(root, { id }, { user }, info) {
                // Only onwer can mark the todo
                if (!user) {
                    return null;
                }
                return TodoItem.findOne({ id, owner: user.sub }).exec().then(item => {
                    if (item) {
                        item.completed = !item.completed;
                        return item.save().then(() => item);
                    }
                    return null;
                });
            },
        },
        removeTodo: {
            type: todoItemType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'ID of removing todo item',
                },
            },
            resolve(root, { id }, { user }, info) {
                if (!user) {
                    return null;
                }
                return TodoItem.findOneAndRemove({id, owner: user.sub}).exec();
            },
        },
    },
});
