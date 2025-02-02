import express from "express";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "../config";
import {
  MedicalHistoryRoute,
  ContractRoute,
  InventoryMovementRoute,
  EventRoute,
  ContactRoute,
  ConceptRoute,
  TypeRoute,
  ClientRoute,
  DepartmentRoute,
  ChargeRoute,
  ActionRoute,
  EventDetailsRoute,
  EventTypeRoute,
  ProductRoute,
  PatientRoute,
  UserRoute,
  ClassRoute,
  AttendanceRoute,
  SaleRoute,
  StoreRoute,
  PaymentTypeRoute,
  BuyDetailsRoute,
  AppointmentRoute,
  PresentationRoute,
  PayrollRoute,
  WorkingDayRoute,
  BillingRoute,
  EmployeeRoute,
  BuyRoute,
  roleRoute,
  OrganizationalUnitsRoute,
  AccountRoute,
  AccounRecordRoute,
  JournalRoute,
  RequestRoute,
  RequestTypeRoute,
  PayrollDetailRoute,
  SupplierRoute,
  BillingDetailRoute,
  InventoryRoute,
} from "../routes/index.route";
import { db } from "../config/sequelize.config";

export class Server {
  private app: express.Application;
  private port: string | number;
  private pre: string;
  private paths: any;

  constructor() {
    this.app = express();
    this.port = process.env.API_PORT || 3900;
    this.pre = "/api";
    this.paths = {
      Action: this.pre + "/Action",
      Account: this.pre + "/Account",
      AccountRecord: this.pre + "/AccountRecord",
      Appointment: this.pre + "/Appointment",
      Attendance: this.pre + "/Attendance",
      Billing: this.pre + "/Billing",
      BillingDetail: this.pre + "/BillingDetail",
      Buy: this.pre + "/Buy",
      BuyDetails: this.pre + "/BuyDetails",
      Charge: this.pre + "/Charge",
      Class: this.pre + "/Class",
      Client: this.pre + "/Client",
      Concept: this.pre + "/Concept",
      Contact: this.pre + "/Contact",
      Contract: this.pre + "/Contract",
      Department: this.pre + "/Department",
      Employee: this.pre + "/Employee",
      Event: this.pre + "/Event",
      EventDetails: this.pre + "/EventDetail",
      EventType: this.pre + "/EventType",
      Inventory: this.pre + "/Inventory",
      InventoryMovement: this.pre + "/InventoryMovement",
      Journal: this.pre + "/Journal",
      MedicalHistory: this.pre + "/MedicalHistory",
      OrganizationalUnits: this.pre + "/OrganizationalUnit",
      Patient: this.pre + "/Patient",
      PaymentType: this.pre + "/PaymentType",
      Payroll: this.pre + "/Payroll",
      PayrollDetail: this.pre + "/PayrollDetail",
      Presentation: this.pre + "/Presentation",
      Product: this.pre + "/Product",
      Request: this.pre + "/Request",
      RequestType: this.pre + "/RequestType",
      Role: this.pre + "/Role",
      Sale: this.pre + "/Sale",
      Store: this.pre + "/Store",
      Supplier: this.pre + "/Supplier",
      Type: this.pre + "/Type",
      User: this.pre + "/User",
      WorkingDay: this.pre + "/WorkingDay",
    };
    this.middlewares();
    this.routes();
    this.dbConnection();
    this.swaggerSetup();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("src/public"));
  }

  private routes() {
    this.app.use(this.paths.Contract, ContractRoute);
    this.app.use(this.paths.MedicalHistory, MedicalHistoryRoute);
    this.app.use(this.paths.Event, EventRoute);
    this.app.use(this.paths.InventoryMovement, InventoryMovementRoute);
    this.app.use(this.paths.Contact, ContactRoute);
    this.app.use(this.paths.Concept, ConceptRoute);
    this.app.use(this.paths.Type, TypeRoute);
    this.app.use(this.paths.Client, ClientRoute);
    this.app.use(this.paths.Department, DepartmentRoute);
    this.app.use(this.paths.Charge, ChargeRoute);
    this.app.use(this.paths.Action, ActionRoute);
    this.app.use(this.paths.EventDetails, EventDetailsRoute);
    this.app.use(this.paths.EventType, EventTypeRoute);
    this.app.use(this.paths.Product, ProductRoute);
    this.app.use(this.paths.Patient, PatientRoute);
    this.app.use(this.paths.User, UserRoute);
    this.app.use(this.paths.Class, ClassRoute);
    this.app.use(this.paths.Attendance, AttendanceRoute);
    this.app.use(this.paths.Sale, SaleRoute);
    this.app.use(this.paths.Store, StoreRoute);
    this.app.use(this.paths.PaymentType, PaymentTypeRoute);
    this.app.use(this.paths.BuyDetails, BuyDetailsRoute);
    this.app.use(this.paths.Appointment, AppointmentRoute);
    this.app.use(this.paths.Presentation, PresentationRoute);
    this.app.use(this.paths.Payroll, PayrollRoute);
    this.app.use(this.paths.WorkingDay, WorkingDayRoute);
    this.app.use(this.paths.Billing, BillingRoute);
    this.app.use(this.paths.Employee, EmployeeRoute);
    this.app.use(this.paths.Buy, BuyRoute);
    this.app.use(this.paths.Role, roleRoute);
    this.app.use(this.paths.OrganizationalUnits, OrganizationalUnitsRoute);
    this.app.use(this.paths.Account, AccountRoute);
    this.app.use(this.paths.AccountRecord, AccounRecordRoute);
    this.app.use(this.paths.Journal, JournalRoute);
    this.app.use(this.paths.Request, RequestRoute);
    this.app.use(this.paths.RequestType, RequestTypeRoute);
    this.app.use(this.paths.PayrollDetail, PayrollDetailRoute);
    this.app.use(this.paths.Supplier, SupplierRoute);
    this.app.use(this.paths.BillingDetail, BillingDetailRoute);
    this.app.use(this.paths.Inventory, InventoryRoute);
  }

  private async dbConnection() {
    try {
      await db.authenticate();
      console.log("Conexión exitosa a la base de datos...");
    } catch (error) {
      console.error("No se pudo conectar a la base de datos:", error);
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }

  swaggerSetup() {
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}

export default Server;
