import mongoose from 'mongoose';

const { Schema } = mongoose;

const recordsSchema = new Schema(
  {
    publishedDate: Date,
    publisher: Schema.Types.ObjectId,
    document: Schema.Types.ObjectId,
  },
  { collection: 'records' }
);

export default mongoose.model('Record', recordsSchema);
