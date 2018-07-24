const DocumentType = `
  type DocumentType  @cacheControl(maxAge: 240){
    _id: ID
    category: String,
    subcategory: String,
  }
`;
export default () => [DocumentType];
