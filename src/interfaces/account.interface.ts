export interface AccountInterface {
    id?: number | string;
    name: string;
    type_account: "current" | "savings";
    status?: boolean;
}