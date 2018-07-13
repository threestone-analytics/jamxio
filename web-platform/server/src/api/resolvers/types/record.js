export default {
  async title({ _id }, contex, { loaders }) {
    return (await loaders.getRecord.load(_id)).title;
  },
  async documents({ _id }, contex, { loaders }) {
    return (await loaders.getRecord.load(_id)).documents;
  },
};
