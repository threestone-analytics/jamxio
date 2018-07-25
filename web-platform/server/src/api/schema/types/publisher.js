import Record from './record';
import User from './user';

const Publisher = `
  type Publisher  @cacheControl(maxAge: 240){
    user: User,
    records: [Record],
  }
`;
export default () => [Publisher, User, Record];
