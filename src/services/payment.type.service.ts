import { PaymentTypeDB } from "../config"
import type { PaymentTypeInterface } from "../interfaces"

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
      console.log(error)
      return {
        message: "Contact the administrator: error",
        status: 500,
      }
    }
  },

  getOne: async (id: number | string) => {
    try {
      const paymentType = await PaymentTypeDB.findOne({
        where: {
          id,
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
      console.log(error)
      return {
        message: "Contact the administrator: error",
        status: 500,
      }
    }
  },

  create: async (data: Partial<PaymentTypeInterface>) => {
    try {
      const paymentType = await PaymentTypeDB.create({ ...data })
      return {
        message: "Successful creation",
        status: 201,
        data: {
          paymentType,
        },
      }
    } catch (error) {
      console.error("Error creating payment type:", error)
      if (error instanceof Error) {
        return {
          message: `Error creating payment type: ${error.message}`,
          status: 400,
        }
      }
      return {
        message: "An unexpected error occurred while creating the payment type.",
        status: 500,
      }
    }
  },

  update: async (data: Partial<PaymentTypeInterface>, id: number | string) => {
    try {
      const existingPaymentType = await PaymentTypeDB.findOne({ where: { id } })

      if (!existingPaymentType) {
        return {
          message: `Payment type with code ${id} does not exist.`,
          status: 404,
        }
      }

      await PaymentTypeDB.update(data, { where: { id } })

      const { data: updatedPaymentType } = await PaymentTypeService.getOne(id)

      return {
        message: "Successful update",
        status: 200,
        data: {
          paymentType: updatedPaymentType,
        },
      }
    } catch (error) {
      console.error("Error updating payment type:", error)

      return {
        message: "An error occurred while updating the payment type. Contact the administrator.",
        status: 500,
      }
    }
  },

  delete: async (id: number | string) => {
    try {
      await PaymentTypeDB.update(
        {
          status: false,
          deletedAt: new Date(),
        },
        { where: { id } },
      )
      return {
        message: "Successful removal",
        status: 200,
        data: {},
      }
    } catch (error) {
      return {
        message: "Contact the administrator: error",
        status: 500,
      }
    }
  },

  findById: async (id: string) => {
    try {
      const patient = await PaymentTypeDB.findOne({ where: { id } })
      if (patient) {
        return true
      }
      return false
    } catch (error) {
      console.error(error)
      return false
    }
  },

  findByName: async (description: string) => {
    try {
      const paymentType = await PaymentTypeDB.findOne({
        where: {
          description,
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
      console.log(error)
      return {
        message: "Contact the administrator: error",
        status: 500,
      }
    }
  },
}

export { PaymentTypeService }

