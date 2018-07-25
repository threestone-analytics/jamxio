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
    category: record.document.documentType.category,
    subcategory: record.document.documentType.subcategory,
  });
  dTModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
  //Create document
  const dModel = new DocumentModel();
  dModel.set({
    format: record.document.format,
    source: record.document.source,
    title: record.document.geometry.name,
    documentType: dTModel,
    geometry: { data: 'data' },
    publishedDate: record.publishedDate,
    publisher: pModel,
    thumbnail: "",
  });
  dModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
  //Create record solo tienes que hacer push
  const rModel = new RecordModel();
  rModel.set({
    document: dModel,
  });
  rModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
  return rModel;
}
