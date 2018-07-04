import mongoose from 'mongoose';

const { Schema } = mongoose;

const Record = new Schema(
  {
    publishedDate: Date,
    publisher: { type: Schema.Types.ObjectId, ref: 'Publisher' },
    document: {
      documentType: {
        category: String,
        subcategory: String,
      },
      format: String,
      title: String,
      file: JSON,
      geometry: JSON,
    },
  },
  { collection: 'record' }
);

export default mongoose.model('Record', Record);
