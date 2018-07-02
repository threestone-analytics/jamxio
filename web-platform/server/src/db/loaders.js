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
    getRecord: new DataLoader(ids => dataLoaderMongoose(Record, ids)),
    getDocument: new DataLoader(ids => dataLoaderMongoose(Document, ids)),
    getPublisher: new DataLoader(ids => dataLoaderMongoose(Publisher, ids)),
    getContactPoint: new DataLoader(ids => dataLoaderMongoose(ContactPoint, ids)),
    getDocumentType: new DataLoader(ids => dataLoaderMongoose(Organization, ids)),
    getOrganization: new DataLoader(ids => dataLoaderMongoose(DocumentType, ids)),
});
