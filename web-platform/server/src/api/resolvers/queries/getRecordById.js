import RecordModel from '../../../db/models/record.model';

export default function(root, {_id}, context) {
  return RecordModel.findById(_id);
}
