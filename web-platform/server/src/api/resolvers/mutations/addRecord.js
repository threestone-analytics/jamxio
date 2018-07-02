


import db from '../../../config/db.config';

export default function addRecord(root, { file }) {
  console.log("working")
  const date = new Date().toISOString();

  const _id = db.Record.insert({
    publishedDate: date,
    publisher: "user",
    document: { 
      documentType: { 
        category : file.category, 
        subcategory: file.subcategory, 
      }, 
      datePublished: date, 
      format: 'geojson', 
      title: file.title, 
      content: file.data, 
    },
  });

  return db.Record.find({ _id }).fetch();
}

