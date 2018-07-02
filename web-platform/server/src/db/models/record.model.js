import mongoose from 'mongoose';

const { Schema } = mongoose;

const Record = new Schema(
  {
    publishedDate: String,
    publisher: { type: Schema.Types.ObjectId, ref: 'Publisher' },
    document: { type: Schema.Types.ObjectId, ref: 'Document' },

  },
  { collection: 'record' }
);

export default mongoose.model('Record', Record);