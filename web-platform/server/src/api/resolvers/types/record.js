export default {
  async title({ _id }, contex, { loaders }) {
    return (await loaders.getRecord.load(_id)).title;
  },
  async category({ _id }, contex, { loaders }) {
    return (await loaders.getRecord.load(_id)).category;
  },
  async subcategory({ _id }, contex, { loaders }) {
    return (await loaders.getRecord.load(_id)).subcategory;
  },
  async documents({ _id }, contex, { loaders }) {
    return (await loaders.getRecord.load(_id)).documents;
  },
};
