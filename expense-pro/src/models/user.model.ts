export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    token: string;
    role: string;
    income: number;
    dateJoined: Date;
}