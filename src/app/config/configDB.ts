import { DBConfig } from "ngx-indexed-db";

export const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'column',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
      ],
    },
    {
      store: 'task',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'column', keypath: 'column', options: { unique: false } },
        { name: 'startDate', keypath: 'startDate', options: { unique: false } },
        { name: 'conclusionDate', keypath: 'conclusionDate', options: { unique: false } },
        { name: 'order', keypath: 'order', options: { unique: true } },
      ],
    },
  ],
};