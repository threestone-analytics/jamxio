import RecordModel from '../../../db/models/record.model';
import UserModel from '../../../db/models/user.model';
import PublisherModel from '../../../db/models/publisher.model';

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

  const pModel = new PublisherModel();
  pModel.set({ user: uModel });
  pModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });

  //Create record
  const rModel = new RecordModel();
  rModel.set({
    publishedDate: record.publishedDate,
    publisher: pModel,
    document: record.document,
  });

  rModel.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
}
