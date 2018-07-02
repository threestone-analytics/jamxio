export default {
    async category(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).category;
    },
    async subcategory(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).subcategory;
    },
  };