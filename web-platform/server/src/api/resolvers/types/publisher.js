export default {
    async user(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).user;
    },
    async records(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).records;
    },
  };