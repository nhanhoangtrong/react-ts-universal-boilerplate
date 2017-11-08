import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLList, GraphQLFieldConfig, GraphQLObjectTypeConfig } from 'graphql';
import { User } from '../';

export const userType = new GraphQLObjectType({
    name: 'user',
    description: 'normal user',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The global unique id of user',
        },
        firstName: {
            type: GraphQLString,
            description: 'The first name of current user.',
        },
        lastName: {
            type: GraphQLString,
            description: 'The last name of current user.',
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The unique email address of user.',
        },
        createdAt: {
            type: GraphQLString,
            description: 'The created datetime of the user',
            resolve: (rootUser, {}, { user }, info) => {
                // Only return createdAt field if user is owner or admin
                if (user && (user.sub === rootUser.id || user.admin) && rootUser.createdAt) {
                    return rootUser.updatedAt.toString();
                }
                return null;
            },
        },
        updatedAt: {
            type: GraphQLString,
            description: 'The updated datetime of the user',
            resolve: (rootUser, { }, { user }, info) => {
                // Only return updatedAt field if user is owner or admin
                if (user && (user.sub === rootUser.id || user.admin) && rootUser.updatedAt) {
                    return rootUser.updatedAt.toString();
                }
                return null;
            },
        },
    },
});

export const userQueryType = new GraphQLObjectType({
    name: 'UserQueryType',
    fields: {
        node: {
            type: userType,
            args: {
                id: {
                    type: GraphQLID,
                },
                email: {
                    type: GraphQLString,
                },
            },
            resolve: (root, { id, email }, ctx, info) => {
                if (ctx.user.sub === 'guest') {
                    return {
                        id: ctx.user.sub,
                        firstName: ctx.user.name,
                        lastName: ctx.user.name,
                        email: '',
                    };
                }
                if (id) {
                    return User.findById(id).exec().then(user => {
                        return user ? {
                            id: user._id.toString(),
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,
                        } : null;
                    });
                } else if (email) {
                    return User.findOne({email}).exec().then(user => {
                        return user ? {
                            id: user._id.toString(),
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,
                        } : null;
                    });
                }
                return null;
            }
        },
        edges: {
            type: new GraphQLList(userType),
            resolve: (root, { }, { user }, info) => {
                if (user.sub === 'guest') {
                    return [{
                        id: user.sub,
                        firstName: user.name,
                        lastName: user.name,
                        email: '',
                        createdAt: '',
                        updatedAt: '',
                    }];
                }
                return User.find({}).exec().then(users => {
                    return users.map(user => ({
                        id: user._id.toString(),
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    }));
                });
            },
        },
    },
});

export const userMutationType = new GraphQLObjectType({
    name: 'UserMutationType',
    description: 'Mutation user.',
    fields: {
        addUser: {
            type: userType,
            args: {
                firstName: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                lastName: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString),
                },
            },
            resolve: (root, args, context, info) => {
                return User.create({
                    ...args,
                }).then(user => {
                    return user ? {
                        id: user._id.toString(),
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    } : null;
                });
            },
        },
        editUser: {
            type: GraphQLBoolean,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
                firstName: {
                    type: GraphQLString,
                },
                lastName: {
                    type: GraphQLString,
                },
            },
            resolve: (root, { id, firstName, lastName }, { user }, info) => {
                if (user && (user.sub === id || user.admin)) {
                    return User.findByIdAndUpdate(id, {
                        firstName,
                        lastName,
                    }).exec().then(user => {
                        return user ? true : false;
                    });
                }
                throw new Error('Not have permission');
            },
        },
        removeUser: {
            type: GraphQLBoolean,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
            resolve: (root, { id }, { user }, info) => {
                // Only this user or admin can remove their own account
                if (user && (user.sub === id || user.admin)) {
                    return User.findByIdAndRemove(id).exec().then(user => {
                        return user ? true : false;
                    });
                }
                throw new Error('Not have permission');
            },
        },
    },
});
