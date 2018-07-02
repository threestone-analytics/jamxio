export default {
    async publishedDate(parentId, contex, { loaders }) {
      return (await loaders.getRecord.load(parentId)).publishedDate;
    },
    async publisher(parentId, contex, { loaders }) {
      return (await loaders.getRecord.load(parentId)).publisher;
    },
    async document(parentId, contex, { loaders }) {
      return (await loaders.getRecord.load(parentId)).document;
    },
  };


  