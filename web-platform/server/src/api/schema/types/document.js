import DocumentType from './documentType';

const Document = `
  type Document  @cacheControl(maxAge: 240){
    documentType: DocumentType
    format: String
    source: String
    title: String
    geometry: JSON
  }
`;

export default () => [Document, DocumentType];

