const createRecord = values => {
  console.log(values);
  // const date = new Date();
  // const publisher = {
  //   user: { username: '' },
  // };
  // const file = props.dropzone.toJSON();
  // const document = {};

  // document.documentType = {
  //   category: 'props.uploadFileForm.uploadForm.values.category',
  //   subcategory: values.subcategory,
  // };

  // document.source = values.source;
  // document.format = file.document.format;
  // document.geometry = file.document.geometry;
  // document.title = 'props.uploadFileForm.uploadForm.values.title';

  // const record = {
  //   publishedDate: date,
  //   document,
  //   publisher,};

  const record = {};

  return record;
};

const validate = values => {
  const check = values.toJSON();
  console.log(check, check.source, 'values');
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

export default validate;
