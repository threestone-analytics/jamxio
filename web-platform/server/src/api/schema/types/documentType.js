const DocumentType = `
  type DocumentType  @cacheControl(maxAge: 240){
    _id: ID
    category: String,
    subcategory: String,
    records: [Record]
  }
`;
export default () => [DocumentType];
