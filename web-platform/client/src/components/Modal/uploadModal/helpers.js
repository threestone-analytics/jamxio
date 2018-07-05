const createRecord = props => {
  const date = new Date();
  const publisher = {
    user: { username: '' },
  };
  const file = props.dropzone.toJSON();
  const document = {};

  document.documentType = {
    category: 'props.uploadFileForm.uploadForm.values.category',
    subcategory: props.uploadFileForm.uploadForm.values.subcategory,
  };

  document.source = props.uploadFileForm.uploadForm.values.source;
  document.format = file.document.format;
  document.geometry = file.document.geometry;
  document.title = 'props.uploadFileForm.uploadForm.values.title';

  const record = {
    publishedDate: date,
    document,
    publisher,
  };

  return record;
};

export default createRecord;
