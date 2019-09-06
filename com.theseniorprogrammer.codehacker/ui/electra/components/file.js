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
    // https://woodpig07.github.io/react-nested-file-tree/
    // http://tutorials.jenkov.com/svg/path-element.html
    var htmlObj = {__html: 
      '<svg ' +
        'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' + 
          'version="1.1" baseProfile="full" ' + 
          'width="24" height="24" ' + 
          'viewBox="0 0 24.00 24.00" ' +
          'enable-background="new 0 0 24.00 24.00" ' +
        'xml:space="preserve">' +
        '<path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"></path>' +
      '</svg>'};
    return React.createElement('li', { onClick: this.onFileClick.bind(this) }, 
        React.createElement('span', { className: 'svg', dangerouslySetInnerHTML: htmlObj }),
        this.props.name);
  }

}

FileView.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export {FileView}
