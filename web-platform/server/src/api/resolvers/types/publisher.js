export default {
  async user(parentId, contex, { loaders }) {
    return (await loaders.getPublisher.load(parentId)).user;
  },
  // async records(parentId, contex, { loaders }) {
  //   return (await loaders.getPublisher.load(parentId)).records;
  // },
};
