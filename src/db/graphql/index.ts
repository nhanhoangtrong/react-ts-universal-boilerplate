import { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLScalarType } from 'graphql';
import User from '../mongo/User';
import { userType, userQueryType, userMutationType } from './UserType';
import { todoItemType, todoItemQueryType, todoItemMutationType } from './TodoType';

// export const schema = buildSchema(`
//     type TodoItem {
//         id: ID
//         text: String
//         completed: Boolean
//         owner: [User]
//         createdAt: String
//         updatedAt: String
//     }

//     type User {
//         _id: ID
//         firstName: String
//         lastName: String
//         email: String
//         fullName: String
//         createdAt: String
//         updatedAt: String
//     }

//     type Query {
//         users: [String]
//         user(userId: String): User
//     }

//     schema {
//         query: Query
//     }
// `);

// export const provider = {
//     users: (...args: any[]) => {
//         return User.find({}).exec().then((users) => {
//             return users.map(user => user._id);
//         });
//     },
//     user: (args: any) => {
//         const userId = args.userId;
//         return User.findById(userId).exec().then(user => {
//             if (user) {
//                 return {
//                     _id: user._id,
//                     firstName: user.firstName,
//                     lastName: user.lastName,
//                     fullName: user.fullName,
//                     email: user.email,
//                     createdAt: user.createdAt.toString(),
//                     updatedAt: user.updatedAt.toString(),
//                 };
//             }
//             return null;
//         });
//     }
// };

const DateType = new GraphQLScalarType({
    name: "date",
    serialize: (value: Date) => {
        return value.toUTCString();
    },
});

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        description: 'The root query type of GraphQL route.',
        fields: () => ({
            users: {
                type: userQueryType,
                resolve: () => userQueryType,
            },
            todos: {
                type: todoItemQueryType,
                resolve: () => todoItemQueryType,
            },
        }),
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            users: {
                type: userMutationType,
                resolve: () => userMutationType,
            },
            todos: {
                type: todoItemMutationType,
                resolve: () => todoItemMutationType,
            },
        },
    }),
});
