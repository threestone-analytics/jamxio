import mongoose from 'mongoose';

const { Schema } = mongoose;

const DocumentType = new Schema(
  {
    category: String,
    subcategory: String,
  },
  { collection: 'documentType' }
);

export default mongoose.model('DocumentType', DocumentType);