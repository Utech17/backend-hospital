import { TypeInterface } from "./type.interface";
import { ClassInterface } from "./class.interface";
import { PresentationInterface } from "./presentation.interface";

enum ProductStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
  }

export interface ProductInterface{
    id?:number;
    name:string;
    description:string;
    unit_measure:string;
    quantity_xunit:number;
    weight:number;
    location:string;
    status?:ProductStatus;
    cod_type:number;
    cod_class:number;
    cod_pres:number;
    type?:TypeInterface;
    class?:ClassInterface;
    pres?:PresentationInterface;
}