import * as XLSX from 'xlsx';
import { JournalDB } from '../config'; 

interface JournalEntry {
  fecha: string;
  description: string;
  cuenta: string;
  debe: string;
  haber: string;
  tipo_cuenta: string;
  saldo: string;
}

const generateDiarySheet = (entries: JournalEntry[], startDate: string, endDate: string) => {
  const data = [
    ['LIBRO DIARIO', '', '', '', '', '', ''],
    [`Período: ${startDate} al ${endDate}`, '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['Fecha', 'Descripción', 'Cuenta', 'Debe', 'Haber', 'Tipo de Cuenta', 'Saldo']
  ];

  let currentDate = '';
  let totalDebe = 0;
  let totalHaber = 0;

  entries.forEach(entry => {
    if (currentDate !== entry.fecha) {
      if (currentDate !== '') {
        data.push(['', '', 'Subtotal:', totalDebe.toFixed(2), totalHaber.toFixed(2), '', '']);
        data.push(['', '', '', '', '', '', '']);
      }
      currentDate = entry.fecha;
      totalDebe = 0;
      totalHaber = 0;
      data.push([`Fecha: ${entry.fecha}`, '', '', '', '', '', '']);
    }

    data.push([
      entry.fecha,
      entry.description,
      entry.cuenta,
      entry.debe,
      entry.haber,
      entry.tipo_cuenta,
      entry.saldo
    ]);

    totalDebe += Number(entry.debe.replace(/,/g, ''));
    totalHaber += Number(entry.haber.replace(/,/g, ''));
  });

  return XLSX.utils.aoa_to_sheet(data);
};

const generateBalanceSheet = (balanceData: any[], startDate: string, endDate: string) => {
  const data = [
    ['BALANCE GENERAL', '', '', '', ''],
    [`Período: ${startDate} al ${endDate}`, '', '', '', ''],
    ['', '', '', '', ''],
    ['Tipo', 'Cuenta', 'Saldo', 'Debe', 'Haber']
  ];

  balanceData.forEach(item => {
    data.push([item.tipo, item.cuenta, item.saldo, item.debe, item.haber]);
  });

  return XLSX.utils.aoa_to_sheet(data);
};

const generateIncomeSheet = (incomeData: any[], startDate: string, endDate: string) => {
  const data = [
    ['ESTADO DE RESULTADOS', '', ''],
    [`Período: ${startDate} al ${endDate}`, '', ''],
    ['', '', ''],
    ['Tipo', 'Cuenta', 'Monto']
  ];

  incomeData.forEach(item => {
    data.push([item.tipo, item.cuenta, item.monto]);
  });

  return XLSX.utils.aoa_to_sheet(data);
};

const JournalServices = {
  generateExcel: async (startDate: string, endDate: string) => {
    try {
      const workbook = XLSX.utils.book_new();
      const dialect = process.env.DATABASE_DIALECT;
      
      // 1. Libro Diario
      const diaryEntries = await JournalDB.sequelize?.query(
        dialect === 'mysql' 
          ? `SELECT 
              DATE_FORMAT(j.createdAt, '%Y-%m-%d') as fecha,
              r.description,
              a.name as cuenta,
              FORMAT(CASE WHEN ac.type = 'debe' THEN ac.amount ELSE 0 END, 2) as debe,
              FORMAT(CASE WHEN ac.type = 'haber' THEN ac.amount ELSE 0 END, 2) as haber,
              a.type_account as tipo_cuenta,
              FORMAT(a.balance, 2) as saldo
            FROM requests r
            INNER JOIN journals j ON r.request_id = j.request_id
            INNER JOIN account_records ac ON j.account_record_id = ac.id
            INNER JOIN accounts a ON ac.account_id = a.id
            WHERE r.status = 'aprobada'
            AND j.createdAt BETWEEN ? AND ?
            ORDER BY j.createdAt, ac.type DESC`
          : `SELECT 
              TO_CHAR(j."createdAt", 'YYYY-MM-DD') as fecha,
              r.description,
              a.name as cuenta,
              TO_CHAR(CASE WHEN ac.type = 'debe' THEN ac.amount ELSE 0 END, 'FM999,999,999.00') as debe,
              TO_CHAR(CASE WHEN ac.type = 'haber' THEN ac.amount ELSE 0 END, 'FM999,999,999.00') as haber,
              a.type_account as tipo_cuenta,
              TO_CHAR(a.balance, 'FM999,999,999.00') as saldo
            FROM requests r
            INNER JOIN journals j ON r.request_id = j.request_id
            INNER JOIN account_records ac ON j.account_record_id = ac.id
            INNER JOIN accounts a ON ac.account_id = a.id
            WHERE r.status = 'aprobada'
            AND j."createdAt" BETWEEN ? AND ?
            ORDER BY j."createdAt", ac.type DESC`,
        { 
          replacements: [startDate, endDate],
          type: 'SELECT' 
        }
      ) as JournalEntry[];

      // 2. Balance General
      const balanceSheet = await JournalDB.sequelize?.query(
        dialect === 'mysql'
          ? `SELECT 
              a.type_account as tipo,
              a.name as cuenta,
              FORMAT(a.balance, 2) as saldo,
              FORMAT(SUM(CASE WHEN ac.type = 'debe' THEN ac.amount ELSE 0 END), 2) as debe,
              FORMAT(SUM(CASE WHEN ac.type = 'haber' THEN ac.amount ELSE 0 END), 2) as haber
            FROM accounts a
            LEFT JOIN account_records ac ON a.id = ac.account_id
            LEFT JOIN journals j ON ac.id = j.account_record_id
            WHERE a.type_account IN ('activo', 'pasivo', 'capital')
            AND (j.createdAt BETWEEN ? AND ? OR j.createdAt IS NULL)
            GROUP BY a.type_account, a.name, a.balance
            ORDER BY a.type_account, a.name`
          : `SELECT 
              a.type_account as tipo,
              a.name as cuenta,
              TO_CHAR(a.balance, 'FM999,999,999.00') as saldo,
              TO_CHAR(SUM(CASE WHEN ac.type = 'debe' THEN ac.amount ELSE 0 END), 'FM999,999,999.00') as debe,
              TO_CHAR(SUM(CASE WHEN ac.type = 'haber' THEN ac.amount ELSE 0 END), 'FM999,999,999.00') as haber
            FROM accounts a
            LEFT JOIN account_records ac ON a.id = ac.account_id
            LEFT JOIN journals j ON ac.id = j.account_record_id
            WHERE a.type_account IN ('activo', 'pasivo', 'capital')
            AND (j."createdAt" BETWEEN ? AND ? OR j."createdAt" IS NULL)
            GROUP BY a.type_account, a.name, a.balance
            ORDER BY a.type_account, a.name`,
        {
          replacements: [startDate, endDate],
          type: 'SELECT'
        }
      ) as any[];

      // 3. Estado de Resultados
      const incomeStatement = await JournalDB.sequelize?.query(
        dialect === 'mysql'
          ? `SELECT 
              a.type_account as tipo,
              a.name as cuenta,
              FORMAT(SUM(CASE 
                WHEN a.type_account = 'ingreso' THEN (CASE WHEN ac.type = 'haber' THEN ac.amount ELSE -ac.amount END)
                WHEN a.type_account = 'egreso' THEN (CASE WHEN ac.type = 'debe' THEN ac.amount ELSE -ac.amount END)
              END), 2) as monto
            FROM accounts a
            LEFT JOIN account_records ac ON a.id = ac.account_id
            LEFT JOIN journals j ON ac.id = j.account_record_id
            WHERE a.type_account IN ('ingreso', 'egreso')
            AND j.createdAt BETWEEN ? AND ?
            GROUP BY a.type_account, a.name
            ORDER BY a.type_account DESC, a.name`
          : `SELECT 
              a.type_account as tipo,
              a.name as cuenta,
              TO_CHAR(SUM(CASE 
                WHEN a.type_account = 'ingreso' THEN (CASE WHEN ac.type = 'haber' THEN ac.amount ELSE -ac.amount END)
                WHEN a.type_account = 'egreso' THEN (CASE WHEN ac.type = 'debe' THEN ac.amount ELSE -ac.amount END)
              END), 'FM999,999,999.00') as monto
            FROM accounts a
            LEFT JOIN account_records ac ON a.id = ac.account_id
            LEFT JOIN journals j ON ac.id = j.account_record_id
            WHERE a.type_account IN ('ingreso', 'egreso')
            AND j."createdAt" BETWEEN ? AND ?
            GROUP BY a.type_account, a.name
            ORDER BY a.type_account DESC, a.name`,
        {
          replacements: [startDate, endDate],
          type: 'SELECT'
        }
      ) as any[];

      // Generar hojas de Excel
      const diarySheet = generateDiarySheet(diaryEntries, startDate, endDate);
      diarySheet['!cols'] = [
        { wch: 32 },  // Fecha
        { wch: 40 },  // Descripción
        { wch: 35 },  // Cuenta
        { wch: 15 },  // Debe
        { wch: 15 },  // Haber
        { wch: 20 },  // Tipo de Cuenta
        { wch: 15 }   // Saldo
      ];

      const balanceSheetData = generateBalanceSheet(balanceSheet, startDate, endDate);
      balanceSheetData['!cols'] = [
        { wch: 32 },  // Tipo
        { wch: 33 },  // Cuenta
        { wch: 16 },  // Saldo
        { wch: 16 },  // Debe
        { wch: 16 }   // Haber
      ];

      const incomeSheet = generateIncomeSheet(incomeStatement, startDate, endDate);
      incomeSheet['!cols'] = [
        { wch: 32 },  // Tipo
        { wch: 35 },  // Cuenta
        { wch: 15 }   // Monto
      ];

      // Añadir hojas al libro
      XLSX.utils.book_append_sheet(workbook, diarySheet, 'Libro Diario');
      XLSX.utils.book_append_sheet(workbook, balanceSheetData, 'Balance General');
      XLSX.utils.book_append_sheet(workbook, incomeSheet, 'Estado de Resultados');

      // Generar buffer
      const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

      return {
        message: "Excel generado exitosamente",
        status: 200,
        data: {
          file: excelBuffer,
          fileName: `Reportes_Contables_${startDate}_${endDate}.xlsx`
        }
      };

    } catch (error) {
      console.error(error);
      return {
        message: "Contacte con el administrador",
        status: 500
      };
    }
  },

  getMinMaxDates: async () => {
    try {
      const dialect = process.env.DATABASE_DIALECT;
      const result = await JournalDB.sequelize?.query(
        dialect === 'mysql'
          ? `SELECT 
              MIN(DATE_FORMAT(j.createdAt, '%Y-%m-%d')) as minDate,
              MAX(DATE_FORMAT(j.createdAt, '%Y-%m-%d')) as maxDate
            FROM journals j`
          : `SELECT 
              TO_CHAR(MIN(j."createdAt"), 'YYYY-MM-DD') as minDate,
              TO_CHAR(MAX(j."createdAt"), 'YYYY-MM-DD') as maxDate
            FROM journals j`,
        {
          type: 'SELECT'
        }
      );

      if (result && result.length > 0) {
        return {
          status: 200,
          data: result[0]
        };
      } else {
        return {
          status: 404,
          message: "No se encontraron fechas"
        };
      }
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Contacte con el administrador"
      };
    }
  }
};

export { JournalServices };