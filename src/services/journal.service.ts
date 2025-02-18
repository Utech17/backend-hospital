import { JournalDB } from "../config";
import { JournalInterface } from "../interfaces";

const JournalServices = {
  getDiaryEntries: async () => {
    try {
      const entries = await JournalDB.sequelize?.query(`
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
      `, { type: 'SELECT' }) as any[];

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
      const balanceSheet = await JournalDB.sequelize?.query(`
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
      `, { type: 'SELECT' }) as any[];

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
      const incomeStatement = await JournalDB.sequelize?.query(`
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
      `, { type: 'SELECT' }) as any[];

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
};

export { JournalServices };