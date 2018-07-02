import mongoose from 'mongoose';

const { Schema } = mongoose;

const Document = new Schema(
  {
    documentType: { type: Schema.Types.ObjectId, ref: 'DocumentType' },
    datePublished: String,
    format: String,
    title: String,
    publisher: { type: Schema.Types.ObjectId, ref: 'Publisher' },
    content: JSON,

  },
  { collection: 'document' }
);

export default mongoose.model('Document', Document);