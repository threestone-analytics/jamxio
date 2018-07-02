const ContactPoint = `
  type ContactPoint  @cacheControl(maxAge: 240){
    name: String,
    email: String,
    telephone: String,
  }
`;

export default () => [ContactPoint];