export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED = 'BLOCKED',
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    password?: string;
    picture?: string;
    phone?: string;
    isVerified: boolean;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    posts?: any[];
}
