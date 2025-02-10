export interface ClientInterface {
    id?: number;
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    createdAt?: Date;
    updatedAt?: string | Date | null;
    deletedAt?: string | Date | null;
}