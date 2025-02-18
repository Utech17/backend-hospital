import { AccountRecordInterface } from "../../interfaces";

const accountRecordsSeeds: Partial<AccountRecordInterface>[] = [
  // Activos (debe)
  {
    id: 1,
    account_id: 1,
    type: "debe",
    name: "Efectivo en Caja",
    amount: 120000.00,
    description: "Saldo en efectivo"
  },
  {
    id: 2,
    account_id: 2,
    type: "debe",
    name: "Cuentas por Cobrar Clientes",
    amount: 50000.00,
    description: "Saldo por cobrar"
  },
  {
    id: 3,
    account_id: 4,
    type: "debe",
    name: "Inventario de mercancías",
    amount: 130000.00,
    description: "Saldo en inventario"
  },
  {
    id: 4,
    account_id: 8,
    type: "debe",
    name: "Edificio",
    amount: 200000.00,
    description: "Valor del edificio"
  },
  {
    id: 5,
    account_id: 9,
    type: "debe",
    name: "Depreciación acumulada de edificio",
    amount: -70000.00,
    description: "Depreciación acumulada"
  },
  {
    id: 6,
    account_id: 10,
    type: "debe",
    name: "Equipo de cómputo",
    amount: 15000.00,
    description: "Valor del equipo de cómputo"
  },
  {
    id: 7,
    account_id: 11,
    type: "debe",
    name: "Equipo de transporte",
    amount: 80000.00,
    description: "Valor del equipo de transporte"
  },
  {
    id: 8,
    account_id: 23,
    type: "debe",
    name: "Terrenos",
    amount: 607000.00,
    description: "Valor de terrenos"
  },
  // Pasivos (haber)
  {
    id: 9,
    account_id: 3,
    type: "haber",
    name: "Cuentas por Pagar Proveedores",
    amount: 130000.00,
    description: "Saldo por pagar a proveedores"
  },
  {
    id: 10,
    account_id: 12,
    type: "haber",
    name: "Documentos por pagar a Largo Plazo",
    amount: 411750.00,
    description: "Documentos por pagar LP"
  },
  {
    id: 11,
    account_id: 19,
    type: "haber",
    name: "Cuentas por pagar varias",
    amount: 5000.00,
    description: "Otras cuentas por pagar"
  },
  // Capital (haber)
  {
    id: 12,
    account_id: 6,
    type: "haber",
    name: "Capital Social",
    amount: 400000.00,
    description: "Capital social"
  },
  // Resultados
  {
    id: 13,
    account_id: 5,
    type: "haber",
    name: "Ventas",
    amount: 400000.00,
    description: "Ventas del período"
  },
  {
    id: 14,
    account_id: 7,
    type: "debe",
    name: "Costo de ventas",
    amount: 170000.00,
    description: "Costo de ventas del período"
  },
  {
    id: 15,
    account_id: 21,
    type: "haber",
    name: "Otros ingresos",
    amount: 500.00,
    description: "Otros ingresos del período"
  },
  // Gastos
  {
    id: 16,
    account_id: 13,
    type: "debe",
    name: "Gastos de Ventas",
    amount: 9000.00,
    description: "Gastos de ventas"
  },
  {
    id: 17,
    account_id: 14,
    type: "debe",
    name: "Comisiones vendedores",
    amount: 21500.00,
    description: "Comisiones"
  },
  {
    id: 18,
    account_id: 15,
    type: "debe",
    name: "Fletes en Ventas",
    amount: 11000.00,
    description: "Fletes"
  },
  {
    id: 19,
    account_id: 16,
    type: "debe",
    name: "Alquileres",
    amount: 31250.00,
    description: "Alquileres"
  },
  {
    id: 20,
    account_id: 17,
    type: "debe",
    name: "Sueldos y Salarios Administracion",
    amount: 18000.00,
    description: "Sueldos y salarios"
  },
  {
    id: 21,
    account_id: 18,
    type: "debe",
    name: "Articulos de Oficina Administracion",
    amount: 5000.00,
    description: "Artículos de oficina"
  },
  {
    id: 22,
    account_id: 20,
    type: "debe",
    name: "Gastos financieros",
    amount: 3000.00,
    description: "Gastos financieros"
  },
  // Resultados finales
  {
    id: 23,
    account_id: 22,
    type: "haber",
    name: "Utilidad del Ejercicio",
    amount: 131750.00,
    description: "Utilidad del ejercicio"
  },
  {
    id: 24,
    account_id: 24,
    type: "haber",
    name: "Reserva legal",
    amount: 53500.00,
    description: "Reserva legal"
  }
];

export { accountRecordsSeeds };