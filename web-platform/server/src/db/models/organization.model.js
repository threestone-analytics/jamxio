import mongoose from 'mongoose';

const { Schema } = mongoose;

const Organization = new Schema(
  {
    name: String,
    contactPoint: Schema.Types.ObjectId,

  },
  { collection: 'organization' }
);

export default mongoose.model('Organization', Organization);