import { JournalInterface } from "../../interfaces";

const journalsSeeds: Partial<JournalInterface>[] = [
  // Activos
  {
    id: 1,
    request_id: 1,
    account_record_id: 1, // Efectivo en Caja
    status: true,
    createdAt: new Date("2024-01-01")
  },
  {
    id: 2,
    request_id: 1,
    account_record_id: 2, // Cuentas por Cobrar
    status: true,
    createdAt: new Date("2024-01-01")
  },
  {
    id: 3,
    request_id: 1,
    account_record_id: 3, // Inventario
    status: true,
    createdAt: new Date("2024-01-01")
  },
  {
    id: 4,
    request_id: 1,
    account_record_id: 4, // Edificio
    status: true,
    createdAt: new Date("2024-01-01")
  },
  {
    id: 5,
    request_id: 1,
    account_record_id: 5, // Depreciación
    status: true,
    createdAt: new Date("2024-01-01")
  },
  {
    id: 6,
    request_id: 1,
    account_record_id: 6, // Equipo de cómputo
    status: true,
    createdAt: new Date("2024-01-01")
  },
  {
    id: 7,
    request_id: 1,
    account_record_id: 7, // Equipo de transporte
    status: true,
    createdAt: new Date("2024-01-01")
  },
  {
    id: 8,
    request_id: 1,
    account_record_id: 8, // Terrenos
    status: true,
    createdAt: new Date("2024-01-01")
  },
  // Pasivos
  {
    id: 9,
    request_id: 2,
    account_record_id: 9, // Cuentas por Pagar
    status: true,
    createdAt: new Date("2024-01-01")
  },
  {
    id: 10,
    request_id: 2,
    account_record_id: 10, // Documentos por pagar LP
    status: true,
    createdAt: new Date("2024-01-01")
  },
  {
    id: 11,
    request_id: 2,
    account_record_id: 11, // Cuentas por pagar varias
    status: true,
    createdAt: new Date("2024-01-01")
  },
  // Capital
  {
    id: 12,
    request_id: 3,
    account_record_id: 12, // Capital Social
    status: true,
    createdAt: new Date("2024-01-01")
  },
  // Resultados
  {
    id: 13,
    request_id: 4,
    account_record_id: 13, // Ventas
    status: true,
    createdAt: new Date("2024-01-15")
  },
  {
    id: 14,
    request_id: 5,
    account_record_id: 14, // Costo de ventas
    status: true,
    createdAt: new Date("2024-01-15")
  },
  {
    id: 15,
    request_id: 7,
    account_record_id: 15, // Otros ingresos
    status: true,
    createdAt: new Date("2024-01-15")
  },
  // Gastos
  {
    id: 16,
    request_id: 6,
    account_record_id: 16, // Gastos de Ventas
    status: true,
    createdAt: new Date("2024-01-20")
  },
  {
    id: 17,
    request_id: 6,
    account_record_id: 17, // Comisiones
    status: true,
    createdAt: new Date("2024-01-20")
  },
  {
    id: 18,
    request_id: 6,
    account_record_id: 18, // Fletes
    status: true,
    createdAt: new Date("2024-01-20")
  },
  {
    id: 19,
    request_id: 6,
    account_record_id: 19, // Alquileres
    status: true,
    createdAt: new Date("2024-01-20")
  },
  {
    id: 20,
    request_id: 6,
    account_record_id: 20, // Sueldos
    status: true,
    createdAt: new Date("2024-01-20")
  },
  {
    id: 21,
    request_id: 6,
    account_record_id: 21, // Artículos de oficina
    status: true,
    createdAt: new Date("2024-01-20")
  },
  {
    id: 22,
    request_id: 6,
    account_record_id: 22, // Gastos financieros
    status: true,
    createdAt: new Date("2024-01-20")
  },
  // Resultados finales
  {
    id: 23,
    request_id: 8,
    account_record_id: 23, // Utilidad
    status: true,
    createdAt: new Date("2024-02-28")
  },
  {
    id: 24,
    request_id: 9,
    account_record_id: 24, // Reserva legal
    status: true,
    createdAt: new Date("2024-02-28")
  }
];

export { journalsSeeds };