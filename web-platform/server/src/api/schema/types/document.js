import DocumentType from './documentType';

const Document = `
  type Document  @cacheControl(maxAge: 240){
    format: String
    source: String
    geometry: JSON
    publisher: String
    publishedDate: Date
    documentType: DocumentType
  }
`;

export default () => [Document, DocumentType];
