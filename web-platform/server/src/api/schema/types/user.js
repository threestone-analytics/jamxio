const User = `
  type User  @cacheControl(maxAge: 240){
    name: String!
    lastname: String
    username: String
  }
`;

export default () => [User];