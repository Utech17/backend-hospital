import { JournalInterface } from "../../interfaces";

const journalsSeeds: Partial<JournalInterface>[] = [
  {
    id: 1,
    request_id: 1,
    account_record_id: 1,
    status: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    request_id: 2,
    account_record_id: 2,
    status: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    request_id: 3,
    account_record_id: 3,
    status: true,
    createdAt: new Date(),
  },
  {
    id: 4,
    request_id: 4,
    account_record_id: 4,
    status: true,
    createdAt: new Date(),
  },
  {
    id: 5,
    request_id: 5,
    account_record_id: 5,
    status: true,
    createdAt: new Date(),
  },
  {
    id: 6,
    request_id: 6,
    account_record_id: 6,
    status: true,
    createdAt: new Date(),
  }
];

export { journalsSeeds };