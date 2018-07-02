export default {
    async category(parentId, contex, { loaders }) {
      return (await loaders.getDocumentType.load(parentId)).category;
    },
    async subcategory(parentId, contex, { loaders }) {
      return (await loaders.getDocumentType.load(parentId)).subcategory;
    },
  };