import mongoose from 'mongoose';

const { Schema } = mongoose;

const documentsSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    recordId: Schema.Types.ObjectId,
    format: String,
    source: String,
    geometry: JSON,
    url: String,
    publishedDate: Date,
    publisher: Schema.Types.ObjectId,
    documentType: Schema.Types.ObjectId,
  },
  { collection: 'documents' }
);

export default mongoose.model('Document', documentsSchema);
