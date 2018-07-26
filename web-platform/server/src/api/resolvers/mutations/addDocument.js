import RecordModel from '../../../db/models/record.model';
import UserModel from '../../../db/models/user.model';
import PublisherModel from '../../../db/models/publisher.model';
import DocumentModel from '../../../db/models/document.model';
import { saveMap } from './handlers';

const handleError = function(err) {
  console.log('error', err);
};
export default function addDocument(root, { record }) {
  console.log(record);

  saveMap(record.document.geometry);

  const uModel = new UserModel();
  uModel.set({ username: 'alexter42' });
  uModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
  //Create publisher
  const pModel = new PublisherModel();
  pModel.set({ user: uModel });
  pModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
  //Create publisher

  //Create document
  const dModel = new DocumentModel();
  dModel.set({
    format: record.document.format,
    source: record.document.source,
    title: record.document.geometry.name,
    documentType: record.document.documentType,
    geometry: { data: 'data' },
    publishedDate: record.publishedDate,
    publisher: pModel,
  });
  dModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });

  //Update record solo tienes que hacer push
  const rModel = RecordModel.findByIdAndUpdate(
    record.id,
    { $push: { documents: dModel } },
    { new: true }
  ).catch(err => new Error(err));

  return rModel;
}
