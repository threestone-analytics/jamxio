export default {
  async source(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).source;
  },
  async geometry(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).geometry;
  },
  async format(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).format;
  },
  async documentType(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).documentType;
  },
  async title(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).title;
  },
};
