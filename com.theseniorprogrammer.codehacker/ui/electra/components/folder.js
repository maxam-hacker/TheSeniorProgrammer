import React, {Component} from 'react'
import PropTypes from 'prop-types'

class FolderView extends Component {

  constructor(props) {
    super(props);
  }

  onFolderClick(e) {
    console.log(this.props.path);
  }

  render() {
    return React.createElement('li', { onClick: this.onFolderClick.bind(this) }, this.props.name);
  }

}

FolderView.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export {FolderView}
