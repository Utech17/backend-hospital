export interface AccountInterface {
    id?: number | string;
    name: string;
    type_account: "A" | "P" | "C" | "I" | "G"; // Activo, Pasivo, Capital, Ingresos, Gastos
    status?: boolean;
}