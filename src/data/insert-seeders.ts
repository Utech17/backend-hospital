import "dotenv/config";
import {
  AccountDB,
  AccountRecordDB,
  ActionDB,
  AppointmentDB,
  AttendanceDB,
  BillingDB,
  BuyDB,
  ChargeDB,
  ClassDB,
  ClientDB,
  ConceptDB,
  ContactDB,
  ContractDB,
  DepartamentDB,
  EmployeeDB,
  EventDB,
  EventDetailsDB,
  EventTypeDB,
  InventoryMovementDB,
  InvoiceDetailDB,
  JournalDB,
  MedicalHistoryDB,
  OrganizationalUnitsDB,
  PatientDB,
  PaymentTypeDB,
  PayrollDB,
  PayrollDetailDB,
  PresentationDB,
  ProductDB,
  PurchaseDetailsDB,
  RequestDB,
  RequestTypeDB,
  RoleDB,
  SaleDB,
  StoreDB,
  SupplierDB,
  TypeDB,
  UserDB,
  WorkingDayDB,
  db,
} from "../config";

import {
  accountsSeeds,
  accountRecordsSeeds,
  actionsSeeds,
  appointmentsSeeds,
  attendanceSeeds,
  billingSeeds,
  buySeeds,
  chargesSeeds,
  classSeeds,
  clientsSeeds,
  conceptSeeds,
  contactsSeeds,
  contractSeeds,
  departamentSeeds,
  employeesSeeds,
  eventsSeeds,
  eventDetailsSeeds,
  eventTypesSeeds,
  inventoryMovementsSeeds,
  invoiceDetailsSeeds,
  journalsSeeds,
  medicalHistoriesSeeds,
  organizationalUnitsInterface,
  patientsSeeds,
  paymentTypeSeeds,
  payrollSeeds,
  payrollDetailsSeeds,
  PresentationSeeds,
  productSeeds,
  purchaseDetailsSeeds,
  requestsSeeds,
  requestTypesSeeds,
  rolesSeeds,
  saleSeeds,
  StoreSeeds,
  suppliersSeeds,
  typeSeeds,
  usersSeeds,
  workingDaysSeeds,
} from "../data/seeders";

const eject = async () => {
  await db
    .authenticate()
    .then(() => {
      console.log("Conexión exitosa a la base de datos");
    })
    .catch((error: any) => {
      console.log("No se pudo conectar a la base de datos");
    });

  await insertSeeders();
};

async function insertSeeders() {
  // Ordenamos los seeders por niveles de jerarquía
  const models = {
    level1: ["roles", "departaments", "types", "classes"],
    level2: ["users", "organizationalUnits", "stores", "clients"],
    level3: [
      "employees",
      "suppliers",
      "workingDays",
      "charges",
      "paymentTypes",
      "attendance",
    ],
    level4: [
      "patients",
      "categories",
      "products",
      "presentations",
      "concepts",
    ],
    level5: [
      "contracts",
      "appointments",
      "sales",
      "contacts",
      "inventoryMovements",
      "medicalHistories",
    ],
    level6: [
      "events",
      "eventTypes",
      "eventDetails",
      "actions",
      "payrolls",
      "payrollDetails",
      "requests",
      "requestTypes",
      "accountRecords",
      "accounts",
      "journals",
      "billings",
      "purchaseDetails",
      "buys",
      "invoiceDetail",
    ],
  };

  try {
    console.log("Insertando seeds de nivel 1...");
    await RoleDB.bulkCreate(rolesSeeds, { ignoreDuplicates: true, validate: true });
    await DepartamentDB.bulkCreate(departamentSeeds, { ignoreDuplicates: true, validate: true });
    await TypeDB.bulkCreate(typeSeeds, { ignoreDuplicates: true, validate: true });
    await ClassDB.bulkCreate(classSeeds, { ignoreDuplicates: true, validate: true });

    console.log("Insertando seeds de nivel 2...");
    await UserDB.bulkCreate(usersSeeds, { ignoreDuplicates: true, validate: true });
    await OrganizationalUnitsDB.bulkCreate(organizationalUnitsInterface, {
      ignoreDuplicates: true,
      validate: true,
    });
    await StoreDB.bulkCreate(StoreSeeds, { ignoreDuplicates: true, validate: true });
    await ClientDB.bulkCreate(clientsSeeds, { ignoreDuplicates: true, validate: true });

    console.log("Insertando seeds de nivel 3...");
    await EmployeeDB.bulkCreate(employeesSeeds, { ignoreDuplicates: true, validate: true });
    await SupplierDB.bulkCreate(suppliersSeeds, { ignoreDuplicates: true, validate: true });
    await WorkingDayDB.bulkCreate(workingDaysSeeds, { ignoreDuplicates: true, validate: true });
    await ChargeDB.bulkCreate(chargesSeeds, { ignoreDuplicates: true, validate: true });
    await PaymentTypeDB.bulkCreate(paymentTypeSeeds, { ignoreDuplicates: true, validate: true });
    await AttendanceDB.bulkCreate(attendanceSeeds, { ignoreDuplicates: true, validate: true });

    console.log("Insertando seeds de nivel 4...");
    await PatientDB.bulkCreate(patientsSeeds, { ignoreDuplicates: true, validate: true });
    await ProductDB.bulkCreate(productSeeds, { ignoreDuplicates: true, validate: true });
    await PresentationDB.bulkCreate(PresentationSeeds, { ignoreDuplicates: true, validate: true });
    await ConceptDB.bulkCreate(conceptSeeds, { ignoreDuplicates: true, validate: true });

    console.log("Insertando seeds de nivel 5...");
    await ContractDB.bulkCreate(contractSeeds, { ignoreDuplicates: true, validate: true });
    await AppointmentDB.bulkCreate(appointmentsSeeds, { ignoreDuplicates: true, validate: true });
    await SaleDB.bulkCreate(saleSeeds, { ignoreDuplicates: true, validate: true });
    await ContactDB.bulkCreate(contactsSeeds, { ignoreDuplicates: true, validate: true });
    await InventoryMovementDB.bulkCreate(inventoryMovementsSeeds, {
      ignoreDuplicates: true,
      validate: true,
    });
    await MedicalHistoryDB.bulkCreate(medicalHistoriesSeeds, { ignoreDuplicates: true, validate: true });

    console.log("Insertando seeds de nivel 6...");
    await EventDB.bulkCreate(eventsSeeds, { ignoreDuplicates: true, validate: true });
    await EventDetailsDB.bulkCreate(eventDetailsSeeds, { ignoreDuplicates: true, validate: true });
    await EventTypeDB.bulkCreate(eventTypesSeeds, { ignoreDuplicates: true, validate: true });
    await ActionDB.bulkCreate(actionsSeeds, { ignoreDuplicates: true, validate: true });
    await PayrollDB.bulkCreate(payrollSeeds, { ignoreDuplicates: true, validate: true });
    await PayrollDetailDB.bulkCreate(payrollDetailsSeeds, { ignoreDuplicates: true, validate: true });
    await RequestDB.bulkCreate(requestsSeeds, { ignoreDuplicates: true, validate: true });
    await RequestTypeDB.bulkCreate(requestTypesSeeds, { ignoreDuplicates: true, validate: true });
    await AccountRecordDB.bulkCreate(accountRecordsSeeds, { ignoreDuplicates: true, validate: true });
    await AccountDB.bulkCreate(accountsSeeds, { ignoreDuplicates: true, validate: true });
    await JournalDB.bulkCreate(journalsSeeds, { ignoreDuplicates: true, validate: true });
    await BillingDB.bulkCreate(billingSeeds, { ignoreDuplicates: true, validate: true });
    await PurchaseDetailsDB.bulkCreate(purchaseDetailsSeeds, {
      ignoreDuplicates: true,
      validate: true,
    });
    await BuyDB.bulkCreate(buySeeds, { ignoreDuplicates: true, validate: true });
    await InvoiceDetailDB.bulkCreate(invoiceDetailsSeeds, { ignoreDuplicates: true, validate: true });

    console.log("Se insertaron todos los seeds correctamente.");
  } catch (error) {
    console.error("Error al insertar seeds:", error);
  }
}

eject();