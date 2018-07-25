import DocumentModel from '../../../db/models/document.model';
import DocumentTypeModel from '../../../db/models/documentType.model';
export default async function(root, { _id }, context) {
  const such = await DocumentTypeModel.find();

  let conmo = such.map(category => {
    const data = DocumentModel.findOne(
      { documentType: category._id },
      [],
      { $orderby: { publishedDate: -1 } },
      function(err, post) {
        return post;
      }
    ).exec();

    return data;
  });

  let dat = await Promise.all(conmo).then(a => a);
  dat = dat.filter(n => n);
  console.log(dat, 'data');

  return dat;
}
