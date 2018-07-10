export default {
  async document({ _id }, contex, { loaders }) {
    console.log(_id, 'fuckn id');
    return await loaders.getRecord.load(_id);
  },
  async publisher(parentId, contex, { loaders }) {
    return (await loaders.getRecord.load(parentId)).publisher;
  },
  async publishedDate(parentId, contex, { loaders }) {
    return (await loaders.getRecord.load(parentId)).publishedDate;
  },
};
