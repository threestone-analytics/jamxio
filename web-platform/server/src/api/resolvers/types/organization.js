export default {
  async name(parentId, contex, { loaders }) {
    return (await loaders.getOrganization.load(parentId)).name;
  },
  async contactPoint(parentId, contex, { loaders }) {
    return (await loaders.getOrganization.load(parentId)).contactPoint;
  },
};
