import mongoose from 'mongoose';

const { Schema } = mongoose;

const recordsSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: String,
    category: String,
    subcategory: String,
    documents: [Schema.Types.ObjectId],
  },
  { collection: 'records' }
);

export default mongoose.model('Record', recordsSchema);
