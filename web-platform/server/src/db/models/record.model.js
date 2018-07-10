import mongoose from 'mongoose';

const { Schema } = mongoose;

const recordsSchema = new Schema(
  {
    publishedDate: Date,
    publisher: Schema.Types.String,
    document: Schema.Types.String,
  },
  { collection: 'records' }
);

export default mongoose.model('Record', recordsSchema);
