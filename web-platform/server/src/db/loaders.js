import DataLoader from 'dataloader';
import { dataLoaderMongoose } from 'dataloader-mongoose';

import models from './models';

const {
    Geojsons,
  } = models;
 
export default () => ({
    getGeojsons: new DataLoader(ids => dataLoaderMongoose(Geojsons, ids)),
});