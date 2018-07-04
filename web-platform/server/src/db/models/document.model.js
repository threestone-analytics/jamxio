import mongoose from 'mongoose';

const { Schema } = mongoose;

const Document = new Schema({
  documentType: Schema.Types.ObjectId,
  datePublished: String,
  format: String,
  title: String,
  publisher: String,
  geometry: JSON,
});

export default mongoose.model('Document', Document);
