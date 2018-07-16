export const createRecord = (form, data) => {
  const date = new Date();

  const publisher = {
    user: {
      username: 'alexter42',
    },
  };

  addFile(form.values.file);

  const document = {};
  document.source = form.values.source;
  document.format = form.values.format;
  document.documentType = data.documentType._id;
  document.file = form.values.file;
  document.title = form.values.source;
  document.publishedDate = date;
  document.publisher = publisher;
  const id = data._id;

  const newDocument = {
    document,
    id,
  };
  return newDocument;
};

export const validate = values => {
  const check = values.toJSON();
  const errors = {};
  if (!check.file) {
    errors.file = 'Required';
  }
  if (!check.format) {
    errors.format = 'Required';
  }
  if (!check.source) {
    errors.source = 'Required';
  }
  return errors;
};
