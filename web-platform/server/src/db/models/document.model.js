import mongoose from 'mongoose';

const { Schema } = mongoose;

const documentsSchema = new Schema(
  {
    format: String,
    title: String,
    source: JSON,
    geometry: JSON,
    documentType: {
      category: String,
      subcategory: String,
    },
  },
  { collection: 'documents' }
);

export default mongoose.model('Document', documentsSchema);
