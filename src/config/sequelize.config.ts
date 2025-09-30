import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

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
} from '../models';

dotenv.config();

const DB_HOST = process.env.DATABASE_HOST || process.env.DB_HOST || 'db';
const DB_PORT = process.env.DATABASE_PORT || process.env.DB_PORT || '5432';
const DB_USER = process.env.DATABASE_USER || process.env.POSTGRES_USER || 'mediplus';
const DB_PASS = process.env.DATABASE_PASSWORD || process.env.POSTGRES_PASSWORD || 'mediplus2024*';
const DB_NAME = process.env.DATABASE_NAME || process.env.POSTGRES_DB || 'MediPlusDB';

const DATABASE_URL = `postgres://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: { connectTimeout: 60000 },
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

const Options = { timestamps: false };

const AccountDB = sequelize.define('account', AccountModel, Options);
const AccountRecordDB = sequelize.define('account_record', AccountRecordModel, Options);
const ActionDB = sequelize.define('action', ActionModel);
const AppointmentDB = sequelize.define('appointment', AppointmentModel);
const AttendanceDB = sequelize.define('attendance', AttendanceEmployeeModel);
const BillingDB = sequelize.define('billing', BillingModel, Options);
const BillingDetailDB = sequelize.define('billing_detail', BillingDetailModel);
const BuyDB = sequelize.define('buy', BuyModel);
const BuyDetailsDB = sequelize.define('buy_detail', buyDetailsModel);
const ChargeDB = sequelize.define('charge', ChargeModel);
const ClassDB = sequelize.define('class', ClassModel);
const ClientDB = sequelize.define('client', ClientModel);
const ConceptDB = sequelize.define('concept', ConceptModel, Options);
const ContactDB = sequelize.define('contact', ContactModel);
const ContractDB = sequelize.define('contract', ContractModel);
const DepartmentDB = sequelize.define('departament', DepartmentModel);
const EmployeeDB = sequelize.define('employee', EmployeeModel);
const EventDB = sequelize.define('event', EventModel, Options);
const EventDetailsDB = sequelize.define('event_detail', EventDetailsModel, Options);
const EventTypeDB = sequelize.define('event_type', EventTypeModel, Options);
const InventoryDB = sequelize.define('inventory', InventoryModel, Options);
const InventoryMovementDB = sequelize.define('inventory_movement', InventoryMovementModel, Options);
const JournalDB = sequelize.define('journal', JournalModel);
const MedicalHistoryDB = sequelize.define('medical_history', MedicalHistoryModel, Options);
const OrganizationalUnitsDB = sequelize.define('organizational_unit', OrganizationalUnitsModel, Options);
const PatientDB = sequelize.define('Patient', PatientModel, Options);
const PaymentTypeDB = sequelize.define('payment_type', PaymentTypeModel, Options);
const PayrollDB = sequelize.define('payroll', PayrollModel, Options);
const PayrollDetailDB = sequelize.define('payroll_detail', PayrollDetailModel, Options);
const PresentationDB = sequelize.define('presentation', PresentationModel);
const ProductDB = sequelize.define('product', ProductModel, Options);
const RequestDB = sequelize.define('request', RequestModel, Options);
const RequestTypeDB = sequelize.define('request_type', RequestTypeModel, Options);
const RoleDB = sequelize.define('role', RoleModel, Options);
const SaleDB = sequelize.define('sale', SaleModel, Options);
const StoreDB = sequelize.define('store', StoreModel, Options);
const SupplierDB = sequelize.define('supplier', SupplierModel);
const TypeDB = sequelize.define('type', TypeModel);
const UserDB = sequelize.define('user', UserModel);
const WorkingDayDB = sequelize.define('working_day', WorkingDayModel, Options);

PatientDB.hasMany(MedicalHistoryDB, { foreignKey: 'patient_id' });
MedicalHistoryDB.belongsTo(PatientDB, { foreignKey: 'patient_id' });

StoreDB.hasMany(InventoryMovementDB, { foreignKey: 'store_id' });
InventoryMovementDB.belongsTo(StoreDB, { foreignKey: 'store_id' });

WorkingDayDB.hasMany(ContractDB, { foreignKey: 'working_day_id' });
ContractDB.belongsTo(WorkingDayDB, { foreignKey: 'working_day_id' });

ChargeDB.hasMany(ContractDB, { foreignKey: 'charge_id' });
ContractDB.belongsTo(ChargeDB, { foreignKey: 'charge_id' });

EmployeeDB.hasMany(ContractDB, { foreignKey: 'employee_id' });
ContractDB.belongsTo(EmployeeDB, { foreignKey: 'employee_id' });

MedicalHistoryDB.hasMany(EventDB, { foreignKey: 'history_id' });
EventDB.belongsTo(MedicalHistoryDB, { foreignKey: 'history_id' });

EventTypeDB.hasMany(EventDB, { foreignKey: 'type_events_id' });
EventDB.belongsTo(EventTypeDB, { foreignKey: 'type_events_id' });

EmployeeDB.hasMany(EventDB, { foreignKey: 'employee_id' });
EventDB.belongsTo(EmployeeDB, { foreignKey: 'employee_id' });

PatientDB.hasMany(ContactDB, { foreignKey: 'patient_id' });
ContactDB.belongsTo(PatientDB, { foreignKey: 'patient_id' });

EventDB.hasMany(EventDetailsDB, { foreignKey: 'events_id' });
EventDetailsDB.belongsTo(EventDB, { foreignKey: 'events_id' });

ActionDB.hasMany(EventDetailsDB, { foreignKey: 'actions_id' });
EventDetailsDB.belongsTo(ActionDB, { foreignKey: 'actions_id' });

TypeDB.hasMany(ProductDB, { foreignKey: 'cod_type' });
ProductDB.belongsTo(TypeDB, { foreignKey: 'cod_type' });

ClassDB.hasMany(ProductDB, { foreignKey: 'cod_class' });
ProductDB.belongsTo(ClassDB, { foreignKey: 'cod_class' });

PresentationDB.hasMany(ProductDB, { foreignKey: 'cod_pres' });
ProductDB.belongsTo(PresentationDB, { foreignKey: 'cod_pres' });

RoleDB.hasMany(UserDB, { foreignKey: 'role_id' });
UserDB.belongsTo(RoleDB, { foreignKey: 'role_id' });

EmployeeDB.hasMany(AttendanceDB, { foreignKey: 'employee_id' });
AttendanceDB.belongsTo(EmployeeDB, { foreignKey: 'employee_id' });

BillingDB.hasOne(SaleDB, { foreignKey: 'invoice_number' });
SaleDB.belongsTo(BillingDB, { foreignKey: 'invoice_number' });

PaymentTypeDB.hasMany(SaleDB, { foreignKey: 'payment_type_id' });
SaleDB.belongsTo(PaymentTypeDB, { foreignKey: 'payment_type_id' });

DepartmentDB.hasMany(StoreDB, { foreignKey: 'department_id' });
StoreDB.belongsTo(DepartmentDB, { foreignKey: 'department_id' });

BuyDB.hasMany(BuyDetailsDB, { foreignKey: 'buy_id' });
BuyDetailsDB.belongsTo(BuyDB, { foreignKey: 'buy_id' });

ProductDB.hasMany(BuyDetailsDB, { foreignKey: 'product_id' });
BuyDetailsDB.belongsTo(ProductDB, { foreignKey: 'product_id' });

PatientDB.hasMany(AppointmentDB, { foreignKey: 'patien_id' });
AppointmentDB.belongsTo(PatientDB, { foreignKey: 'patient_id' });

EmployeeDB.hasMany(AppointmentDB, { foreignKey: 'employee_id' });
AppointmentDB.belongsTo(EmployeeDB, { foreignKey: 'employee_id' });

EmployeeDB.hasMany(PayrollDB, { foreignKey: 'employee_id' });
PayrollDB.belongsTo(EmployeeDB, { foreignKey: 'employee_id' });

PatientDB.hasMany(BillingDB, { foreignKey: 'patient_id' });
BillingDB.belongsTo(PatientDB, { foreignKey: 'patient_id' });

ClientDB.hasMany(BillingDB, { foreignKey: 'client_id' });
BillingDB.belongsTo(ClientDB, { foreignKey: 'client_id' });

OrganizationalUnitsDB.hasMany(EmployeeDB, { foreignKey: 'organizational_unit_id' });
EmployeeDB.belongsTo(OrganizationalUnitsDB, { foreignKey: 'organizational_unit_id' });

UserDB.hasMany(EmployeeDB, { foreignKey: 'user_id' });
EmployeeDB.belongsTo(UserDB, { foreignKey: 'user_id' });

SupplierDB.hasMany(BuyDB, { foreignKey: 'supplier_id' });
BuyDB.belongsTo(SupplierDB, { foreignKey: 'supplier_id' });

DepartmentDB.hasMany(BuyDB, { foreignKey: 'department_id' });
BuyDB.belongsTo(DepartmentDB, { foreignKey: 'department_id' });

DepartmentDB.hasMany(OrganizationalUnitsDB, { foreignKey: 'department_id' });
OrganizationalUnitsDB.belongsTo(DepartmentDB, { foreignKey: 'department_id' });

RequestTypeDB.hasMany(RequestDB, { foreignKey: 'request_type_id' });
RequestDB.belongsTo(RequestTypeDB, { foreignKey: 'request_type_id' });

AccountDB.hasMany(AccountRecordDB, { foreignKey: 'account_id' });
AccountRecordDB.belongsTo(AccountDB, { foreignKey: 'account_id' });

RequestDB.hasMany(JournalDB, { foreignKey: 'request_id' });
JournalDB.belongsTo(RequestDB, { foreignKey: 'request_id' });

AccountRecordDB.hasMany(JournalDB, { foreignKey: 'account_record_id' });
JournalDB.belongsTo(AccountRecordDB, { foreignKey: 'account_record_id' });

ConceptDB.hasMany(PayrollDetailDB, { foreignKey: 'concept_id' });
PayrollDetailDB.belongsTo(ConceptDB, { foreignKey: 'concept_id' });

PayrollDB.hasMany(PayrollDetailDB, { foreignKey: 'payroll_id' });
PayrollDetailDB.belongsTo(PayrollDB, { foreignKey: 'payroll_id' });

BillingDB.hasMany(BillingDetailDB, { foreignKey: 'num_fact' });
BillingDetailDB.belongsTo(BillingDB, { foreignKey: 'num_fact' });

ProductDB.hasMany(BillingDetailDB, { foreignKey: 'product_id' });
BillingDetailDB.belongsTo(ProductDB, { foreignKey: 'product_id' });

ProductDB.hasMany(InventoryDB, { foreignKey: 'product_id' });
InventoryDB.belongsTo(ProductDB, { foreignKey: 'product_id' });

OrganizationalUnitsDB.hasMany(InventoryDB, { foreignKey: 'organizational_unit_id' });
InventoryDB.belongsTo(OrganizationalUnitsDB, { foreignKey: 'organizational_unit_id' });

const syncModels = async (retries = 10, delayMs = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ alter: true });
      return;
    } catch (error) {
      console.warn(`DB connection attempt ${i + 1} failed. Retrying in ${delayMs}ms...`);
      if (i === retries - 1) {
        console.error('Could not connect to the database after multiple attempts:', error);
        throw error;
      }
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
};

syncModels().catch((err) => {
  // Do not forcibly exit the process here; log the error and allow the app
  // to start so we can debug connectivity issues (network/port resolution).
  // In production you might want to fail-fast, but for local/dev debugging
  // it's useful to allow the HTTP server to start even if DB is temporarily
  // unavailable.
  console.error('DB sync failed after retries — continuing without DB connection.');
  console.error(err);
});

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
  sequelize as db,
};