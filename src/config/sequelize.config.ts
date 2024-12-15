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
  DepartamentModel,
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
  PurchaseDetailsModel,
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
const ActionDB = db.define("actions", ActionModel);
const AppointmentDB = db.define("appointment", AppointmentModel);
const AttendanceDB = db.define("attendance_employee", AttendanceEmployeeModel);
const BillingDB = db.define("billing", BillingModel);
const BuyDB = db.define("buy", BuyModel);
const ChargeDB = db.define("charge", ChargeModel);
const ClassDB = db.define("clase", ClassModel);
const ClientDB = db.define("clients", ClientModel);
const ConceptDB = db.define("concept", ConceptModel);
const ContactDB = db.define("contact", ContactModel);
const ContractDB = db.define("contract", ContractModel);
const DepartamentDB = db.define("departament", DepartamentModel);
const EmployeeDB = db.define("employee", EmployeeModel);
const EventDB = db.define("event", EventModel);
const EventDetailsDB = db.define("event_details", EventDetailsModel);
const EventTypeDB = db.define("event_type", EventTypeModel);
const InventoryMovementDB = db.define("inventory_movement", InventoryMovementModel);
const JournalDB = db.define("journal", JournalModel);
const MedicalHistoryDB = db.define("medical_history", MedicalHistoryModel);
const OrganizationalUnitsDB = db.define("organizational_units", OrganizationalUnitsModel);
const PatientDB = db.define("Patient", PatientModel);
const PaymentTypeDB = db.define("payment_types", PaymentTypeModel);
const PayrollDB = db.define("payroll", PayrollModel);
const PresentationDB = db.define("presentation", PresentationModel);
const RequestDB = db.define("request", RequestModel);
const RequestTypeDB = db.define("request_type", RequestTypeModel);
const ProductDB = db.define("product", ProductModel);
const PurchaseDetailsDB = db.define("purchase_details", PurchaseDetailsModel);
const RoleDB = db.define("role", RoleModel);
const SaleDB = db.define("sales", SaleModel);
const StoreDB = db.define("store", StoreModel);
const TypeDB = db.define("type", TypeModel);
const UserDB = db.define("user", UserModel);
const WorkingDayDB = db.define("working_day", WorkingDayModel);

// En las relaciones importa el orden de la jerarquia
// MedicalHistoryDB
PatientDB.hasMany(MedicalHistoryDB, { foreignKey: "id_patient" });
MedicalHistoryDB.belongsTo(PatientDB, { foreignKey: "id_patient" });

//InventoryMovementDB
StoreDB.hasMany(InventoryMovementDB, { foreignKey: "id_Store" });
InventoryMovementDB.belongsTo(StoreDB, { foreignKey: "id_Store" });

// ContractDB
WorkingDayDB.hasMany(ContractDB, {foreignKey: "id_working"});
ContractDB.belongsTo(WorkingDayDB, {foreignKey: "id_working"});

ChargeDB.hasMany(ContractDB, {foreignKey: "id_charge"});
ContractDB.belongsTo(ChargeDB, {foreignKey: "id_charge"});

EmployeeDB.hasMany(ContractDB, {foreignKey: "id_employee"});
ContractDB.belongsTo(EmployeeDB, {foreignKey: "id_employee"});

// EventDB
MedicalHistoryDB.hasMany(EventDB, { foreignKey: "id_history" });
EventDB.belongsTo(MedicalHistoryDB, { foreignKey: "id_history" });

EventTypeDB.hasMany(EventDB, { foreignKey: "id_type_events" });
EventDB.belongsTo(EventTypeDB, { foreignKey: "id_type_events" });

EmployeeDB.hasMany(EventDB, { foreignKey: "id_employee" });
EventDB.belongsTo(EmployeeDB, { foreignKey: "id_employee" });

// ContactDB
PatientDB.hasMany(ContactDB, { foreignKey: "id_patient" });
ContactDB.belongsTo(PatientDB, { foreignKey: "id_patient" });

//EventDetailsDB
EventDB.hasMany(EventDetailsDB, { foreignKey: "id_events" })
EventDetailsDB.belongsTo(EventDB, { foreignKey: "id_events" })

ActionDB.hasMany(EventDetailsDB, { foreignKey: "id_actions" })
EventDetailsDB.belongsTo(ActionDB, { foreignKey: "id_actions" })

//ProductDB
TypeDB.hasMany(ProductDB, { foreignKey: "id_type" });
ProductDB.belongsTo(TypeDB, { foreignKey: "id_type" });

ClassDB.hasMany(ProductDB, { foreignKey: "id_class" });
ProductDB.belongsTo(ClassDB, { foreignKey: "id_class" }); 

PresentationDB.hasMany(ProductDB, { foreignKey: "id_pres" }); 
ProductDB.belongsTo(PresentationDB, { foreignKey: "id_pres" });

//UserDB
RoleDB.hasMany(UserDB, { foreignKey: "id_role" });
UserDB.belongsTo(RoleDB, { foreignKey: "id_role" });

//AttendanceDB
EmployeeDB.hasMany(AttendanceDB, { foreignKey: "id_employee" });
AttendanceDB.belongsTo(EmployeeDB, { foreignKey: "id_employee" });

//SaleDB
PaymentTypeDB.hasMany(SaleDB, { foreignKey: "payment_type_code" });
SaleDB.belongsTo(PaymentTypeDB, { foreignKey: "payment_type_code" });

//StoreDB
DepartamentDB.hasMany(StoreDB, { foreignKey: "id_departament" }); 
StoreDB.belongsTo(DepartamentDB, { foreignKey: "id_departament" });

//PurchaseDetailsDB
ProductDB.hasMany(PurchaseDetailsDB, { foreignKey: "id_product" });
PurchaseDetailsDB.belongsTo(ProductDB, { foreignKey: "id_product" });

BuyDB.hasMany(PurchaseDetailsDB, { foreignKey: "id_buy" });
PurchaseDetailsDB.belongsTo(BuyDB, { foreignKey: "id_buy" });

//AppointmentDB
PatientDB.hasMany(AppointmentDB, { foreignKey: "id_patien" });
AppointmentDB.belongsTo(PatientDB, { foreignKey: "id_patient" });

EmployeeDB.hasMany(AppointmentDB, { foreignKey: "id_employee" });
AppointmentDB.belongsTo(EmployeeDB, { foreignKey: "id_employee" });

//PayrollDB
EmployeeDB.hasMany(PayrollDB, { foreignKey: "id_employee" });
PayrollDB.belongsTo(EmployeeDB, { foreignKey: "id_employee"});

//BillingDB
PatientDB.hasMany(BillingDB, { foreignKey: "id_patient" });
BillingDB.belongsTo(PatientDB, { foreignKey: "id_patient" });

ClientDB.hasMany(BillingDB, { foreignKey: "id_client" });
BillingDB.belongsTo(ClientDB, { foreignKey: "id_client" });

//EmployeeDB
OrganizationalUnitsDB.hasMany(EmployeeDB, { foreignKey: 'id_organizational_units' });
EmployeeDB.belongsTo(OrganizationalUnitsDB, { foreignKey: 'id_organizational_units' });

UserDB.hasMany(EmployeeDB, { foreignKey: 'id_user' });
EmployeeDB.belongsTo(UserDB, { foreignKey: 'id_user' });

//BuyDB
//SupplierDB.hasMany(BuyDB, {foreignKey: "id_supplier"});
//BuyDB.belongsTo(SupplierDB, {foreignKey: "id_supplier"});

//OrganizationalUnitsDB
DepartamentDB.hasMany(OrganizationalUnitsDB, {foreignKey: 'id_departament'});
OrganizationalUnitsDB.belongsTo(DepartamentDB, {foreignKey: 'id_departament'});

// RequestDB
RequestTypeDB.hasMany(RequestDB, { foreignKey: "id_request_type" });
RequestDB.belongsTo(RequestTypeDB, { foreignKey: "id_request_type" });

// AccountRecordDB
AccountDB.hasMany(AccountRecordDB, { foreignKey: "id_account" });
AccountRecordDB.belongsTo(AccountDB, { foreignKey: "id_account" });

// JournalDB
RequestDB.hasMany(JournalDB, { foreignKey: "id_request" });
JournalDB.belongsTo(RequestDB, { foreignKey: "id_request" });

AccountRecordDB.hasMany(JournalDB, { foreignKey: "id_account_record" });
JournalDB.belongsTo(AccountRecordDB, { foreignKey: "id_account_record" });

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
  DepartamentDB,
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
  PurchaseDetailsDB,
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
  db,
};