import mongoose from 'mongoose';

const { Schema } = mongoose;

const Record = new Schema(
  {
    publishedDate: Date,
    publisher: { type: Schema.Types.ObjectId, ref: 'Publisher' },
    document: {
      format: String,
      title: String,
      file: JSON,
      geometry: JSON,
      documentType: {
        category: String,
        subcategory: String,
      },
    },
  },
  { collection: 'record' }
);

export default mongoose.model('Record', Record);
