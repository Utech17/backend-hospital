import { UserDB, EmployeeDB, db } from "../config";
import { UserInterface, EmployeeInterface } from "../interfaces";
import { createToken } from "../helpers";
import { OrganizationalUnitsDB } from "../config";
import { DepartmentDB } from "../config";
import { RoleDB } from "../config";
import bcrypt from 'bcryptjs';


const UserServices = {
  getAll: async () => {
    try {
      const users = await UserDB.findAll({
        include: [
          {
            model: RoleDB
          },
          {
            model: EmployeeDB,
            include: [{
              model: OrganizationalUnitsDB,
              include: [{
                model: DepartmentDB
              }]
            }]
          }
        ]
      });

      if (users.length === 0) {
        return {
          message: `No se encontraron usuarios`,
          status: 404,
          data: {
            users,
          },
        };
      }
      return {
        message: `Usuarios obtenidos correctamente`,
        status: 200,
        data: {
          users,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  getOne: async (id: number) => {
    try {
      const user = await UserDB.findOne({
        where: {
          id: id,
          status: true,
        },
        include: [
          {
            model: RoleDB
          },
          {
            model: EmployeeDB,
            include: [{
              model: OrganizationalUnitsDB,
              include: [{
                model: DepartmentDB
              }]
            }]
          }
        ]
      });

      if (!user) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      } else {
        return {
          message: `Registro encontrado`,
          status: 200,
          data: {
            user,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },

  create: async (data: any) => {
    const transaction = await db.transaction();
    try {
      // Crear el usuario (solo campos necesarios, los demás usan defaults)

      const hashPassword = bcrypt.hash(data.password as string, 10);
      console.log(hashPassword);

      const user: any = await UserDB.create(
        { 
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: (await hashPassword).toString(),
          role_id: data.role_id
        }, 
        { transaction }
      );

      // Crear el empleado asociado (solo campos necesarios)
      const employee = await EmployeeDB.create(
        {
          phone_number: data.phone_number,
          home_address: data.home_address,
          postal_code: data.postal_code,
          organizational_unit_id: data.organizational_unit_id,
          user_id: user.get('id')
        },
        { transaction }
      );

      await transaction.commit();

      return {
        message: `Usuario y empleado creados exitosamente`,
        status: 200,
        data: {
          user,
          employee,
        },
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  update: async (id: number, data: Partial<UserInterface & EmployeeInterface>) => {
    const transaction = await db.transaction();
    try {
      const hashPassword = bcrypt.hash(data.password as string, 10);

      // Actualizar datos del usuario
      const userUpdate = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashPassword,
        role_id: data.role_id
      };
      
      await UserDB.update(userUpdate, { 
        where: { id },
        transaction 
      });

      // Actualizar datos del empleado
      const employeeUpdate = {
        phone_number: data.phone_number,
        home_address: data.home_address,
        postal_code: data.postal_code,
        organizational_unit_id: data.organizational_unit_id
      };

      await EmployeeDB.update(employeeUpdate, { 
        where: { user_id: id },
        transaction 
      });

      await transaction.commit();

      const { data: updatedData } = await UserServices.getOne(id);
      
      return {
        message: `Usuario y empleado actualizados exitosamente`,
        status: 200,
        data: {
          user: updatedData?.user,
        },
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  delete: async (id: number) => {
    const transaction = await db.transaction();
    try {
      const now = new Date();
      
      // Borrado lógico del empleado
      await EmployeeDB.update(
        { 
          deletedAt: now,
          status: 'inactive'
        }, 
        { 
          where: { user_id: id },
          transaction 
        }
      );

      // Borrado lógico del usuario
      await UserDB.update(
        { 
          deletedAt: now,
          status: false
        }, 
        { 
          where: { id },
          transaction 
        }
      );

      await transaction.commit();

      return {
        message: `Usuario y empleado eliminados exitosamente`,
        status: 200,
        data: {},
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  getByEmail: async (email: string) => {
    try {
      const user: UserInterface | any = await UserDB.findOne({
        where: { email },
      });

      if (user === null) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {
            user,
          },
        };
      } 

      return {
        message: `Registro encontrado`,
        status: 200,
        data: {
          user,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contact the administrator: error`,
        status: 500,
      };
    }
  },
  
  login: async (email: string, password: string) => {
    try {
      if (!email || !password) {
        return {
          message: `Email y contraseña son requeridos`,
          status: 400,
        };
      }

      const { data, status } = await UserServices.getByEmail(email);
      const user = data?.user;

      if (status != 200) {
        return {
          message: `El email ${email} no está registrado`,
          status: 404,
          data: {},
        };
      }

      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        return {
          message: `La contraseña es incorrecta`,
          status: 401,
          data: {},
        };
      }
      
      const employee: any = await EmployeeDB.findOne({
          where: { user_id: user.id },
          include: [{
            model: OrganizationalUnitsDB,
            as: 'organizational_unit',
            include: [{
              model: DepartmentDB,
              as: 'departament'
            }]
          }]
        });

        const token = await createToken(user);
        
        return {
          message: `Login exitoso`,
          status: 200,
          data: {
            user,
            employee,
            department: employee?.get('organizational_unit')?.get('departament'),
            token,
          },
        };
    } catch (error: any) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },

  updateStatus: async (id: number, status: boolean) => {
    try {
      const user = await UserDB.findByPk(id);

      if (!user) {
        return {
          message: `Usuario con ID ${id} no encontrado`,
          status: 404,
          data: {},
        };
      }

      // Actualizar el estado
      await user.update({ status });

      return {
        message: `Estado del usuario actualizado correctamente`,
        status: 200,
        data: {
          user,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Por favor, contacte al administrador",
        status: 500,
      };
    }
  },
};

export { UserServices };