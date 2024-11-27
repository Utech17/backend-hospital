
export interface ServiceInterface{
    id?:number;
    name:string;
    price:number;
    status?:boolean;
    createdAt:Date;
    updatedAt:Date;
    deletedAt:Date;
}