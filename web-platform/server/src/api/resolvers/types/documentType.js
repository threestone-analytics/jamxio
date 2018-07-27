export default {
  async category(parentId, contex, { loaders }) {
    const data = await loaders.getDocumentType.load(parentId);
    return data.category;
  },
  async subcategory(parentId, contex, { loaders }) {
    const data = await loaders.getDocumentType.load(parentId);
    return data.subcategory;
  },
};
