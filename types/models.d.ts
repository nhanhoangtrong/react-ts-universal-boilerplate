declare interface ITodoItem {
    id?: string;
    text?: string;
    completed?: boolean;
    owner?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

declare interface IUser {
    userId?: any;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

declare interface IUserRole {
    role?: string;
    name?: string;
    description?: string;
}
