import { exportExcelAtoA } from "../helpers";
import { db, PayrollDB, PayrollDetailDB, ConceptDB } from "../config";
import { PayrollInterface, PayrollDetailInterface } from "../interfaces";

const PayrollServices = {
  getAll: async () => {
    try {
      const payrolls = await PayrollDB.findAll({ where: { status: true } });
      if (payrolls.length === 0) {
        return {
          message: `No records found`,
          status: 404,
          data: { payrolls },
        };
      }
      return {
        message: `Records found`,
        status: 200,
        data: { payrolls },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  getOne: async (id: number | string) => {
    try {
      const payroll = await PayrollDB.findOne({
        where: { id, status: true },
      });
      if (!payroll) {
        return {
          message: `Record not found`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Record found`,
        status: 200,
        data: { payroll },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  create: async (data: PayrollInterface & { details: PayrollDetailInterface[] }) => {
    const transaction = await db.transaction();
    try {
      const payroll = await PayrollDB.create(
        {
          employeeId: data.employeeId,
          startDate: data.startDate,
          endDate: data.endDate,
          grossSalary: data.grossSalary,
          deductions: data.deductions,
          netSalary: data.netSalary,
        },
        { transaction }
      );

      if (data.details && Array.isArray(data.details)) {
        const payrollDetails = await Promise.all(
          data.details.map(async (detail) => {
            const concept = await ConceptDB.findByPk(detail.id_concept, {
              transaction,
            });

            if (!concept) {
              throw new Error(`Concept with ID ${detail.id_concept} not found`);
            }

            return {
              id_payroll: payroll.dataValues.id,
              id_concept: detail.id_concept,
              amount: detail.amount,
              Concept: concept,
            };
          })
        );

        await PayrollDetailDB.bulkCreate(
          payrollDetails.map((detail) => ({
            id_payroll: detail.id_payroll,
            id_concept: detail.id_concept,
            amount: detail.amount,
          })),
          { transaction }
        );
      }

      await transaction.commit();

      const createdPayroll = await PayrollDB.findOne({
        where: { id: payroll.dataValues.id },
        include: [
          {
            model: PayrollDetailDB,
            include: [ConceptDB],
          },
        ],
      });

      return {
        message: "Payroll created successfully with details and concepts",
        status: 201,
        data: createdPayroll,
      };
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      await transaction.rollback();
      console.error(error);

      return {
        message: "An error occurred. Please contact the administrator",
        status: 500,
        error: errorMessage,
      };
    }
  },

  update: async (id: number | string, data: Partial<PayrollInterface> & { details?: PayrollDetailInterface[] }) => {
    const transaction = await db.transaction();
    try {
      await PayrollDB.update(data, { where: { id }, transaction });
  
      if (data.details && Array.isArray(data.details)) {
        await PayrollDetailDB.destroy({ where: { id_payroll: id }, transaction });
  
        const payrollDetails = await Promise.all(
          data.details.map(async (detail: PayrollDetailInterface) => { 
            const concept = await ConceptDB.findByPk(detail.id_concept, { transaction });
  
            if (!concept) {
              throw new Error(`Concept with ID ${detail.id_concept} not found`);
            }
  
            return {
              id_payroll: id,
              id_concept: detail.id_concept,
              amount: detail.amount,
              Concept: concept,
            };
          })
        );
  
        await PayrollDetailDB.bulkCreate(
          payrollDetails.map((detail) => ({
            id_payroll: detail.id_payroll,
            id_concept: detail.id_concept,
            amount: detail.amount,
          })),
          { transaction }
        );
      }
  
      await transaction.commit();
  
      const { data: updatedPayroll } = await PayrollServices.getOne(id);
  
      return {
        message: `Record updated successfully`,
        status: 200,
        data: { payroll: updatedPayroll?.payroll },
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },  

  delete: async (id: number) => {
    const transaction = await db.transaction();
    try {
      await PayrollDB.update(
        { status: false, deletedAt: new Date() },
        { where: { id }, transaction }
      );

      await PayrollDetailDB.destroy({ where: { id_payroll: id }, transaction });

      await transaction.commit();
      return {
        message: `Record deleted successfully`,
        status: 204,
        data: { payroll: null },
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  findByName: async (name: string) => {
    try {
      const payroll = await PayrollDB.findOne({ where: { name } });
      if (!payroll) {
        console.log("Record not found");
        return {
          message: `Record not found`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Record found`,
        status: 200,
        data: { payroll },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  reportToExcel: async () => {
    try {
      const payrolls = await PayrollDB.findAll();
      const report = payrolls.map((payroll: any) => payroll.dataValues);
      const mappedReport = report.map((record: any) => [
        record.id,
        record.name,
      ]);
      const { status, message, data } = await exportExcelAtoA(
        ["ID", "Name"],
        mappedReport,
        "PayrollReport"
      );
      return {
        message,
        status,
        data,
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },
};

export { PayrollServices };