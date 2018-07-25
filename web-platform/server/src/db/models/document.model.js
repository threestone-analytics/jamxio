import mongoose from 'mongoose';

const { Schema } = mongoose;

const documentsSchema = new Schema(
  {
    format: String,
    source: String,
    _id: String,
    geometry: JSON,
    url: String,
    publishedDate: Date,
    publisher: Schema.Types.ObjectId,
    documentType: Schema.Types.ObjectId,
  },
  { collection: 'documents' }
);

export default mongoose.model('Document', documentsSchema);
