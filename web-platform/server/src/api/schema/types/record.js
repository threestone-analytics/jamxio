import Document from './document';
import Publisher from './publisher';
import DocumentType from './documentType';

const Record = `
  type Record  @cacheControl(maxAge: 240){
    _id: ID
    title : String
    documentType : DocumentType
    documents: [Document]
  }
`;

export default () => [Record, Document, Publisher, DocumentType];
