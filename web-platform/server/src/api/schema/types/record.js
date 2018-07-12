import Document from './document';
import Publisher from './publisher';

const Record = `
  type Record  @cacheControl(maxAge: 240){
    _id: ID
    title : String
    category : String
    subcategory : String
    documents: [Document]
  }
`;

export default () => [Record, Document, Publisher];
