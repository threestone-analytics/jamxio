const DocumentType = `
  type DocumentType  @cacheControl(maxAge: 240){
    category: String,
    subcategory: String,
    records: [Record]
  }
`;
export default () => [DocumentType];
