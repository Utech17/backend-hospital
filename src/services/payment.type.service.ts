import { PaymentTypeDB } from "../config";
import { PaymentTypeInterface } from "../interfaces";

const PaymentTypeService = {
  getAll: async () => {
    try {
      const paymentTypes = await PaymentTypeDB.findAll({
        where: {
          status: true,
        },
      })

      if (paymentTypes.length === 0) {
        return {
          message: "Records not found",
          status: 404,
          data: {
            paymentTypes,
          },
        }
      }

      return {
        message: "Records found",
        status: 200,
        data: {
          paymentTypes,
        },
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Contact the administrator: error",
        status: 500,
      }
    }
  },

  getOne: async (paymentTypeCode: number | string) => {
    try {
      const paymentType = await PaymentTypeDB.findOne({
        where: {
          paymentTypeCode,
          status: true,
        },
      })

      if (!paymentType) {
        return {
          message: "Record not found",
          status: 404,
          data: {},
        }
      } else {
        return {
          message: "Record found",
          status: 200,
          data: {
            paymentType,
          },
        }
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Contact the administrator: error",
        status: 500,
      }
    }
  },

  create: async (data: Partial<PaymentTypeInterface>) => {
    try {
      const paymentType = await PaymentTypeDB.create({ ...data });
      return {
        message: "Successful creation",
        status: 201,
        data: {
          paymentType,
        },
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Contact the administrator: error",
        status: 500,
      }
    }
  },

  update: async (data: Partial<PaymentTypeInterface>, paymentTypeCode: number | string) => {
    try {
      // Verificar si el registro existe antes de intentar actualizarlo
      const existingPaymentType = await PaymentTypeDB.findOne({ where: { paymentTypeCode } });
  
      if (!existingPaymentType) {
        return {
          message: `Payment type with code ${paymentTypeCode} does not exist.`,
          status: 404,
        };
      }
  
      // Actualizar el registro
      await PaymentTypeDB.update(data, { where: { paymentTypeCode } });
  
      // Obtener el registro actualizado
      const { data: updatedPaymentType } = await PaymentTypeService.getOne(paymentTypeCode);
  
      return {
        message: "Successful update",
        status: 200,
        data: {
          paymentType: updatedPaymentType,
        },
      };
    } catch (error) {
      console.error("Error updating payment type:", error);
  
      return {
        message: "An error occurred while updating the payment type. Contact the administrator.",
        status: 500,
      };
    }
  },  

  delete: async (paymentTypeCode: number | string) => {
    try {
      await PaymentTypeDB.update(
        {
          status: false,
          deletedAt: new Date(),
        },
        { where: { paymentTypeCode } }
      )
      return {
        message: "Successful removal",
        status: 204,
        data: {},
      }
    } catch (error) {
      return {
        message: "Contact the administrator: error",
        status: 500,
      }
    }
  },

  findByCode: async (paymentTypeCode: string) => {
    try {
      const paymentType = await PaymentTypeDB.findOne({ where: { paymentTypeCode } });
      if (!paymentType) {
        return {
          message: "Record not found",
          status: 404,
          data: {},
        };
      } else {
        return {
          message: "Record found",
          status: 200,
          data: {
            paymentType,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Contact the administrator: error",
        status: 500,
      };
    }
  },

  findByName: async (paymentTypeDescription: string) => {
    try {
      const paymentType = await PaymentTypeDB.findOne({
        where: {
          paymentTypeDescription,
          status: true,
        },
      });
  
      if (!paymentType) {
        return {
          message: "Record not found",
          status: 404,
          data: {},
        };
      } else {
        return {
          message: "Record found",
          status: 200,
          data: {
            paymentType,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Contact the administrator: error",
        status: 500,
      };
    }
  },  
}

export { PaymentTypeService }