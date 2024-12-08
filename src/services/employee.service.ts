import { EmployeeDB } from "../config";
import { EmployeeInterface } from "../interfaces"; 

const EmployeeServices = {
  getAll: async () => {
    try {
      const employees = await EmployeeDB.findAll();
      if (employees.length === 0) {
        return {
          message: `No employees found`,
          status: 404,
          data: {
            employees,
          },
        };
      }
      return {
        message: `Employees found successfully`,
        status: 200,
        data: {
          employees,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  getOne: async (id: number) => {
    try {
      const employee = await EmployeeDB.findOne({ where: { id } });
      if (!employee) {
        return {
          message: `Employee not found`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Employee found`,
        status: 200,
        data: {
          employee,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  create: async (data: Partial<EmployeeInterface>) => {
    try {
      const employee = await EmployeeDB.create({ ...data });
      return {
        message: `Employee created successfully`,
        status: 201,
        data: {
          employee,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  update: async (id: number, data: Partial<EmployeeInterface>) => {
    try {
      await EmployeeDB.update(data, { where: { id } });
      const { data: updatedData } = await EmployeeServices.getOne(id);
      return {
        message: `Employee updated successfully`,
        status: 200,
        data: {
          employee: updatedData?.employee,
        },
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
      await EmployeeDB.destroy({ where: { id } });
      return {
        message: `Employee deleted successfully`,
        status: 204,
        data: {},
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

export { EmployeeServices };