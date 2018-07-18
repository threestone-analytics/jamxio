// import * as AWS from 'aws-sdk';
// import { L } from 'leaflet-headless';

// const bucketName = process.env.DOCUMENTS_BUCKET_NAME;
// const bucketRegion = process.env.IDENTITY_POOL_REGION;
// const IdentityPoolId = process.env.IDENTITY_POOL_ID;

const addFile = () => {
  // if (!file) {
  //   return alert('Please choose a file to upload first.');
  // }
  // AWS.config.update({
  //   region: bucketRegion,
  //   credentials: new AWS.CognitoIdentityCredentials({
  //     IdentityPoolId,
  //   }),
  // });
  // const s3 = new AWS.S3({
  //   apiVersion: '2006-03-01',
  //   params: { Bucket: bucketName },
  // });
  // const fileName = file.name;
  // const filesRocordKey = `${encodeURIComponent('docs')}/`;
  // const fileKey = filesRocordKey + fileName;
  // s3.upload(
  //   {
  //     Key: fileKey,
  //     Body: file,
  //     ACL: 'public-read',
  //   },
  //   (err, data) => {
  //     if (err) {
  //       return alert('There was an error uploading your photo: ', err.message);
  //     }
  //     alert('Successfully uploaded photo.');
  //   }
  // );
  // return file;
};

// export const createMapThumbnail = function(geometry) {
//   const map = L.map(document.createElement('div')).setView([23.8, -102.1], 5);

//   L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {
//     attribution: 'OpenStreetMap Sweden'
//   }).addTo(map);

//   const geojson = L.geoJson(geometry, {
//     fillColor: 'red',
//     weight: 2,
//     opacity: 1,
//     color: 'white',
//     dashArray: '3',
//     fillOpacity: 0.7
//   });

//   geojson.addTo(map);
//   map.setSize(900, 500);
//   map.saveImage('test.png', filename => {
//     console.log(`Saved map image to ${filename}`);// eslint-disable-line
//   });
// };

export const createRecord = (form, data) => {
  const date = new Date();

  const publisher = {
    user: {
      username: 'alexter42'
    }
  };

  const url = addFile(form.values.file);
  const thumbnail = 'createMapThumbnail(form.values.geometry)';
  const document = {};
  document.source = form.values.source;
  document.format = form.values.format;
  document.documentType = data.documentType._id;
  document.file = form.values.file;
  document.title = form.values.source;
  document.publishedDate = date;
  document.publisher = publisher;
  document.thumbnail = thumbnail;
  document.url = url;
  const id = data._id;

  const newDocument = {
    document,
    id
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
