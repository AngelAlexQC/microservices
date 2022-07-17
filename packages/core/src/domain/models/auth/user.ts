import Role from "./role";

export default interface Name {
    first: string;
    last: string;
}

export default interface User {
    name: Name | string;
    email: string;
    password: string | null;
    roles: Role[];
}
