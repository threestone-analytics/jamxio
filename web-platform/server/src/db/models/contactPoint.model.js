import mongoose from 'mongoose';

const { Schema } = mongoose;

const ContactPoint = new Schema(
  {
    name: String,
    contactPoint: Schema.Types.ObjectId,

  },
  { collection: 'contactPoint' }
);

export default mongoose.model('ContactPoint', ContactPoint);