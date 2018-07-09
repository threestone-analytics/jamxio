import DataLoader from 'dataloader';
import { dataLoaderMongoose } from 'dataloader-mongoose';

import models from './models';

const { Record } = models;

export default () => ({
  getRecord: new DataLoader(ids => dataLoaderMongoose(Record, ids)),
});
