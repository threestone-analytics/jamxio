import DropzoneComponent from 'react-dropzone-component';
import React from 'react';
import GeoJSON from 'geojson-validation';
import PropTypes from 'prop-types';

import '../../styles/app/dropzone/dropzone.scss';

const componentConfig = {
  iconFiletypes: ['.GeoJSON'],
  showFiletypeIcon: true,
  postUrl: 'no-url'
};

const djsConfig = {
  acceptedFiles: '.geojson',
  autoProcessQueue: false,
  showFiletypeIcon: true,
  maxFiles: 1,
  params: {
    myParam: 'Hello from a parameter!',
    dictRemoveFile: 'lol',
    anotherParam: 43
  }
};

const Dropzone = props => {
  const handleShow = name => {
    props.actions.showAlert(name);
  };
  const handleHide = name => {
    props.actions.hideAlert(name);
  };

  const handleSaveFile = document => {
    props.actions.saveFile(document);
    props.change(['file'], document.file);
    props.change(['format'], document.format);
  };
  let myDropzone;

  const eventHandlers = {
    maxfilesexceeded: () => {
      // let previousFile = myDropzone.getAcceptedFiles();
      // previousFile = previousFile[0];
      myDropzone.removeAllFiles();
    },
    init: dropzone => {
      myDropzone = dropzone;
    },
    addedfile: file => {
      // new browsers do not show file.path anymore (for security reasons) so we need the next code in order the bea able to read the file, and of course validate it's GeoJSON format
      let data;
      const reader = new FileReader();
      reader.onload = (function() {
        return function(e) {
          try {
            data = JSON.parse(e.target.result);
            if (GeoJSON.valid(data)) {
              handleSaveFile({
                format: file.type,
                geometry: data,
                file
              });
              handleHide('alertText');
            } else {
              handleShow('alertText');
            }
          } catch (ex) {
            handleShow('alertText');
            console.log(`ex when trying to parse json = ${ex}`);// eslint-disable-line
          }
        };
      })(file);
      reader.readAsText(file);
    }
  };
  return (
    <div>
      <DropzoneComponent
        config={componentConfig}
        eventHandlers={eventHandlers}
        djsConfig={djsConfig}
      >
        <div className="dz-message">Agregar archivo</div>
      </DropzoneComponent>
    </div>
  );
};

Dropzone.propTypes = {
  change: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};
export default Dropzone;
