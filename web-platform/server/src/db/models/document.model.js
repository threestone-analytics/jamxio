import mongoose from 'mongoose';

const { Schema } = mongoose;

const Document = new Schema({
  documentType: {
    category: String,
    subcategory: String,
  },
  datePublished: Date,
  format: String,
  source: String,
  title: String,
  geometry: JSON,
});

export default mongoose.model('Document', Document);
