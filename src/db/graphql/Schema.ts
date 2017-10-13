import { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import User from '../models/User';
import { TodoItemType } from './TodoType';
import { UserType } from './UserType';

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

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export const getProjection = (fieldASTs: any) => {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections: any, selection: any) => {
        projections[selection.name.value] = true;
        return projections;
    }, {});
}

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            users: {
                type: new GraphQLList(UserType),
                resolve: (root, { userId }, context, info) => {
                    return new Promise((resolve, reject) => {
                        User.find({}, getProjection(info), (err, users) => err ? reject(err) : resolve(users));
                    });
                },
            },
        },
    }),
});

