export interface SaleInterface {
    id?: number | string;
    invoice_number: number;
    date: Date;
    amount: number;
    payment_type_code: number;
    status: boolean;
}