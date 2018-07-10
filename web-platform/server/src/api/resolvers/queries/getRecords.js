import RecordModel from '../../../db/models/record.model';

export default function(category) {
  const rec = RecordModel.find().exec();
  console.log(rec,"rec")
  return rec;
}
