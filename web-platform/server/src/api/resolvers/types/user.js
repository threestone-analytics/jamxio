export default {
  async username(parentId, contex, { loaders }) {
    return (await loaders.getUser.load(parentId)).username;
  },
  async organization(parentId, contex, { loaders }) {
    return (await loaders.getUser.load(parentId)).organization;
  },
};
