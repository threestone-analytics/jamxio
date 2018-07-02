import mongoose from 'mongoose';

const { Schema } = mongoose;

const Organization = new Schema(
  {
    name: String,
    contactPoint: { type: Schema.Types.ObjectId, ref: 'ContactPoint' },
  },
  { collection: 'organization' }
);

export default mongoose.model('Organization', Organization);