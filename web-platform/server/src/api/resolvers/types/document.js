export default {
  async recordId({ _id }, contex, { loaders }) {
    const data = await loaders.getDocument.load(_id);
    return data.recordId;
  },
  async url({ _id }, contex, { loaders }) {
    const data = await loaders.getDocument.load(_id);
    return data.url;
  },
  async geometry({ _id }, contex, { loaders }) {
    const data = await loaders.getDocument.load(_id);
    return data.geometry;
  },
  async publisher({ _id }, contex, { loaders }) {
    const data = await loaders.getDocument.load(_id);
    return data.publisher;
  },
  async format({ _id }, contex, { loaders }) {
    const data = await loaders.getDocument.load(_id);
    return data.format;
  },
  async publishedDate({ _id }, contex, { loaders }) {
    const data = await loaders.getDocument.load(_id);
    return data.publishedDate;
  },
  async source({ _id }, contex, { loaders }) {
    const data = await loaders.getDocument.load(_id);
    return data.source;
  },
};
