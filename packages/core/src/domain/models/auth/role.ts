import Permission from "./permission";

export default interface Role {
    name: string;
    description: string;
    permissions: Permission[];
}
