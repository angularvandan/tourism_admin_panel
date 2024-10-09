export interface UserDetails {
    id: string;
    name: string;
    email: string;
    phone_no: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class User {
    userData!:UserDetails;
    token!: string;
}