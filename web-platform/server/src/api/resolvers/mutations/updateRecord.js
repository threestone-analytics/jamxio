

export default function uploadFile(root, { file }) {

    switch (file.name) {
  
      case 'load_zones.tab':
        break;
  
      case 'project_info.tab':
        break;
  
      default:
        console.log('Not valid file');
    }
    return TransmissionLines.findOne();
  }