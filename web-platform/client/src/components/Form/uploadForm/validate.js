export const createRecord = form => {
  const date = new Date();

  const publisher = {
    user: {
      username: 'alexter42',
    },
  };

  const document = {};

  document.documentType = {
    category: form.values.subcategory,
    subcategory: form.values.subcategory,
  };

  document.source = form.values.source;
  document.format = form.values.format;
  document.geometry = form.values.geometry;
  document.title = form.values.source;

  const record = {
    publishedDate: date,
    document,
    publisher,
  };
  return record;
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
