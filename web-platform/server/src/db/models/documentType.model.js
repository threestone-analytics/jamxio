import mongoose from 'mongoose';

const { Schema } = mongoose;

const documentTypesSchema = new Schema(
  {
    category: String,
    subcategory: String,
  },
  { collection: 'documentTypes' }
);

export default mongoose.model('DocumentType', documentTypesSchema);
