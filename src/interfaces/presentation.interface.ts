export interface PresentationInterface {
    cod_pres?: number;
    quantity: string;
    unit: string;
    weight: number;
    status?: number;
    createdAt:Date;
    updatedAt:Date;
    deletedAt?: string | Date | null;
  }