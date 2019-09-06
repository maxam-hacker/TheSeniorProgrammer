import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {BrowserToTheraphosaEventBus} from './eventbus.js'

class FileView extends Component {

  constructor(props) {
    super(props);
  }

  onFileClick(e) {
    BrowserToTheraphosaEventBus.publish(this.props.path);
  }

  render() {
    return React.createElement('li', { onClick: this.onFileClick.bind(this) }, this.props.name);
  }

}

FileView.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export {FileView}
