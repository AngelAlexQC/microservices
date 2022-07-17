export enum TenantStatus {
    Active = 'Active',
    Inactive = 'Inactive',
    Deleted = 'Deleted',
}

export interface Tenant {
    name: string;
    description: string;
    status: TenantStatus;
    createdAt: Date;
    updatedAt: Date;
}
