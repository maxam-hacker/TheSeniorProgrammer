import fs from 'fs';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserFileView} from './file';
import {Googler} from '../../../connectors/googledriver';
import { BrowserFile } from './model';


class BrowserFolderView extends Component {

  constructor(props) {
    super(props);

    this.folder = this.props.folder;
    this.folderContent = [];

    this.state = {
      folderOpen: false,
    };

    this.getFolderContent = function(update) {
      Googler.listFiles(
        this.folder.originalObject.id, 
        driveFiles => {
          driveFiles.forEach(driveFile => {
            var browserFile = new BrowserFile();
            browserFile
              .setId(driveFile.id)
              .setName(driveFile.name)
              .setType(driveFile.mimeType)
              .setFullName(this.folder.fullName + '/' + driveFile.name)
              .setOriginalObject(driveFile)
            this.folderContent.push(browserFile);
          });
          if (update !== undefined)
            update();
        },
        error => console.log('List files command error [Folder]: ', error)
      );
    }

    this.onFolderClick = function(event) {
      event.stopPropagation();
      if (this.folderContent.length === 0) 
        this.getFolderContent(this.updateFolderContentOnClick);
      else
        this.updateFolderContentOnClick();
    }

    this.updateFolderContentOnClick = function() {
      this.setState({folderOpen: !this.state.folderOpen});
    };

    this.updateFolderContentOnMount = function() {
      this.setState({ updateSource: 'componentDidMount' });
    }

    this.getFolderContent = this.getFolderContent.bind(this);
    this.onFolderClick = this.onFolderClick.bind(this);
    this.updateFolderContentOnClick = this.updateFolderContentOnClick.bind(this);
    this.updateFolderContentOnMount = this.updateFolderContentOnMount.bind(this);
  }

  componentDidMount(){
    this.getFolderContent(this.updateFolderContentOnMount);
  }

  render() {

    var htmlObj = {__html: 
      '<svg ' +
        'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
          'version="1.1" baseProfile="full" ' +
          'width="24" height="24" ' +
          'viewBox="0 0 24.00 24.00" ' +
          'enable-background="new 0 0 24.00 24.00" ' +
        'xml:space="preserve">' +
        '<path d="M0 0h24v24H0z" fill="none"></path>' +
        '<path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" stroke="lime"></path>' +
      '</svg>'
    };

    this.folderImage = React.createElement('svg', { width: '24px', height: '24px', dangerouslySetInnerHTML: htmlObj });
      
    this.folderName = React.createElement(
      'span', { style: {color: '#d4d4d4'} }, 
        this.folder.name
    );
      
    this.folderNamedImage = React.createElement(
      'div', { onClick: this.onFolderClick.bind(this), style: { display: 'flex', position: 'relative', left: this.props.level * 20 + 'px', marginTop: '3px' } }, 
        this.folderImage, 
        this.folderName
    );

    if (this.state.folderOpen) {

      this.contentWrapper = React.createElement(
        'div', {},
          this.folderContent.map(browserFile => {
            if (Googler.isFolder(browserFile.originalObject))
              return React.createElement(BrowserFolderView, { folder: browserFile, level: this.props.level + 1});
            else
              return React.createElement(BrowserFileView, { file: browserFile, level: this.props.level + 1 });
          }
        )
      );
      
      this.folderWrapper = React.createElement(
        'div', {}, 
          this.folderNamedImage, 
          this.contentWrapper
      );

    } else {
      
      this.folderWrapper = React.createElement(
        'div', {}, 
          this.folderNamedImage
      );
    }

    return this.folderWrapper;
  }

}


BrowserFolderView.propTypes = {
  folder: PropTypes.object.isRequired
};

export {BrowserFolderView}
