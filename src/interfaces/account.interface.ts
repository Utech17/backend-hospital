export interface AccountInterface {
  id?: number | string;
  name: string;
  balance: number;
  type_account: 'activo' | 'pasivo' | 'capital' | 'ingreso' | 'egreso';
  status?: boolean;
}