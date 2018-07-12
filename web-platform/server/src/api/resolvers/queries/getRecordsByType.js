import DocumentTypeModel from '../../../db/models/documentType.model';

export default function(root, params, context) {
  return DocumentTypeModel.find();
}
