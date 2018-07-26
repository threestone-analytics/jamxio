export default {
  async category({ _id }, contex, { loaders }) {
    return (await loaders.getDocumentType.load(_id)).category;
  },
  async subcategory({ _id }, contex, { loaders }) {
    return (await loaders.getDocumentType.load(_id)).subcategory;
  },
};
