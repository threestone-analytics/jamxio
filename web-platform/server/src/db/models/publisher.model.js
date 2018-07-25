import mongoose from 'mongoose';

const { Schema } = mongoose;

const publishersSchema = new Schema(
  {
    user: Schema.Types.ObjectId,
    records: [Schema.Types.ObjectId],
  },
  { collection: 'publishers' }
);

export default mongoose.model('Publisher', publishersSchema);
