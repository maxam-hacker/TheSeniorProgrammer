import fs from 'fs';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FileView} from './file';
import {FolderView} from './folder';
import PathMasterView from '../pathmaster/view';
import {Googler} from '../../seniorprogrammer/gdriver';

class Browser extends Component {

  constructor(props) {
    super(props);

    this.rootFolderDescriptor = props.rootFolderDescriptor;
    this.pathFolderDescriptor = props.pathFolderDescriptor;

    this.dir = [];

    this.state = {
      updateSource: 'constructor'
    };
    
  }

  componentDidMount(){
    Googler.listFiles(this.rootFolderDescriptor, files => {
      files.forEach(file => {
        this.dir.push(file);
      });
      this.setState({ updateSource: 'componentDidMount' });
    })
  }

  render() {
    return React.createElement('div', {className: 'browser-container'},
              React.createElement(PathMasterView, {pathFolderDescriptor: this.pathFolderDescriptor}),
              React.createElement('div', { className: 'split-pane browser-files'  },
                this.dir.map(file => {
                  if (Googler.isFolder(file))
                    return React.createElement(FolderView, { file: file, path: file.name, level: 0 });
                  else
                    return React.createElement(FileView, { file: file, path: file.name, level: 0 });
                  
                })
              ));
  }

}

Browser.propTypes = {
  rootFolderDescriptor: PropTypes.string.isRequired
};

export {Browser}
