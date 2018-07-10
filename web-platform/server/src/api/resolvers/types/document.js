export default {
  async source(parentId, contex, { loaders }) {
    console.log(parentId._id);
    return (await loaders.getDocument.load(parentId)).source;
  },
  async geometry(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).geometry;
  },
  async format({ _id }, contex, { loaders }) {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAa');
    return (await loaders.getDocument.load(_id)).format;
  },
  async documentType(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).documentType;
  },
  async title(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).title;
  },
};
