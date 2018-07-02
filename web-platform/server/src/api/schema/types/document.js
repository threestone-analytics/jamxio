import DocumentType from './documentType';
import Publisher from './publisher';

const Document = `
  type Document  @cacheControl(maxAge: 240){
    documentType: DocumentType
    datePublished:  String
    publisher: Publisher
    format: String
    title: String
    content: JSON
  }
`;

export default () => [Document, DocumentType, Publisher];

