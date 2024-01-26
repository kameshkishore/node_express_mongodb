export enum Role {
    user = 'USER',
    admin = 'ADMIN'
}

export interface CreateUserData {
    email: string;
    userName: string;
    authentication: {
        salt: string;
        password: Buffer;
    }
    role?: Role;
}

export interface UpdateUserData {
    userName: string;
}