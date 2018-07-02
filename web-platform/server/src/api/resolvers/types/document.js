export default {
    async documentType(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).documentType;
    },
    async datePublished(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).datePublished;
    },
    async format(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).format;
    },
    async title(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).title;
    },
    async content(parentId, contex, { loaders }) {
      return (await loaders.getDocument.load(parentId)).content;
    },
  };