export default {
  async document(parentId, contex, { loaders }) {
    return (await loaders.getRecord.load(parentId)).document;
  },
  async publisher(parentId, contex, { loaders }) {
    return (await loaders.getRecord.load(parentId)).publisher;
  },
  async publishedDate(parentId, contex, { loaders }) {
    return (await loaders.getRecord.load(parentId)).publishedDate;
  },
};
