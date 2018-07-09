import mongoose from 'mongoose';

const { Schema } = mongoose;

const Record = new Schema(
  {
    publishedDate: Date,
    publisher: { username: String },
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
  { collection: 'records' }
);

export default mongoose.model('Record', Record);
