import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserFileView} from './file';
import {BrowserFolderView} from './folder';
import PathMasterView from '../pathmaster/view';
import {Googler} from '../../../connectors/googledriver';
import {BrowserFile} from './model';

class Browser extends Component {

  constructor(props) {
    super(props);

    this.srcFolderDescriptor = props.srcFolderDescriptor;
    this.pathFolderDescriptor = props.pathFolderDescriptor;

    this.rootFolderContent = [];

    this.state = {
      updateSource: 'constructor'
    };
    
  }

  componentDidMount(){
    Googler.listFiles(this.srcFolderDescriptor, driveFiles => {
      driveFiles.forEach(driveFile => {
        var browserFile = new BrowserFile();
        browserFile
          .setId(driveFile.id)
          .setName(driveFile.name)
          .setType(driveFile.mimeType)
          .setFullName(driveFile.name)
          .setOriginalObject(driveFile);
        this.rootFolderContent.push(browserFile);
      });
      this.setState({ updateSource: 'componentDidMount' });
    })
  }

  render() {

    this.pathMasterView = React.createElement(PathMasterView, {pathFolderDescriptor: this.pathFolderDescriptor});

    this.browserContent = React.createElement(
      'div', { className: 'split-pane browser-files'  },
        this.rootFolderContent.map(browserFile => {
          if (Googler.isFolder(browserFile.originalObject))
            return React.createElement(BrowserFolderView, { folder: browserFile, level: 0 });
          else
            return React.createElement(BrowserFileView, { file: browserFile, level: 0 });
        })
    );

    this.browserWrapper = React.createElement(
      'div', {className: 'browser-container'},
        this.pathMasterView,
        this.browserContent
    );

    return this.browserWrapper;
  }

}

Browser.propTypes = {
  srcFolderDescriptor: PropTypes.string.isRequired,
  pathFolderDescriptor: PropTypes.string.isRequired
};

export {Browser}
