import { AccountRecordInterface } from "../../interfaces";

const accountRecordsSeeds: Partial<AccountRecordInterface>[] = [
  // Activos (debe)
  {
    account_id: 1,
    type: "debe",
    name: "Efectivo en Caja",
    amount: 120000.00,
    description: "Saldo en efectivo"
  },
  {
    account_id: 2,
    type: "debe",
    name: "Cuentas por Cobrar Clientes",
    amount: 50000.00,
    description: "Saldo por cobrar"
  },
  {
    account_id: 4,
    type: "debe",
    name: "Inventario de mercancías",
    amount: 130000.00,
    description: "Saldo en inventario"
  },
  {
    account_id: 8,
    type: "debe",
    name: "Edificio",
    amount: 200000.00,
    description: "Valor del edificio"
  },
  {
    account_id: 9,
    type: "debe",
    name: "Depreciación acumulada de edificio",
    amount: -70000.00,
    description: "Depreciación acumulada"
  },
  {
    account_id: 10,
    type: "debe",
    name: "Equipo de cómputo",
    amount: 15000.00,
    description: "Valor del equipo de cómputo"
  },
  {
    account_id: 11,
    type: "debe",
    name: "Equipo de transporte",
    amount: 80000.00,
    description: "Valor del equipo de transporte"
  },
  {
    account_id: 23,
    type: "debe",
    name: "Terrenos",
    amount: 607000.00,
    description: "Valor de terrenos"
  },
  // Pasivos (haber)
  {
    account_id: 3,
    type: "haber",
    name: "Cuentas por Pagar Proveedores",
    amount: 130000.00,
    description: "Saldo por pagar a proveedores"
  },
  {
    account_id: 12,
    type: "haber",
    name: "Documentos por pagar a Largo Plazo",
    amount: 411750.00,
    description: "Documentos por pagar LP"
  },
  {
    account_id: 19,
    type: "haber",
    name: "Cuentas por pagar varias",
    amount: 5000.00,
    description: "Otras cuentas por pagar"
  },
  // Capital (haber)
  {
    account_id: 6,
    type: "haber",
    name: "Capital Social",
    amount: 400000.00,
    description: "Capital social"
  },
  // Resultados
  {
    account_id: 5,
    type: "haber",
    name: "Ventas",
    amount: 400000.00,
    description: "Ventas del período"
  },
  {
    account_id: 7,
    type: "debe",
    name: "Costo de ventas",
    amount: 170000.00,
    description: "Costo de ventas del período"
  },
  {
    account_id: 21,
    type: "haber",
    name: "Otros ingresos",
    amount: 500.00,
    description: "Otros ingresos del período"
  },
  // Gastos
  {
    account_id: 13,
    type: "debe",
    name: "Gastos de Ventas",
    amount: 9000.00,
    description: "Gastos de ventas"
  },
  {
    account_id: 14,
    type: "debe",
    name: "Comisiones vendedores",
    amount: 21500.00,
    description: "Comisiones"
  },
  {
    account_id: 15,
    type: "debe",
    name: "Fletes en Ventas",
    amount: 11000.00,
    description: "Fletes"
  },
  {
    account_id: 16,
    type: "debe",
    name: "Alquileres",
    amount: 31250.00,
    description: "Alquileres"
  },
  {
    account_id: 17,
    type: "debe",
    name: "Sueldos y Salarios Administracion",
    amount: 18000.00,
    description: "Sueldos y salarios"
  },
  {
    account_id: 18,
    type: "debe",
    name: "Articulos de Oficina Administracion",
    amount: 5000.00,
    description: "Artículos de oficina"
  },
  {
    account_id: 20,
    type: "debe",
    name: "Gastos financieros",
    amount: 3000.00,
    description: "Gastos financieros"
  },
  // Resultados finales
  {
    account_id: 22,
    type: "haber",
    name: "Utilidad del Ejercicio",
    amount: 131750.00,
    description: "Utilidad del ejercicio"
  },
  {
    account_id: 24,
    type: "haber",
    name: "Reserva legal",
    amount: 53500.00,
    description: "Reserva legal"
  }
];

export { accountRecordsSeeds };