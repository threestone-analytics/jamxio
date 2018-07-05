import Record from '../../../db/models/record.model';

export default function() {
  return Record.findOne();
}