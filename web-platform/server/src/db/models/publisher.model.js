import mongoose from 'mongoose';

const { Schema } = mongoose;

const Publisher = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    records: [{ type: Schema.Types.ObjectId, ref: 'Record' }],
  },
  { collection: 'publisher' }
);

export default mongoose.model('Publisher', Publisher);