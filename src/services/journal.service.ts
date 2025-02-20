import { JournalDB, db, RequestDB, RequestTypeDB, DepartmentDB, AccountRecordDB, AccountDB, InventoryDB } from "../config";
import { JournalInterface } from "../interfaces";
import * as XLSX from 'xlsx';

interface ExcelCell {
  value: string | number;
  style?: string;
}

interface ExcelData {
  headers: string[];
  rows: (string | ExcelCell)[][];
  totales: {
    debe: number;
    haber: number;
  };
}

interface JournalEntry {
  fecha: string;
  description: string;
  cuenta: string;
  debe: string;
  haber: string;
  tipo_cuenta: string;
  saldo: string;
}

interface RequestModel {
  request_id: number;
  amount: number;
  department_id: number;
  product_id: number;
  quantity: number;
  status: string;
}

interface AccountModel {
  id: number;
  type_account: string;
  balance: number;
}

interface AccountRecordModel {
  id: number;
  account_id: number;
  type: string;
  amount: number;
}

interface DepartmentModel {
  id: number;
  organizational_unit_id: number;
}

interface InventoryModel {
  id: number;
  organizational_unit_id: number;
  product_id: number;
  amount: number;
  status: number;
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
  getDiaryEntries: async () => {
    try {
      const dialect = process.env.DATABASE_DIALECT;
      const query = dialect === 'mysql' 
        ? `
          SELECT 
            j.createdAt as fecha,
            r.description as description,
            a.id as ref,
            a.name as account,
            ac.name as nickname,
            ac.amount as amount,
            ac.type as type
          FROM
            requests r
            INNER JOIN request_types rt ON r.request_type_id = rt.id
            INNER JOIN journals j ON r.request_id = j.request_id
            INNER JOIN account_records ac ON j.account_record_id = ac.id
            INNER JOIN accounts a ON ac.account_id = a.id
          WHERE 
            r.status = 'aprobada'
          ORDER BY j.createdAt
        `
        : `
          SELECT 
            j."createdAt" as fecha,
            r.description as description,
            a.id as ref,
            a.name as account,
            ac.name as nickname,
            ac.amount as amount,
            ac.type as type
          FROM
            requests r
            INNER JOIN request_types rt ON r.request_type_id = rt.id
            INNER JOIN journals j ON r.request_id = j.request_id
            INNER JOIN account_records ac ON j.account_record_id = ac.id
            INNER JOIN accounts a ON ac.account_id = a.id
          WHERE 
            r.status = 'aprobada'
          ORDER BY j."createdAt"
        `;

      const entries = await JournalDB.sequelize?.query(query, { type: 'SELECT' }) as any[];

      if (!entries || !entries.length) {
        return {
          message: "No se encontraron registros en el diario",
          status: 404,
          data: {
            entries: []
          }
        };
      }

      return {
        message: "Registros del diario encontrados exitosamente",
        status: 200,
        data: {
          entries
        }
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Contacte con el administrador",
        status: 500
      };
    }
  },

  getBalanceSheet: async () => {
    try {
      const dialect = process.env.DATABASE_DIALECT;
      const query = dialect === 'mysql'
        ? `
          SELECT 
            id,
            name,
            balance,
            debit,
            credit,
            type_account,
            CASE 
              WHEN type_account IN ('activo', 'pasivo', 'capital') THEN 'real'
              ELSE 'nominal'
            END AS category
          FROM (
            SELECT 
              a.name,
              a.id,
              a.balance,
              SUM(CASE WHEN ac.type = 'debe' THEN ac.amount ELSE 0 END) AS debit,
              SUM(CASE WHEN ac.type = 'haber' THEN ac.amount ELSE 0 END) AS credit,
              a.type_account
            FROM 
              accounts a
              INNER JOIN account_records ac ON a.id = ac.account_id
              INNER JOIN journals j ON ac.id = j.account_record_id
              INNER JOIN requests r ON j.request_id = r.request_id
            WHERE
              r.status = 'aprobada'
              AND a.type_account IN ('activo', 'pasivo', 'capital')
            GROUP BY a.id, a.name, a.balance, a.type_account
          ) as totales
          ORDER BY type_account, name
        `
        : `
          SELECT 
            id,
            name,
            balance,
            debit,
            credit,
            type_account,
            CASE 
              WHEN type_account IN ('activo', 'pasivo', 'capital') THEN 'real'
              ELSE 'nominal'
            END AS category
          FROM (
            SELECT 
              a.name,
              a.id,
              a.balance,
              SUM(CASE WHEN ac.type = 'debe' THEN ac.amount ELSE 0 END) AS debit,
              SUM(CASE WHEN ac.type = 'haber' THEN ac.amount ELSE 0 END) AS credit,
              a.type_account
            FROM 
              accounts a
              INNER JOIN account_records ac ON a.id = ac.account_id
              INNER JOIN journals j ON ac.id = j.account_record_id
              INNER JOIN requests r ON j.request_id = r.request_id
            WHERE
              r.status = 'aprobada'
              AND a.type_account IN ('activo', 'pasivo', 'capital')
            GROUP BY a.id, a.name, a.balance, a.type_account
          ) as totales
          ORDER BY type_account, name
        `;

      const balanceSheet = await JournalDB.sequelize?.query(query, { type: 'SELECT' }) as any[];

      if (!balanceSheet || !balanceSheet.length) {
        return {
          message: "No se encontraron datos para el Balance General",
          status: 404,
          data: { balanceSheet: [] }
        };
      }

      return {
        message: "Balance General generado exitosamente",
        status: 200,
        data: { balanceSheet }
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Contacte con el administrador",
        status: 500
      };
    }
  },

  getIncomeStatement: async () => {
    try {
      const dialect = process.env.DATABASE_DIALECT;
      const query = dialect === 'mysql'
        ? `
          SELECT 
            type_account,
            SUM(CASE 
              WHEN type_account = 'ingreso' THEN (credit - debit)
              WHEN type_account = 'egreso' THEN (debit - credit)
            END) as amount
          FROM (
            SELECT 
              a.type_account,
              SUM(CASE WHEN ac.type = 'debe' THEN ac.amount ELSE 0 END) AS debit,
              SUM(CASE WHEN ac.type = 'haber' THEN ac.amount ELSE 0 END) AS credit
            FROM 
              accounts a
              INNER JOIN account_records ac ON a.id = ac.account_id
              INNER JOIN journals j ON ac.id = j.account_record_id
              INNER JOIN requests r ON j.request_id = r.request_id
            WHERE
              r.status = 'aprobada'
              AND a.type_account IN ('ingreso', 'egreso')
            GROUP BY a.type_account
          ) as totales
          GROUP BY type_account
        `
        : `
          SELECT 
            type_account,
            SUM(CASE 
              WHEN type_account = 'ingreso' THEN (credit - debit)
              WHEN type_account = 'egreso' THEN (debit - credit)
            END) as amount
          FROM (
            SELECT 
              a.type_account,
              SUM(CASE WHEN ac.type = 'debe' THEN ac.amount ELSE 0 END) AS debit,
              SUM(CASE WHEN ac.type = 'haber' THEN ac.amount ELSE 0 END) AS credit
            FROM 
              accounts a
              INNER JOIN account_records ac ON a.id = ac.account_id
              INNER JOIN journals j ON ac.id = j.account_record_id
              INNER JOIN requests r ON j.request_id = r.request_id
            WHERE
              r.status = 'aprobada'
              AND a.type_account IN ('ingreso', 'egreso')
            GROUP BY a.type_account
          ) as totales
          GROUP BY type_account
        `;

      const incomeStatement = await JournalDB.sequelize?.query(query, { type: 'SELECT' }) as any[];

      if (!incomeStatement || !incomeStatement.length) {
        return {
          message: "No se encontraron datos para el Estado de Resultados",
          status: 404,
          data: { incomeStatement: [] }
        };
      }

      // Calcular utilidad/pérdida
      const ingresos = incomeStatement.find(i => i.type_account === 'ingreso')?.amount || 0;
      const egresos = incomeStatement.find(i => i.type_account === 'egreso')?.amount || 0;
      const resultado = ingresos - egresos;

      return {
        message: "Estado de Resultados generado exitosamente",
        status: 200,
        data: { 
          incomeStatement,
          resultado: {
            ingresos,
            egresos,
            utilidad: resultado
          }
        }
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Contacte con el administrador",
        status: 500
      };
    }
  },

  getAll: async () => {
    try {
      const journals = await JournalDB.sequelize?.query(`
        SELECT 
          j.*,
          r.description as request_description,
          ac.type as record_type,
          ac.amount as record_amount,
          ac.name as record_name
        FROM 
          journals j
          LEFT JOIN requests r ON r.request_id = j.request_id
          LEFT JOIN account_records ac ON ac.id = j.account_record_id
        WHERE 
          j.deletedAt IS NULL
        ORDER BY j.createdAt DESC
      `, { type: 'SELECT' }) as any[];

      if (!journals || !journals.length) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            journals: []
          }
        };
      }

      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          journals
        }
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500
      };
    }
  },

  getOne: async (id: number) => {
    try {
      const [journal] = await JournalDB.sequelize?.query(`
        SELECT 
          j.*,
          r.description as request_description,
          ac.type as record_type,
          ac.amount as record_amount,
          ac.name as record_name
        FROM 
          journals j
          LEFT JOIN requests r ON r.request_id = j.request_id
          LEFT JOIN account_records ac ON ac.id = j.account_record_id
        WHERE 
          j.id = :id 
          AND j.deletedAt IS NULL
      `, { 
        replacements: { id },
        type: 'SELECT'
      }) as any[];

      if (!journal) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {}
        };
      }

      return {
        message: `Registro encontrado`,
        status: 200,
        data: {
          journal
        }
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500
      };
    }
  },

  create: async (data: Partial<JournalInterface>) => {
    try {
      const journal = await JournalDB.create(data);
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          journal,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },

  update: async (id: number, data: Partial<JournalInterface>) => {
    try {
      const journal = await JournalDB.update(data, { where: { id } });
      const { data: updatedData } = await JournalServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          journal: updatedData?.journal,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },

  delete: async (id: number) => {
    try {
      const journal = await JournalDB.update(
        { deletedAt: new Date() },
        { where: { id } }
      );
      if (journal[0] === 0) {
        return {
          message: `Registro no encontrado`,
          status: 404,
        };
      }
      return {
        message: `Eliminación exitosa`,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },

  getExcelReport: async () => {
    try {
      const dialect = process.env.DATABASE_DIALECT;
      const query = dialect === 'mysql' 
        ? `
          SELECT 
            DATE_FORMAT(j.createdAt, '%Y-%m-%d') as fecha,
            r.description,
            a.name as cuenta,
            FORMAT(CASE WHEN ac.type = 'debe' THEN ac.amount ELSE 0 END, 2) as debe,
            FORMAT(CASE WHEN ac.type = 'haber' THEN ac.amount ELSE 0 END, 2) as haber,
            a.type_account as tipo_cuenta,
            FORMAT(a.balance, 2) as saldo
          FROM
            requests r
            INNER JOIN journals j ON r.request_id = j.request_id
            INNER JOIN account_records ac ON j.account_record_id = ac.id
            INNER JOIN accounts a ON ac.account_id = a.id
          WHERE 
            r.status = 'aprobada'
          ORDER BY j.createdAt, ac.type DESC
        `
        : `
          SELECT 
            TO_CHAR(j."createdAt", 'YYYY-MM-DD') as fecha,
            r.description,
            a.name as cuenta,
            TO_CHAR(CASE WHEN ac.type = 'debe' THEN ac.amount ELSE 0 END, 'FM999,999,999.00') as debe,
            TO_CHAR(CASE WHEN ac.type = 'haber' THEN ac.amount ELSE 0 END, 'FM999,999,999.00') as haber,
            a.type_account as tipo_cuenta,
            TO_CHAR(a.balance, 'FM999,999,999.00') as saldo
          FROM
            requests r
            INNER JOIN journals j ON r.request_id = j.request_id
            INNER JOIN account_records ac ON j.account_record_id = ac.id
            INNER JOIN accounts a ON ac.account_id = a.id
          WHERE 
            r.status = 'aprobada'
          ORDER BY j."createdAt", ac.type DESC
        `;

      const entries = await JournalDB.sequelize?.query(query, { type: 'SELECT' }) as any[];

      const excelData: ExcelData = {
        headers: ['Fecha', 'Descripción', 'Cuenta', 'Debe', 'Haber', 'Tipo de Cuenta', 'Saldo'],
        rows: [],
        totales: {
          debe: 0,
          haber: 0
        }
      };

      const entriesByDate = entries.reduce((acc, entry) => {
        const fecha = entry.fecha;
        if (!acc[fecha]) {
          acc[fecha] = {
            entries: [],
            subtotal: {
              debe: 0,
              haber: 0
            }
          };
        }
        acc[fecha].entries.push(entry);
        acc[fecha].subtotal.debe += Number(entry.debe.replace(/,/g, ''));
        acc[fecha].subtotal.haber += Number(entry.haber.replace(/,/g, ''));
        excelData.totales.debe += Number(entry.debe.replace(/,/g, ''));
        excelData.totales.haber += Number(entry.haber.replace(/,/g, ''));
        return acc;
      }, {});

      Object.keys(entriesByDate).forEach(fecha => {
        excelData.rows.push([
          { value: `Fecha: ${fecha}`, style: 'groupHeader' }
        ]);

        entriesByDate[fecha].entries.forEach((entry: JournalEntry) => {
          excelData.rows.push([
            entry.fecha,
            entry.description,
            entry.cuenta,
            entry.debe,
            entry.haber,
            entry.tipo_cuenta,
            entry.saldo
          ]);
        });

        excelData.rows.push([
          { value: 'Subtotal del día', style: 'subtotal' },
          '',
          '',
          { 
            value: entriesByDate[fecha].subtotal.debe.toFixed(2),
            style: 'number'
          },
          { 
            value: entriesByDate[fecha].subtotal.haber.toFixed(2),
            style: 'number'
          }
        ]);
      });

      excelData.rows.push([
        { value: 'TOTALES GENERALES', style: 'total' },
        '',
        '',
        { 
          value: excelData.totales.debe.toFixed(2),
          style: 'totalNumber'
        },
        { 
          value: excelData.totales.haber.toFixed(2),
          style: 'totalNumber'
        }
      ]);

      return {
        message: "Datos para Excel generados exitosamente",
        status: 200,
        data: excelData
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Contacte con el administrador",
        status: 500
      };
    }
  },

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
};

export { JournalServices };