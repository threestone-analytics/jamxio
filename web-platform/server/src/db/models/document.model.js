import mongoose from 'mongoose';

const { Schema } = mongoose;

const documentsSchema = new Schema(
  {
    format: String,
    title: String,
    source: JSON,
    geometry: JSON,
    documentType: Schema.Types.ObjectId,
  },
  { collection: 'documents' }
);

export default mongoose.model('Document', documentsSchema);
