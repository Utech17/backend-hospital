import { OrganizationalUnitsInterface } from "../interfaces";
import { UserInterface } from "../interfaces";

export enum EmployeeStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export interface EmployeeInterface {
    id?: number | string;
    phone_number: string;
    home_address: string;
    postal_code: string;
    organizational_unit_id: number | string;
    status: EmployeeStatus;
    user_id: number | string;
    createdAt:Date;
    updatedAt:Date;
    deletedAt?: string | Date | null;
    organizational_unit?: OrganizationalUnitsInterface;
    User?: UserInterface;
}