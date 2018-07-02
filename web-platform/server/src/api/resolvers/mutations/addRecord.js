


import RecordModel from '../../../db/models/record.model';
import UserModel from '../../../db/models/user.model';
import DocumentTypeModel from '../../../db/models/documentType.model';
import DocumentModel from '../../../db/models/document.model';

const handleError = function(err) {
console.log("error",err)
}

const data = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": {"type":"MultiPolygon", "coordinates": [[[
  [-110.244552480426, 30.715559010317],
  [-110.191009679872, 30.7283344204055],
  [-110.19261923957, 30.7387981798536],
  [-110.177482679588, 30.7382030098241],
  [-110.171913119841, 30.7528419602858],
  [-110.172058199819, 30.7675513804464],
  [-110.133117719722, 30.7719611998211],
  [-110.138587920218, 30.8019332702049],
  [-110.000000160103, 30.874231349611],
  [-109.985008320469, 30.8865814203716],
  [-109.968940800379, 30.8998012497579],
  [-109.967437799814, 30.8679313502989],
  [-109.903022640037, 30.8439845997929],
  [-109.882446120184, 30.845033639789],
  [-109.864723320139, 30.8198566797379],
  [-109.864036439547, 30.7660464903074],
  [-109.836532439989, 30.7453804200669],
  [-109.8340606805, 30.7156544103548],
  [-109.838546640146, 30.7081070095582],
  [-109.812927240408, 30.6898594199886],
  [-109.808227439733, 30.6587734196683],
  [-109.794868559876, 30.6622047596054],
  [-109.793350079762, 30.632453909632],
  [-109.833053759838, 30.6266327098906],
  [-109.829826360003, 30.6244869296537]]]]}}]};
  
  export default function addRecord(root, { file }) {
  const date = new Date()
  // .toISOString();
  //Create user
  const uModel = new UserModel();
  uModel.set({ user: { username: "alexter42" }});
  uModel.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });

  //Create record
  const rModel = new RecordModel();
  rModel.set({
    publishedDate: date,
    publisher: uModel,
    document: { 
      documentType: { 
        category : file.category, 
        subcategory: file.subcategory, 
      } , 
      format: 'geojson', 
      title: file.title, 
      file: data
    },
  });


  rModel.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });

  
}
