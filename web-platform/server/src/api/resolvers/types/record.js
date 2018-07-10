export default {
  async document({ _id }, contex, { loaders }) {
    console.log('Win');
    return await loaders.getDocument.load('5b447ee304be647d9a99956f');
  },
  async publisher(parentId, contex, { loaders }) {
    return (await loaders.getRecord.load(parentId)).publisher;
  },
  async publishedDate(parentId, contex, { loaders }) {
    return (await loaders.getRecord.load(parentId)).publishedDate;
  },
};
