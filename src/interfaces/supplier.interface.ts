export interface SupplierInterface {
    id?: number | string;
    rif: string;
    address: string;
    business_name: string;
    status?: boolean;
    updatedAt: Date;
    deletedAt?: string | Date | null;
  }  