import DocumentTypeModel from '../../../db/models/documentType.model';

export default async function(root, { category }, context) {
  return DocumentTypeModel.find();
}
