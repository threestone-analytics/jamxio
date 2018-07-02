import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema(
  {
    name: String,
    lastname: String,
    username: String,
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
  },
  { collection: 'user' }
);

export default mongoose.model('User', User);