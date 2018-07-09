const Record = `
  type Record  @cacheControl(maxAge: 240){
    publishedDate: Date
    document: JSON
    publisher: JSON
  }
`;

export default () => [Record];

