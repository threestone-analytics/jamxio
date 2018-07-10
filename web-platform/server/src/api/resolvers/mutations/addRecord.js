import RecordModel from '../../../db/models/record.model';
import UserModel from '../../../db/models/user.model';
import PublisherModel from '../../../db/models/publisher.model';
import DocumentModel from '../../../db/models/document.model';
import DocumentTypeModel from '../../../db/models/documentType.model';

const handleError = function(err) {
  console.log('error', err);
};
export default function addRecord(root, { record }) {
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
  const dTModel = new DocumentTypeModel();
  dTModel.set({
    category: record.document.format,
    subcategory: record.document.format,
  });
  dTModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
  //Create document
  const dModel = new DocumentModel();
  dModel.set({
    format: record.document.format,
    source: record.document.format,
    title: record.document.format,
    geometry: record.document.geometry,
    documentType: dTModel,
  });
  dModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
  //Create record
  const rModel = new RecordModel();
  rModel.set({
    publishedDate: record.publishedDate,
    publisher: pModel,
    document: dModel,
  });
  rModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
  return rModel;
}
