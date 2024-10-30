export interface PAuth {
    login: string;
    password: string;
}

export interface AdminState {
    admins: Admin[];
    currentAdmin: Admin;
    isAuthenticated: boolean;
}

export enum ROLES {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
}

export interface AdminDto {
    id: number; 
    login: string;
    password: string; 
    username: string;
    surname: string;
    email: string;
}


export interface AuthResponse {
    token: string;
    admin: Admin;
}

export interface PRegister extends Omit<AdminDto, 'id'> {}

export interface Admin extends AdminDto {}
