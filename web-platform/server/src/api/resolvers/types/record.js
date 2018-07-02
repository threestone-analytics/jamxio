export default {
    async publishedDate(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).publishedDate;
    },
    async publisher(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).publisher;
    },
    async document(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).document;
    },
  };
