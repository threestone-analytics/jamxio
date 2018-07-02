import mongoose from 'mongoose';

const { Schema } = mongoose;

const ContactPoint = new Schema(
  {
    name: String,
    email: String,
    telephone: String,
  },
  { collection: 'contactPoint' }
);

export default mongoose.model('ContactPoint', ContactPoint);