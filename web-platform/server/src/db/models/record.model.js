import mongoose from 'mongoose';

const { Schema } = mongoose;

const Record = new Schema(
  {
    publishedDate: Date,
    publisher: Schema.Types.ObjectId,
    document: Schema.Types.ObjectId,

  },
  { collection: 'record' }
);

export default mongoose.model('Record', Record);