import mongoose from 'mongoose';

const { Schema } = mongoose;

const Publisher = new Schema(
  {
    user: Schema.Types.ObjectId,
    records:  [Schema.Types.ObjectId],


  },
  { collection: 'publisher' }
);

export default mongoose.model('Publisher', Publisher);