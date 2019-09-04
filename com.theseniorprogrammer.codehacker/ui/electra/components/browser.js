import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NestedFileTreeView from 'react-nested-file-tree';
import 'react-nested-file-tree/dist/default.css';

class Browser extends Component {

    constructor (props) {
      super(props)
      this.state = {
        selectedFile: 'some_folder/some_file',
        directory: {
        _contents: [
          {
            name: 'file_name1',
            path: 'file_name1'
          }
        ],
        folder_name1: {
          _contents: [
            {
              name: 'file_name2',
              path: 'folder_name1/file_name2'
            }
          ],
          folder_name2: {
            _contents: [
              {
                name: 'file_name3',
                path: 'folder_name1/folder_name2/file_name3'
              }
            ]
          }
        }
      }
      };
    }  
  
    handleFileClick (file) {
      console.log(file)
      this.setState({ selectedFile: file.path })
    }
  
    handleFolderClick (folderName) {
      console.log(folderName)
    }
  
    render () {
      return React.createElement(
            NestedFileTreeView,
            {
                selectedFilePath: this.state.selectedFile, 
                fileClickHandler: this.handleFileClick,
                folderClickHandler: this.folderClickHandler,
                directory: this.state.directory
            }
        );
    }
}

Browser.propTypes = {
  selectedFilePath: PropTypes.string,
  fileClickHandler: PropTypes.func,
  folderClickHandler: PropTypes.func,
  directory: PropTypes.object.isRequired
};

export { Browser }