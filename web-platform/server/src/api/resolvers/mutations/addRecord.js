


import RecordModel from '../../../db/models/record.model';
import UserModel from '../../../db/models/user.model';
import DocumentTypeModel from '../../../db/models/documentType.model';
import DocumentModel from '../../../db/models/document.model';

const handleError = function(err) {
console.log("error",err)
}

export default function addRecord(root, { file }) {

  console.log(file, '------------------------------------------------------------------------------------------------------------------------');
  const date = new Date().toISOString();

  //Create user
  const uModel = new UserModel({ user: { username: "alexter42" }});
  //Create documentType
  const dTModel = new DocumentTypeModel({ 
    category : file.category, 
    subcategory: file.subcategory, 
  });
  //Create document
  const dModel = new DocumentModel({ 
    documentType: dTModel , 
    datePublished: date, 
    format: 'geojson', 
    title: file.title, 
    content: { "data": "layer" }
  });
  //Create record
  const rModel = new RecordModel();
  rModel.set({
    publishedDate: date,
    publisher: uModel,
    document: dModel,
  });
  rModel.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });

}

