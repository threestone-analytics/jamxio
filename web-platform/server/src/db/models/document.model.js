import mongoose from 'mongoose';

const { Schema } = mongoose;

const Document = new Schema(
  {
    publishedDate: Date,
    publisher: Schema.Types.ObjectId,
    document: Schema.Types.ObjectId,

  },
  { collection: 'document' }
);

export default mongoose.model('Document', Document);