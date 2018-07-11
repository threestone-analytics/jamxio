import DropzoneComponent from 'react-dropzone-component';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import GeoJSON from 'geojson-validation';
import PropTypes from 'prop-types';

import '../../styles/app/dropzone/dropzone.scss';

const componentConfig = {
  iconFiletypes: ['.GeoJSON'],
  showFiletypeIcon: true,
  postUrl: 'no-url',
};

const djsConfig = {
  acceptedFiles: '.geojson',
  autoProcessQueue: false,
  showFiletypeIcon: true,
  maxFiles: 1,
  params: {
    myParam: 'Hello from a parameter!',
    dictRemoveFile: 'lol',
    anotherParam: 43,
  },
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview">
      <div className="uploaded-files">
        <div className="dz-details">
          <div className="dz-file-description">
            <div className="dz-filename">
              <span data-dz-name="true" />
            </div>
            <div className="dz-remove dz-remove-icon" data-dz-remove>
              <img alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

const Dropzone = props => {
  const handleShow = name => {
    props.actions.show_alert(name);
  };
  const handleHide = name => {
    props.actions.hide_alert(name);
  };


  const handleSaveFile = document => {
    props.actions.save_file(document);
    props.change(['geometry'], document.geometry);
    props.change(['format'], document.format);
    props.actions.set_file();
  };
  let myDropzone;

  const eventHandlers = {
    maxfilesexceeded: file => {
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
      reader.onload = (function(f) {
        return function(e) {
          try {
            data = JSON.parse(e.target.result);
            if (GeoJSON.valid(data)) {
              handleSaveFile({
                format: file.type,
                geometry: data,
              });
              handleHide('alertText');
            } else {
              handleShow('alertText');
            }
          } catch (ex) {
            handleShow('alertText');
            console.log(`ex when trying to parse json = ${ex}`);
          }
        };
      })(file);
      reader.readAsText(file);
    },
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

export default Dropzone;
