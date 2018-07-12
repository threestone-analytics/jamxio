export default {
  async source({ _id }, contex, { loaders }) {
    return (await loaders.getDocument.load(_id)).source;
  },
  async geometry({ _id }, contex, { loaders }) {
    return (await loaders.getDocument.load(_id)).geometry;
  },
  async format({ _id }, contex, { loaders }) {
    return (await loaders.getDocument.load(_id)).format;
  },
  async publisher({ _id }, contex, { loaders }) {
    return (await loaders.getDocument.load(_id)).publisher;
  },
  async publishedDate({ _id }, contex, { loaders }) {
    return (await loaders.getDocument.load(_id)).publishedDate;
  },
  async documentType(parentId, contex, { loaders }) {
    return await loaders.getDocument.load(parentId);
  },
};
