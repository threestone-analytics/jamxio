export default {
  async user(parentId, contex, { loaders }) {
    return (await loaders.getPublisher.load(parentId)).users;
  },
  async records(parentId, contex, { loaders }) {
    return (await loaders.getPublisher.load(parentId)).records;
  },
};