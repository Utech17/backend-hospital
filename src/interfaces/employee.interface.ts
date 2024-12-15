import { OrganizationalUnitsInterface } from "../interfaces";
import { UserInterface } from "../interfaces";

export interface EmployeeInterface {
    id?: number | string;
    phone_number: string;
    home_address: string;
    postal_code: string;
    unit_id: number | string;
    status: boolean;
    user_id: number | string;
    createdAt:Date;
    updatedAt:Date;
    deletedAt?: string | Date | null;
    Unit?: OrganizationalUnitsInterface;
    User?: UserInterface;
}