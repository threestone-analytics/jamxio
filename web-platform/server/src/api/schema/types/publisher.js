import User from './user';

const Publisher = `
  type Publisher  @cacheControl(maxAge: 240){
    user: User
    records: [String]
  }
`;

export default () => [Publisher, User];