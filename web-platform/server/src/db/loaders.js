import DataLoader from 'dataloader';
import { dataLoaderMongoose } from 'dataloader-mongoose';

import models from './models';

const {
    Record,
    Publisher,
    Document,
    DocumentType,
    Organization,

    ContactPoint,
  } = models;
 
export default () => ({
    Record: new DataLoader(ids => dataLoaderMongoose(Record, ids)),
    Document: new DataLoader(ids => dataLoaderMongoose(Document, ids)),
    Publisher: new DataLoader(ids => dataLoaderMongoose(Publisher, ids)),
    ContactPoint: new DataLoader(ids => dataLoaderMongoose(ContactPoint, ids)),
    DocumentType: new DataLoader(ids => dataLoaderMongoose(Organization, ids)),
    Organization: new DataLoader(ids => dataLoaderMongoose(DocumentType, ids)),
});