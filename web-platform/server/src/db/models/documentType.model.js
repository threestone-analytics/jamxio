import mongoose from 'mongoose';

const { Schema } = mongoose;

const DocumentType = new Schema(
  {
    documentType: String,
    datePublished:  Date,
    format: String,
    title: String,
    content: JSON

  },
  { collection: 'documentType' }
);

export default mongoose.model('DocumentType', DocumentType);