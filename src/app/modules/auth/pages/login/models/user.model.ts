export interface User {
    id: number;
    name: string;
    email: string;
}
export interface AuthLoginApi {
    message: string;
    status: number;
    data: {
        user: User;
        access_token: string;
    }
}