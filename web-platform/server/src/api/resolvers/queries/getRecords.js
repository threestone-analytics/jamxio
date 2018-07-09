import Record from '../../../db/models/record.model';

export default function(category) {
  console.log('getRecords');
  const rec = Record.find();
  return rec;
}
