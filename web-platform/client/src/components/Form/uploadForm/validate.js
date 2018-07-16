import * as AWS from 'aws-sdk';

const bucketName = 'jamxio-documents';
const bucketRegion = process.env.IDENTITY_POOL_REGION;
const IdentityPoolId = process.env.IDENTITY_POOL_ID;

console.log(bucketRegion, IdentityPoolId)


const addFile = file => {
  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId,
    }),
  });
  
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: bucketName },
  });
  
  if (!file) {
    return alert('Please choose a file to upload first.');
  }

  const fileName = file.name;
  const filesRocordKey = `${encodeURIComponent('docs')}/`;
  const fileKey = filesRocordKey + fileName;
  console.log(fileKey)
  s3.upload(
    {
      Key: fileKey,
      Body: file,
      ACL: 'public-read',
    },
    (err, data) => {
      if (err) {
        return alert('There was an error uploading your photo: ', err.message);
      }
      alert('Successfully uploaded photo.');
    }
  );
  return file;
};

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
