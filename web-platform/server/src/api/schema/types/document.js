import DocumentType from './documentType';

const Document = `
  type Document  @cacheControl(maxAge: 240){
    _id: ID
    format: String
    source: String
    geometry: JSON
    publisher: String
    publishedDate: Date
    documentType: DocumentType
  }
`;

export default () => [Document, DocumentType];
