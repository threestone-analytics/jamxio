import DocumentType from './documentType';

const Document = `
  type Document  @cacheControl(maxAge: 240){
    documentType: DocumentType
    datePublished:  Date
    format: String
    title: String
    content: JSON
  }
`;

export default () => [Document, DocumentType];