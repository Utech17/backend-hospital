import express from "express";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import {
  MedicalHistoryRoute,
  ContractRoute,
  InventoryMovementRoute,
  EventRoute,
  ContactRoute,
  ConceptRoute,
  TypeRoute,
  ClientRoute,
  DepartamentRoute,
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
  PurchaseDetailsRoute,
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
  InvoiceDetailRoute,
} 
from "../routes/index.route";

import { db } from "../config/sequelize.config";
import { swaggerOptions } from "../config";

export class Server {
  private app: any;
  private port: string | number;
  private pre: string;
  private paths: any;
  constructor() {
    this.app = express();
    this.port = process.env.API_PORT || 3880;
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
      Departament: this.pre + "/Departament",
      Charge: this.pre + "/Charge",
      Action: this.pre + "/Action",
      EventDetails: this.pre + "/EventDetails",
      EventType: this.pre + "/EventType",
      Product: this.pre + "/Product",
      Patient: this.pre + "/Patient",
      User: this.pre + "/User",
      Role: this.pre + "/Role",
      Class: this.pre + "/Class",
      Attendance: this.pre + "/Attendance",
      Sale: this.pre + "/Sale",
      Store: this.pre + "/Store",
      PurchaseDetails: this.pre + "/PurchaseDetails",
      Appointment: this.pre + "/Appointment",
      Presentation: this.pre + "/Presentation",
      WorkingDay: this.pre + "/WorkingDay",
      Billing: this.pre + "/Billing",
      Employee: this.pre + "/Employee",
      Buy: this.pre + "/Buy",
      PaymentType: this.pre + "/PaymentType",
      Payroll: this.pre + "/Payroll",
      OrganizationalUnits: this.pre + "/OrganizationalUnits",
      Account: this.pre + "/Account",
      AccounRecord: this.pre + "/AccounRecord",
      Journal: this.pre + "/Journal",
      Request: this.pre + "/Request",
      RequestType: this.pre + "/RequestType",
      PayrollDetail: this.pre + "/PayrollDetail",
      Supplier: this.pre + "/Supplier",
      InvoiceDetail: this.pre + "/InvoiceDetail",
    };
    this.connectDB();
    this.middlewares();
    this.routes();
    this.swaggerSetup();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("src/public"));
  }

  routes() {
    this.app.use(this.paths.Contract, ContractRoute);
    this.app.use(this.paths.MedicalHistory, MedicalHistoryRoute);
    this.app.use(this.paths.InventoryMovement, InventoryMovementRoute);
    this.app.use(this.paths.Event, EventRoute);
    this.app.use(this.paths.Contact, ContactRoute);
    this.app.use(this.paths.Concept, ConceptRoute);
    this.app.use(this.paths.Type, TypeRoute);
    this.app.use(this.paths.Client, ClientRoute);
    this.app.use(this.paths.Departament, DepartamentRoute);
    this.app.use(this.paths.Charge, ChargeRoute);
    this.app.use(this.paths.Actio, ActionRoute);
    this.app.use(this.paths.EventDetails, EventDetailsRoute);
    this.app.use(this.paths.EventType, EventTypeRoute);
    this.app.use(this.paths.Product, ProductRoute);
    this.app.use(this.paths.Patient, PatientRoute);
    this.app.use(this.paths.User, UserRoute);
    this.app.use(this.paths.Role, roleRoute);
    this.app.use(this.paths.Class, ClassRoute);
    this.app.use(this.paths.Attendance, AttendanceRoute);
    this.app.use(this.paths.Sale, SaleRoute);
    this.app.use(this.paths.Store, StoreRoute);
    this.app.use(this.paths.PurchaseDetails, PurchaseDetailsRoute);
    this.app.use(this.paths.Appointment, AppointmentRoute);
    this.app.use(this.paths.Presentation, PresentationRoute);
    this.app.use(this.paths.WorkingDay, WorkingDayRoute);
    this.app.use(this.paths.Billing, BillingRoute);
    this.app.use(this.paths.Employee, EmployeeRoute);
    this.app.use(this.paths.Buy, BuyRoute);
    this.app.use(this.paths.PaymentType, PaymentTypeRoute);
    this.app.use(this.paths.Payroll, PayrollRoute);
    this.app.use(this.paths.OrganizationalUnits, OrganizationalUnitsRoute);
    this.app.use(this.paths.Account, AccountRoute);
    this.app.use(this.paths.AccounRecord, AccounRecordRoute);
    this.app.use(this.paths.Journal, JournalRoute);
    this.app.use(this.paths.Request, RequestRoute);
    this.app.use(this.paths.RequestType, RequestTypeRoute);
    this.app.use(this.paths.PayrollDetail, PayrollDetailRoute);
    this.app.use(this.paths.Supplier, SupplierRoute);
    this.app.use(this.paths.InvoiceDetail, InvoiceDetailRoute);
  }
  async connectDB() {
    await db
      .authenticate()
      .then(() => {
        console.log("Conexión exitosa a la base de datos");
      })
      .catch((error: any) => {
        console.log("No se pudo conectar a la base de datos");
      });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en localhost:${this.port}`);
    });
  }
  swaggerSetup() {
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}
