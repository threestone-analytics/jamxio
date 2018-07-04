import RecordModel from '../../../db/models/record.model';
import UserModel from '../../../db/models/user.model';
import PublisherModel from '../../../db/models/publisher.model';

const handleError = function(err) {
  console.log('error', err);
};

export default function addRecord(root, { file }) {
  const date = new Date();
  console.log(root, file, date);

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
    publishedDate: date,
    publisher: pModel,
    document: 'hi',
  });

  rModel.save(function(err) {
    console.log("done");
    if (err) return handleError(err);
    // saved!
  });
}
