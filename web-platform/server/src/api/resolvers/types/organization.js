export default {
    async name(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).name;
    },
    async contactPoint(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).contactPoint;
    },
  };