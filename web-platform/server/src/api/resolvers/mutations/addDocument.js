import RecordModel from '../../../db/models/record.model';
import UserModel from '../../../db/models/user.model';
import PublisherModel from '../../../db/models/publisher.model';
import DocumentModel from '../../../db/models/document.model';
import DocumentTypeModel from '../../../db/models/documentType.model';
import RecordType from '../types/record';

const handleError = function(err) {
  console.log('error', err);
};
export default function addDocument(root, { record }) {
  console.log(record);
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
    category: 'record.document.category',
    subcategory: 'record.document.subcategory',
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
  });
  dModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });

  //Create record solo tienes que hacer push
  const rModel = RecordModel.findByIdAndUpdate(
    record.id,
    { $push: { documents: dModel } },
    { new: true }
  ).catch(err => new Error(err));

  return rModel;
}
