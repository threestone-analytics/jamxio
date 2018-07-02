export default {
    async name(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).name;
    },
    async email(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).email;
    },
    async telephone(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).telephone;
    },
  };

