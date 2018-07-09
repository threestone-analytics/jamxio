import RecordModel from '../../../db/models/record.model';
import UserModel from '../../../db/models/user.model';
const handleError = function(err) {
  console.log('error', err);
};
export default function addRecord(root, { record }) {
  const uModel = new UserModel();
  uModel.set({ user: { username: 'alexter42' } });
  uModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
  //Create record
  const rModel = new RecordModel();
  rModel.set({
    publishedDate: record.publishedDate,
    publisher: { username: 'alexter42' },
    document: {
      format: record.document.format,
      source: record.document.format,
      title: record.document.subcategory,
      geometry: record.document.geometry,
      documentType: {
        category: record.document.category,
        subcategory: record.document.subcategory,
      },
    },
  });
  rModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
  return rModel;
}
