import mongoose from 'mongoose';

const { Schema } = mongoose;

const geojsonSchema = new Schema(
  {
    value: String,
  },
  { collection: 'geojson' }
);

export default mongoose.model('Geojson', geojsonSchema);