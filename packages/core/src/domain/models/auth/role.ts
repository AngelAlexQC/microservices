import { Permission } from "./permission";

export interface Role {
    name: string;
    description: string;
    permissions: Permission[];
}
