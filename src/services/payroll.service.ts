import { db, PayrollDB, PayrollDetailDB, ConceptDB } from "../config";
import { Model } from "sequelize";
import { PayrollInterface, PayrollDetailInterface } from "../interfaces";

const PayrollServices = {
  getAll: async () => {
    try {
      const payrolls = await PayrollDB.findAll({
        include: [
          {
            model: PayrollDetailDB,
            include: [ConceptDB],
          },
        ],
      });
      if (payrolls.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: { payrolls },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: { payrolls },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },

  getOne: async (id: number | string) => {
    try {
      const payroll = await PayrollDB.findOne({
        where: { id },
        include: [
          {
            model: PayrollDetailDB,
            include: [ConceptDB],
          },
        ],
      });
      if (!payroll) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Registro encontrado`,
        status: 200,
        data: { payroll },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },

  create: async (data: PayrollInterface & { details: PayrollDetailInterface[] }) => {
    const transaction = await db.transaction();
    try {
      // Verificar si ya existe una nómina para el employee_id en el mismo período
      const existingPayroll = await PayrollDB.findOne({
        where: {
          employee_id: data.employee_id,
          startDate: data.startDate,
          endDate: data.endDate,
        },
        transaction,
      });

      if (existingPayroll) {
        return {
          message: `Ya existe una nómina para el empleado con ID ${data.employee_id} en el período especificado`,
          status: 400,
        };
      }

      const payroll = await PayrollDB.create(
        {
          employee_id: data.employee_id,
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
            const concept = await ConceptDB.findByPk(detail.concept_id, {
              transaction,
            }) as Model<any, any> & { id: number };

            if (!concept) {
              throw new Error(`Concepto con ID ${detail.concept_id} no encontrado`);
            }

            return {
              payroll_id: payroll.dataValues.id,
              concept_id: concept.id,
              amount: detail.amount,
              Concept: concept,
            };
          })
        );

        await PayrollDetailDB.bulkCreate(
          payrollDetails.map((detail) => ({
            payroll_id: detail.payroll_id,
            concept_id: detail.concept_id,
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
        message: "Nómina creada exitosamente con detalles y conceptos",
        status: 201,
        data: createdPayroll,
      };
    } catch (error) {
      let errorMessage = "Ocurrió un error inesperado";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      await transaction.rollback();
      console.error(error);

      return {
        message: "Ocurrió un error. Por favor contacte al administrador",
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
        await PayrollDetailDB.destroy({ where: { payroll_id: id }, transaction });

        const payrollDetails = await Promise.all(
          data.details.map(async (detail: PayrollDetailInterface) => {
            const concept = await ConceptDB.findByPk(detail.concept_id, { transaction });

            if (!concept) {
              throw new Error(`Concepto con ID ${detail.concept_id} no encontrado`);
            }

            return {
              payroll_id: id,
              concept_id: detail.concept_id,
              amount: detail.amount,
              Concept: concept,
            };
          })
        );

        await PayrollDetailDB.bulkCreate(
          payrollDetails.map((detail) => ({
            payroll_id: detail.payroll_id,
            concept_id: detail.concept_id,
            amount: detail.amount,
          })),
          { transaction }
        );
      }

      await transaction.commit();

      const updatedPayroll = await PayrollDB.findOne({
        where: { id },
        include: [
          {
            model: PayrollDetailDB,
            include: [ConceptDB],
          },
        ],
      });

      return {
        message: `Registro actualizado exitosamente`,
        status: 200,
        data: updatedPayroll,
      };
    } catch (error) {
      let errorMessage = "Ocurrió un error inesperado";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      await transaction.rollback();
      console.error(error);

      return {
        message: "Ocurrió un error. Por favor contacte al administrador",
        status: 500,
        error: errorMessage,
      };
    }
  },

  delete: async (id: number) => {
    const transaction = await db.transaction();
    try {
      await PayrollDB.update(
        { status: false },
        { where: { id }, transaction }
      );

      await PayrollDetailDB.update({ status: false }, { where: { payroll_id: id }, transaction });

      await transaction.commit();
      return {
        message: `Registro eliminado exitosamente`,
        status: 200,
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },
};

export { PayrollServices };