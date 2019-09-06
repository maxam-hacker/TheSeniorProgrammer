import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {BrowserToTheraphosaEventBus} from './eventbus.js'

class FolderView extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onFolderClick(e) {
    BrowserToTheraphosaEventBus.publish(this.props.path);
  }

  render() {
    // https://woodpig07.github.io/react-nested-file-tree/
    // http://tutorials.jenkov.com/svg/path-element.html
    var htmlObj = {__html: 
      '<svg ' +
        'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
          'version="1.1" baseProfile="full" ' +
          'width="24" height="24" ' +
          'viewBox="0 0 24.00 24.00" ' +
          'enable-background="new 0 0 24.00 24.00" ' +
        'xml:space="preserve">' +
        '<path d="M0 0h24v24H0z" fill="none"></path>' +
        '<path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path>' +
      '</svg>'
    };
    return React.createElement(
      'li', { onClick: this.onFolderClick.bind(this) }, 
          React.createElement('span', { className: 'svg', dangerouslySetInnerHTML: htmlObj }),
          this.props.name);
  }

}


FolderView.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export {FolderView}
