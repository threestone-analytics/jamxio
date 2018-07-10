import DataLoader from 'dataloader';
import { dataLoaderMongoose } from 'dataloader-mongoose';

import models from './models';

const { Record, Document, DocumentType, Publisher } = models;

export default () => ({
  getRecord: new DataLoader(ids => dataLoaderMongoose(Record, ids)),
  getDocument: new DataLoader(ids => dataLoaderMongoose(Document, ids)),
  getDocumentType: new DataLoader(ids => dataLoaderMongoose(DocumentType, ids)),
  getPublisher: new DataLoader(ids => dataLoaderMongoose(Publisher, ids)),
});
