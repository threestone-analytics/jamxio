import RecordModel from '../../../db/models/record.model';

export default function(root, params, context) {
  return RecordModel.find();
}
