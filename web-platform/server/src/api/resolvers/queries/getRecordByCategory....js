import RecordModel from '../../../db/models/record.model';

export default async function(root, { category }, context) {
  const show = await RecordModel.aggregate([
    {
      $lookup: {
        from: 'documentTypes',
        localField: 'documentType',
        foreignField: '_id',
        as: 'dt',
      },
    },
    { $match: { 'dt.category': category } },
    {
      $lookup: {
        from: 'documents',
        localField: 'documents',
        foreignField: '_id',
        as: 'document',
      },
    },
    { $unwind: '$document' },
    { $sort: { 'document.publishedDate': -1 } },
    { $limit: 1 },
    { $project: { documents: 0, thumbnail: 0, dt: 0 } },
  ]).exec();
  console.log(show, 'showing');
  return show;
}
