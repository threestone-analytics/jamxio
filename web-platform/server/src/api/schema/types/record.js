import Document from './document';
const Record = `
  type Record  @cacheControl(maxAge: 240){
    datePublished: Date
    document: Document
    publisher: Publisher
  }
`;

export default () => [Record, Document];

