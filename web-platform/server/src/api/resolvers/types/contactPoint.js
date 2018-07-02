export default {
    async name(parentId, contex, { loaders }) {
      return (await loaders.getContactPoint.load(parentId)).name;
    },
    async email(parentId, contex, { loaders }) {
      return (await loaders.getContactPoint.load(parentId)).email;
    },
    async telephone(parentId, contex, { loaders }) {
      return (await loaders.getContactPoint.load(parentId)).telephone;
    },
  };

