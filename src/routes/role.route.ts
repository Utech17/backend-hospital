import { Router } from "express";
import { validateFields } from "../middlewares";
import { RoleController } from "../controllers";
import { RoleValidator } from "../validators";
const router = Router();
const roleValidator = new RoleValidator();
const roleController = new RoleController();

/**
 * @swagger
 * /roles/report:
 *   get:
 *     summary: Obtener un reporte en Excel de todos los roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Reporte creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reporte creado exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     report:
 *                       type: string
 *                       description: "Reporte en Excel en base64 de los roles"
 *                       example: "UEsDBBQAAAAAAAAAAACkAYS4tQIAALUCAAAaAAAAeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHM8P3htbCB..."
 */
router.get("/report", roleController.reportExcel);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Listar todos los roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Listado de roles exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Roles encontrados"
 *                 data:
 *                   type: object
 *                   properties:
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "gerentesss"
 *                           deletedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-09T04:33:16.000Z"
 *                           status:
 *                             type: boolean
 *                             example: false
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-08T19:10:01.000Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-09T04:33:16.000Z"
 */
router.get("/", roleController.all);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtener todas los clientes
 *     tags:
 *       - Roles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del rol que se desea obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del rol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role encontrado"
 *                 data:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "gerentesss"
 *                         deletedAt:
 *                           type: string
 *                           format: date-time
 *                           example: null
 *                         status:
 *                           type: boolean
 *                           example: true
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-08T19:10:01.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-08T19:10:01.000Z"
 *       404:
 *         description: Rol no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role no encontrado"
 *                 data:
 *                   type: object
 *                   example: {}
 */
router.get("/:id", roleController.one);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "gerentesss"
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rol creado exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "gerentesss"
 *                         deletedAt:
 *                           type: string
 *                           format: date-time
 *                           example: null
 *                         status:
 *                           type: boolean
 *                           example: true
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-08T19:10:01.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-08T19:10:01.000Z"
  *       400:
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "field"
 *                       msg:
 *                         type: string
 *                         example: "Nombre en uso : administrador, para el nuevo rol"
 *                       path:
 *                         type: string
 *                         example: "name"
 *                       location:
 *                         type: string
 *                         example: "body"
 */
router.post(
  "/",
  roleValidator.validateRole,
  roleValidator.validateIfNameIsUse,
  validateFields,
  roleController.create
);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualizar un rol existente
 *     tags:
 *       - Roles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del rol que se desea actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "gerentesss"
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rol actualizado exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "gerentesss"
 *                         deletedAt:
 *                           type: string
 *                           format: date-time
 *                           example: null
 *                         status:
 *                           type: boolean
 *                           example: true
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-08T19:10:01.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-08T19:10:01.000Z"
 *       400:
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "field"
 *                       msg:
 *                         type: string
 *                         example: "Nombre en uso : administrador, para el nuevo rol"
 *                       path:
 *                         type: string
 *                         example: "name"
 *                       location:
 *                         type: string
 *                         example: "body"
 *       404:
 *         description: Rol no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rol no encontrado"
 *                 data:
 *                   type: object
 *                   example: {}
 */ 
router.put(
  "/:id",
  roleValidator.validateRole,
  roleValidator.validateIfIdExist,
  roleValidator.validateIfNameIsUse,
  validateFields,
  roleController.update
);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar un rol existente
 *     tags:
 *       - Roles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del rol que se desea eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eliminación del rol exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Eliminación del Rol exitoso"
 *                 data:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: array
 *                       items:
 *                         type: integer
 *                       example: [null, 1]
 *       404:
 *         description: Rol no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rol no encontrado"
 *                 data:
 *                   type: object
 *                   example: {}
 */
router.delete("/:id", roleController.delete); 
export default router;
