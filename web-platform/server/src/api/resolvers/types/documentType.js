export default {
  async category(parentId, contex, { loaders }) {
    console.log(parentId, "documenttype here")
    return (await loaders.getDocumentType.load(parentId)).category;
  },
  async subcategory(parentId, contex, { loaders }) {
    return (await loaders.getDocumentType.load(parentId)).subcategory;
  },
};
