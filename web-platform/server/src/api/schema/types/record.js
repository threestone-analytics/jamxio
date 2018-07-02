import Publisher from './publisher';
import Document from './document';

const Record = `
  type Record  @cacheControl(maxAge: 240){
    publishedDate: String,
    publisher: Publisher,
    document: Document,
  }
`;

export default () => [Record, Publisher, Document];