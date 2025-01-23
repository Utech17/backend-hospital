import { Sequelize } from "sequelize";

import {
  MedicalHistoryModel,
  InventoryMovementModel,
  ContractModel,
  EventModel,
  ContactModel,
  ConceptModel,
  TypeModel,
  ClientModel,
  DepartmentModel,
  ChargeModel,
  EventTypeModel,
  EventDetailsModel,
  ActionModel,
  ProductModel,
  PatientModel,
  UserModel,
  ClassModel,
  AttendanceEmployeeModel,
  SaleModel,
  StoreModel,
  PaymentTypeModel,
  buyDetailsModel,
  AppointmentModel,
  PresentationModel,
  PayrollModel,
  WorkingDayModel,
  BillingModel,
  EmployeeModel,
  BuyModel,
  RoleModel,
  OrganizationalUnitsModel,
  AccountModel,
  AccountRecordModel,
  JournalModel,
  RequestModel,
  RequestTypeModel,
  PayrollDetailModel,
  SupplierModel,
  BillingDetailModel,
  InventoryModel,
} 
from "../models";

const dbName: string | undefined = process.env.DATABASE_NAME
  ? process.env.DATABASE_NAME
  : "hospital";

const dbUser: string | undefined = process.env.DATABASE_USER
  ? process.env.DATABASE_USER
  : "root";

const dbPassword: string | undefined = process.env.DATABASE_PASSWORD
  ? process.env.DATABASE_PASSWORD
  : "";

// Instanciamos el objeto Sequelize
const db = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});

// CREAMOS LAS TABLAS EN ORDEN ALFABETICO
const AccountDB = db.define("account", AccountModel);
const AccountRecordDB = db.define("account_record", AccountRecordModel);
const ActionDB = db.define("action", ActionModel);
const AppointmentDB = db.define("appointment", AppointmentModel);
const AttendanceDB = db.define("attendance", AttendanceEmployeeModel);
const BillingDB = db.define("billing", BillingModel);
const BuyDB = db.define("buy", BuyModel);
const ChargeDB = db.define("charge", ChargeModel);
const ClassDB = db.define("class", ClassModel);
const ClientDB = db.define("client", ClientModel);
const ConceptDB = db.define("concept", ConceptModel);
const ContactDB = db.define("contact", ContactModel);
const ContractDB = db.define("contract", ContractModel);
const DepartmentDB = db.define("departament", DepartmentModel);
const EmployeeDB = db.define("employee", EmployeeModel);
const EventDB = db.define("event", EventModel);
const EventDetailsDB = db.define("event_detail", EventDetailsModel);
const EventTypeDB = db.define("event_type", EventTypeModel);
const InventoryDB = db.define("inventory", InventoryModel);
const InventoryMovementDB = db.define("inventory_movement", InventoryMovementModel);
const BillingDetailDB = db.define("billing_detail", BillingDetailModel);
const JournalDB = db.define("journal", JournalModel);
const MedicalHistoryDB = db.define("medical_history", MedicalHistoryModel);
const OrganizationalUnitsDB = db.define("organizational_unit", OrganizationalUnitsModel);
const PatientDB = db.define("Patient", PatientModel);
const PaymentTypeDB = db.define("payment_type", PaymentTypeModel);
const PayrollDetailDB = db.define("payroll_detail", PayrollDetailModel);
const PayrollDB = db.define("payroll", PayrollModel);
const PresentationDB = db.define("presentation", PresentationModel);
const RequestDB = db.define("request", RequestModel);
const RequestTypeDB = db.define("request_type", RequestTypeModel);
const ProductDB = db.define("product", ProductModel);
const BuyDetailsDB = db.define("buy_detail", buyDetailsModel);
const RoleDB = db.define("role", RoleModel);
const SaleDB = db.define("sale", SaleModel);
const StoreDB = db.define("store", StoreModel);
const SupplierDB = db.define("supplier", SupplierModel);
const TypeDB = db.define("type", TypeModel);
const UserDB = db.define("user", UserModel);
const WorkingDayDB = db.define("working_day", WorkingDayModel);

// En las relaciones importa el orden de la jerarquia
// MedicalHistoryDB
PatientDB.hasMany(MedicalHistoryDB, { foreignKey: "patient_id" });
MedicalHistoryDB.belongsTo(PatientDB, { foreignKey: "patient_id" });

//InventoryMovementDB
StoreDB.hasMany(InventoryMovementDB, { foreignKey: "store_id" });
InventoryMovementDB.belongsTo(StoreDB, { foreignKey: "store_id" });

// ContractDB
WorkingDayDB.hasMany(ContractDB, {foreignKey: "working_day_id"});
ContractDB.belongsTo(WorkingDayDB, {foreignKey: "working_day_id"});

ChargeDB.hasMany(ContractDB, {foreignKey: "charge_id"});
ContractDB.belongsTo(ChargeDB, {foreignKey: "charge_id"});

EmployeeDB.hasMany(ContractDB, {foreignKey: "employee_id"});
ContractDB.belongsTo(EmployeeDB, {foreignKey: "employee_id"});

// EventDB
MedicalHistoryDB.hasMany(EventDB, { foreignKey: "history_id" });
EventDB.belongsTo(MedicalHistoryDB, { foreignKey: "history_id" });

EventTypeDB.hasMany(EventDB, { foreignKey: "type_events_id" });
EventDB.belongsTo(EventTypeDB, { foreignKey: "type_events_id" });

EmployeeDB.hasMany(EventDB, { foreignKey: "employee_id" });
EventDB.belongsTo(EmployeeDB, { foreignKey: "employee_id" });

// ContactDB
PatientDB.hasMany(ContactDB, { foreignKey: "patient_id" });
ContactDB.belongsTo(PatientDB, { foreignKey: "patient_id" });

//EventDetailsDB
EventDB.hasMany(EventDetailsDB, { foreignKey: "events" })
EventDetailsDB.belongsTo(EventDB, { foreignKey: "events" })

ActionDB.hasMany(EventDetailsDB, { foreignKey: "actions_id" })
EventDetailsDB.belongsTo(ActionDB, { foreignKey: "actions_id" })

//ProductDB
TypeDB.hasMany(ProductDB, { foreignKey: "cod_type" });
ProductDB.belongsTo(TypeDB, { foreignKey: "cod_type" });

ClassDB.hasMany(ProductDB, { foreignKey: "cod_class" });
ProductDB.belongsTo(ClassDB, { foreignKey: "cod_class" }); 

PresentationDB.hasMany(ProductDB, { foreignKey: "cod_pres" }); 
ProductDB.belongsTo(PresentationDB, { foreignKey: "cod_pres" });

//UserDB
RoleDB.hasMany(UserDB, { foreignKey: "role_id" });
UserDB.belongsTo(RoleDB, { foreignKey: "role_id" });

//AttendanceDB
EmployeeDB.hasMany(AttendanceDB, { foreignKey: "employee_id" });
AttendanceDB.belongsTo(EmployeeDB, { foreignKey: "employee_id" });

//SaleDB
PaymentTypeDB.hasMany(SaleDB, { foreignKey: "payment_type_id" });
SaleDB.belongsTo(PaymentTypeDB, { foreignKey: "payment_type_id" });

//StoreDB
DepartmentDB.hasMany(StoreDB, { foreignKey: "department_id" }); 
StoreDB.belongsTo(DepartmentDB, { foreignKey: "department_id" });

//PurchaseDetailsDB
BuyDB.hasMany(BuyDetailsDB, { foreignKey: "buy_id" });
BuyDetailsDB.belongsTo(BuyDB, { foreignKey: "buy_id" });

ProductDB.hasMany(BuyDetailsDB, { foreignKey: "product_id" });
BuyDetailsDB.belongsTo(ProductDB, { foreignKey: "product_id" });

//AppointmentDB
PatientDB.hasMany(AppointmentDB, { foreignKey: "patien_id" });
AppointmentDB.belongsTo(PatientDB, { foreignKey: "patient_id" });

EmployeeDB.hasMany(AppointmentDB, { foreignKey: "employee_id" });
AppointmentDB.belongsTo(EmployeeDB, { foreignKey: "employee_id" });

//PayrollDB
EmployeeDB.hasMany(PayrollDB, { foreignKey: "employee_id" });
PayrollDB.belongsTo(EmployeeDB, { foreignKey: "employee_id"});

//BillingDB
PatientDB.hasMany(BillingDB, { foreignKey: "patient_id" });
BillingDB.belongsTo(PatientDB, { foreignKey: "patient_id" });

ClientDB.hasMany(BillingDB, { foreignKey: "client_id" });
BillingDB.belongsTo(ClientDB, { foreignKey: "client_id" });

//EmployeeDB
OrganizationalUnitsDB.hasMany(EmployeeDB, { foreignKey: "organizational_unit_id" });
EmployeeDB.belongsTo(OrganizationalUnitsDB, { foreignKey: "organizational_unit_id" });

UserDB.hasMany(EmployeeDB, { foreignKey: "user_id" });
EmployeeDB.belongsTo(UserDB, { foreignKey: "user_id" });

//BuyDB
SupplierDB.hasMany(BuyDB, {foreignKey: "supplier_id"});
BuyDB.belongsTo(SupplierDB, {foreignKey: "supplier_id"});

//OrganizationalUnitsDB
DepartmentDB.hasMany(OrganizationalUnitsDB, {foreignKey: "department_id"});
OrganizationalUnitsDB.belongsTo(DepartmentDB, {foreignKey: "department_id"});

// RequestTypeDB
DepartmentDB.hasMany(RequestTypeDB, {foreignKey: "department_id"});
RequestTypeDB.belongsTo(DepartmentDB, { foreignKey: "department_id" });

// RequestDB
RequestTypeDB.hasMany(RequestDB, { foreignKey: "request_type_id" });
RequestDB.belongsTo(RequestTypeDB, { foreignKey: "request_type_id" });

// AccountRecordDB
AccountDB.hasMany(AccountRecordDB, { foreignKey: "account_id" });
AccountRecordDB.belongsTo(AccountDB, { foreignKey: "account_id" });

// JournalDB
RequestDB.hasMany(JournalDB, { foreignKey: "request_id" });
JournalDB.belongsTo(RequestDB, { foreignKey: "request_id" });

AccountRecordDB.hasMany(JournalDB, { foreignKey: "account_record_id" });
JournalDB.belongsTo(AccountRecordDB, { foreignKey: "account_record_id" });

//PayrollDetailDB
ConceptDB.hasMany(PayrollDetailDB, { foreignKey: "concept_id" });
PayrollDetailDB.belongsTo(ConceptDB, { foreignKey: "concept_id" });

PayrollDB.hasMany(PayrollDetailDB, { foreignKey: "payroll_id" });
PayrollDetailDB.belongsTo(PayrollDB, { foreignKey: "payroll_id" });


// BillingDetailDB
BillingDB.hasMany(BillingDetailDB, { foreignKey: "billing_id" });
BillingDetailDB.belongsTo(BillingDB, { foreignKey: "billing_id" });

ProductDB.hasMany(BillingDetailDB, { foreignKey: "product_id" });
BillingDetailDB.belongsTo(ProductDB, { foreignKey: "product_id" });

// InventoryDB
ProductDB.hasMany(InventoryDB, { foreignKey: "product_id" });
InventoryDB.belongsTo(ProductDB, { foreignKey: "product_id" });

OrganizationalUnitsDB.hasMany(InventoryDB, { foreignKey: "organizational_unit_id" });
InventoryDB.belongsTo(OrganizationalUnitsDB, { foreignKey: "organizational_unit_id" });

// Sincroniza los modelos con la base de datos
const syncModels = async () => {
  await db.sync({ alter: true });
  try {
  } catch (error) {
    console.error(error);
  }
};

syncModels();

export {
  ContractDB,
  MedicalHistoryDB,
  InventoryMovementDB,
  EventDB,
  ContactDB,
  ConceptDB,
  TypeDB,
  ClientDB,
  DepartmentDB,
  ChargeDB,
  EventTypeDB,
  EventDetailsDB,
  ActionDB,
  ProductDB,
  PatientDB,
  UserDB,
  RoleDB,
  ClassDB,
  AttendanceDB,
  SaleDB,
  StoreDB,
  PaymentTypeDB,
  BuyDetailsDB,
  AppointmentDB,
  PresentationDB,
  PayrollDB,
  WorkingDayDB,
  BillingDB,
  EmployeeDB,
  BuyDB,
  OrganizationalUnitsDB,
  AccountDB,
  AccountRecordDB,
  JournalDB,
  RequestDB,
  RequestTypeDB,
  PayrollDetailDB,
  SupplierDB,
  BillingDetailDB,
  InventoryDB,
  db,
};