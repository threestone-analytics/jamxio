export default {
  async source({ document }, contex, { loaders }) {
    return (await loaders.getDocument.load(document)).source;
  },
  async geometry({ document }, contex, { loaders }) {
    return (await loaders.getDocument.load(document)).geometry;
  },
  async format({ document }, contex, { loaders }) {
    return (await loaders.getDocument.load(document)).format;
  },
  async documentType({ document }, contex, { loaders }) {
    console.log(document, "documentType1")
    return (await loaders.getDocument.load(document)).documentType;
  },
  async title({ document }, contex, { loaders }) {
    return (await loaders.getDocument.load(document)).title;
  },
};
