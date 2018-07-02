import ContactPoint from './contactPoint';

const Organization = `
  type Organization  @cacheControl(maxAge: 240){
    name: String
    contactPoint: ContactPoint
  }
`;

export default () => [Organization, ContactPoint];