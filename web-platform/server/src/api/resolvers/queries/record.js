import Record from '../../../db/models/record.model';

export default function() {
  console.log('Record');
  return Record.findOne();
}