export interface User {
    id: number;
    Email: string;
    DisplayName: string;
    PhoneNumber: string;
}
export interface LoginUser {
    displayName: string;
    email: string;
    token: string;
    pictureUrl: string;
}
