import { exportExcelAtoA } from "../helpers";
import { PayrollDB } from "../config";
import { PayrollInterface } from "../interfaces";

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

  create: async (data: Partial<PayrollInterface>) => {
    try {
      const payroll = await PayrollDB.create(data);
      return {
        message: `Record created successfully`,
        status: 201,
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

  update: async (id: number | string, data: Partial<PayrollInterface>) => {
    try {
      await PayrollDB.update(data, { where: { id } });
      const { data: updatedPayroll } = await PayrollServices.getOne(id);
      return {
        message: `Record updated successfully`,
        status: 200,
        data: { payroll: updatedPayroll?.payroll },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  delete: async (id: number) => {
    try {
      await PayrollDB.update(
        { status: false, deletedAt: new Date() },
        { where: { id } }
      );
      return {
        message: `Record deleted successfully`,
        status: 204,
        data: { payroll: null },
      };
    } catch (error) {
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
      const mappedReport = report.map((record: any) => [record.id, record.name]);
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