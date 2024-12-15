export interface PresentationInterface {
    cod_pres?: number | string;
    quantity: string;
    unit: string;
    weight: number;
    status?: number;
    createdAt:Date;
    updatedAt:Date;
    deletedAt:Date;
  }