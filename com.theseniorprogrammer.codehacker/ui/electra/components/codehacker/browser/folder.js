import fs from 'fs';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserFileView} from './file';
import {Googler} from '../../../connectors/googledriver';


class BrowserFolderView extends Component {

  constructor(props) {
    super(props);

    this.file = this.props.file;
    this.dir = [];

    this.state = {
      folderOpen: false,
    };

    this.onFolderClick = function(event) {
      event.stopPropagation();
      this.setState({folderOpen: !this.state.folderOpen});
      this.forceUpdate();
    }
  }

  componentDidMount(){
    Googler.listFiles(this.file.id, files => {
      files.forEach(file => {
        this.dir.push(file);
      });
      this.setState({ updateSource: 'componentDidMount' });
    })
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

    if (this.state.folderOpen) {

      var contentWrapper = React.createElement('div', {},
        this.dir.map(file => {
          if (Googler.isFolder(file))
            return React.createElement(BrowserFolderView, { file: file, path: this.props.path + '/' + file.name, level: this.props.level + 1});
          else
            return React.createElement(BrowserFileView, { file: file, path: this.props.path + '/' + file.name, level: this.props.level + 1 });

            
        })
      );
      
      var folderImage = React.createElement('svg', { width: '24px', height: '24px', dangerouslySetInnerHTML: htmlObj });
      var folderName = React.createElement('span', { style: {color: '#d4d4d4'} }, this.props.file.name);
      var folderNamedImage = React.createElement('div', { onClick: this.onFolderClick.bind(this), style: { display: 'flex', position: 'relative', left: this.props.level * 20 + 'px', marginTop: '3px' } }, folderImage, folderName);
      var folderWrapper = React.createElement('div', {}, folderNamedImage, contentWrapper);

      return folderWrapper;

    } else {

      var folderImage = React.createElement('svg', { width: '24px', height: '24px', dangerouslySetInnerHTML: htmlObj });
      var folderName = React.createElement('span', { style: {color: '#d4d4d4'} }, this.props.file.name);
      var folderNamedImage = React.createElement('div', { onClick: this.onFolderClick.bind(this), style: { display: 'flex', position: 'relative', left: this.props.level * 20 + 'px', marginTop: '3px' } }, folderImage, folderName);
      var folderWrapper = React.createElement('div', {}, folderNamedImage);

      return folderWrapper;
    }
  }

}


BrowserFolderView.propTypes = {
  file: PropTypes.object.isRequired
};

export {BrowserFolderView}
