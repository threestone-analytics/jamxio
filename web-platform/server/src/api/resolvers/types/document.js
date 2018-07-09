export default {
  async documentType(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).documentType;
  },
  async format(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).format;
  },
  async source(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).source;
  },
  async title(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).title;
  },
  async geometry(parentId, contex, { loaders }) {
    return (await loaders.getDocument.load(parentId)).geometry;
  },
};
