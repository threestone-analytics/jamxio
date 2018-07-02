import Organization from './organization';

const User = `
  type User  @cacheControl(maxAge: 240){
    username: String!
    organization: Organization
  }
`;

export default () => [User, Organization];