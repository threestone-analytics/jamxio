import RecordModel from '../../../db/models/record.model';

export default function(root, params, context) {
  return RecordModel.find().exec().then((successMessage) => {
    // successMessage is whatever we passed in the resolve(...) function above.
    // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
    console.log("Yay! " + successMessage);
    return successMessage;
  });
}
