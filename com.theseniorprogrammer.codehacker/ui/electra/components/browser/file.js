import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {BrowserToTheraphosaCallsEventBus, BrowserToTheraphosaMethodsEventBus} from '../eventbus.js'

class FileView extends Component {

  constructor(props) {
    super(props);
  }

  onFileClick(event) {
    event.stopPropagation();
    if (this.props.type === 'calls')
      BrowserToTheraphosaCallsEventBus.publish(this.props.path);
    else if (this.props.type === 'methods')
      BrowserToTheraphosaMethodsEventBus.publish(this.props.path);
  }

  render() {

    var htmlObj = {__html: 
      '<svg ' +
        'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' + 
          'version="1.1" baseProfile="full" ' + 
          'width="24" height="24" ' + 
          'viewBox="0 0 24.00 24.00" ' +
          'enable-background="new 0 0 24.00 24.00" ' +
        'xml:space="preserve">' +
        '<path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" stroke="#2b40f7"></path>' +
      '</svg>'};

    var fileImage = React.createElement('svg', { width: '24px', height: '24px', dangerouslySetInnerHTML: htmlObj });
    var fileName = React.createElement('span', { style: {color: '#d4d4d4'} }, this.props.name);
    var fileNamedImage = React.createElement('div', { style: { display: 'flex', position: 'relative', left: this.props.level * 20 + 'px', marginTop: '3px' } }, fileImage, fileName);
    var fileWrapper = React.createElement('div', { onClick: this.onFileClick.bind(this) }, fileNamedImage);

    return fileWrapper;
  }

}

FileView.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export {FileView}
