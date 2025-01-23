export interface SaleInterface {
    id?: number | string;
    invoice_number: number;
    date: Date;
    amount: number;
    payment_type_id: number;
    status: boolean;
    updatedAt:Date;
    deletedAt?: string | Date | null;
}