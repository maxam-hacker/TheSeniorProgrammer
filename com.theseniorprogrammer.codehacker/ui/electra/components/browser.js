import fs from 'fs';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FileView} from './file';
import {FolderView} from './folder';

class Browser extends Component {

  constructor(props) {
    super(props);

    var basePath = props.path;

    this.state = {
      dir: fs.readdirSync(basePath)
    };
    
  }

  render() {
    return React.createElement(

      'ul', {},

      this.state.dir.map(file => {

        var stat = fs.statSync(file);

        if (stat.isFile())
          return React.createElement(FileView, { name: file, path: './' + file });

        if (stat.isDirectory())
          return React.createElement(FolderView, { name: file, path: './' + file });
      })

    );
  }
}

Browser.propTypes = {
  path: PropTypes.string.isRequired
};

export {Browser}
