import express from "express";
import cors from "cors";
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
      Contract: this.pre + "/Contracts",
      MedicalHistory: this.pre + "/MedicalHistory",
      Event: this.pre + "/Event",
      InventoryMovement: this.pre + "/InventoryMovement",
      Contact: this.pre + "/Contact",
      Concept: this.pre + "/Concept",
      Type: this.pre + "/Type",
      Client: this.pre + "/Client",
      Department: this.pre + "/Department",
      Charge: this.pre + "/Charge",
      Action: this.pre + "/Action",
      EventDetails: this.pre + "/EventDetails",
      EventType: this.pre + "/EventType",
      Product: this.pre + "/Product",
      Patient: this.pre + "/Patient",
      User: this.pre + "/User",
      Class: this.pre + "/Class",
      Attendance: this.pre + "/Attendance",
      Sale: this.pre + "/Sale",
      Store: this.pre + "/Store",
      PaymentType: this.pre + "/PaymentType",
      BuyDetails: this.pre + "/BuyDetails",
      Appointment: this.pre + "/Appointment",
      Presentation: this.pre + "/Presentation",
      Payroll: this.pre + "/Payroll",
      WorkingDay: this.pre + "/WorkingDay",
      Billing: this.pre + "/Billing",
      Employee: this.pre + "/Employee",
      Buy: this.pre + "/Buy",
      Role: this.pre + "/Role",
      OrganizationalUnits: this.pre + "/OrganizationalUnits",
      Account: this.pre + "/Account",
      AccountRecord: this.pre + "/AccountRecord",
      Journal: this.pre + "/Journal",
      Request: this.pre + "/Request",
      RequestType: this.pre + "/RequestType",
      PayrollDetail: this.pre + "/PayrollDetail",
      Supplier: this.pre + "/Supplier",
      BillingDetail: this.pre + "/BillingDetail",
      Inventory: this.pre + "/Inventory",
    };

    this.middlewares();
    this.routes();
    this.dbConnection();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
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
}

export default Server;
