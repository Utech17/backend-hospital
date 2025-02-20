import { AccountInterface } from "../../interfaces";

const accountsSeeds: Partial<AccountInterface>[] = [
  {
    name: "Efectivo en Caja",
    type_account: "activo",
    balance: 120000.00,
    status: true,
  },
  {
    name: "Cuentas por Cobrar Clientes",
    type_account: "activo",
    balance: 50000.00,
    status: true,
  },
  {
    name: "Cuentas por Pagar Proveedores",
    type_account: "pasivo",
    balance: 130000.00,
    status: true,
  },
  {
    name: "Inventario de mercancías",
    type_account: "activo",
    balance: 130000.00,
    status: true,
  },
  {
    name: "Ventas",
    type_account: "ingreso",
    balance: 400000.00,
    status: true,
  },
  {
    name: "Capital Social",
    type_account: "capital",
    balance: 400000.00,
    status: true,
  },
  {
    name: "Costo de ventas",
    type_account: "ingreso",
    balance: 170000.00,
    status: true,
  },
  {
    name: "Edificio",
    type_account: "activo",
    balance: 200000.00,
    status: true,
  },
  {
    name: "Depreciación acumulada de edificio",
    type_account: "activo",
    balance: -70000.00,
    status: true,
  },
  {
    name: "Equipo de cómputo",
    type_account: "activo",
    balance: 15000.00,
    status: true,
  },
  {
    name: "Equipo de transporte",
    type_account: "activo",
    balance: 80000.00,
    status: true,
  },
  {
    name: "Documentos por pagar a Largo Plazo",
    type_account: "pasivo",
    balance: 411750.00,
    status: true,
  },
  {
    name: "Gastos de Ventas",
    type_account: "egreso",
    balance: 9000.00,
    status: true,
  },
  {
    name: "Comisiones vendedores",
    type_account: "egreso",
    balance: 21500.00,
    status: true,
  },
  {
    name: "Fletes en Ventas",
    type_account: "egreso",
    balance: 11000.00,
    status: true,
  },
  {
    name: "Alquileres",
    type_account: "egreso",
    balance: 31250.00,
    status: true,
  },
  {
    name: "Sueldos y Salarios Administracion",
    type_account: "egreso",
    balance: 18000.00,
    status: true,
  },
  {
    name: "Articulos de Oficina Administracion",
    type_account: "egreso",
    balance: 5000.00,
    status: true,
  },
  {
    name: "Cuentas por pagar varias",
    type_account: "pasivo",
    balance: 5000.00,
    status: true,
  },
  {
    name: "Gastos financieros",
    type_account: "egreso", 
    balance: 3000.00,
    status: true,
  },
  {
    name: "Otros ingresos",
    type_account: "ingreso",
    balance: 500.00,
    status: true,
  },
  {
    name: "Utilidad del Ejercicio",
    type_account: "capital",
    balance: 131750.00,
    status: true,
  },
  {
    name: "Terrenos",
    type_account: "activo",
    balance: 607000.00,
    status: true,
  },
  {
    name: "Reserva legal",
    type_account: "capital",
    balance: 53500.00,
    status: true,
  }
];

export { accountsSeeds };