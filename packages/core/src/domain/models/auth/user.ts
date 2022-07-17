import { Role } from "./role";

export interface Name {
    first: string;
    last: string;
}

export interface User {
    name: Name | string;
    email: string;
    password: string | null;
    roles: Role[];
}
