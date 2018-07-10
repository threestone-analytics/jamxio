import DocumentType from './documentType';

const Document = `
  type Document  @cacheControl(maxAge: 240){
    format: String
    title: String
    source: String
    geometry: String
    documentType: String
  }
`;

export default () => [Document, DocumentType];
