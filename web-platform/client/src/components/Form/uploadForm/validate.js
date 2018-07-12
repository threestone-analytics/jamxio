export const createRecord = (form, data) => {
  const date = new Date();

  const publisher = {
    user: {
      username: 'alexter42',
    },
  };

  const document = {};
  document.source = form.values.source;
  document.format = form.values.format;
  document.category = data.category;
  document.subcategory = data.subcategory;
  document.geometry = form.values.geometry;
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
  if (!check.source) {
    errors.source = 'Required';
  }
  if (!check.subcategory) {
    errors.subcategory = 'Required';
  }
  if (!check.geometry) {
    errors.subcategory = 'Required';
  }
  return errors;
};
