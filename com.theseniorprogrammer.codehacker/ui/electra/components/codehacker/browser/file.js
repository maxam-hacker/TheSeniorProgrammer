import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {BrowserToTheraphosaCallsEventBus, BrowserToTheraphosaMethodsEventBus} from '../eventbus.js';


class BrowserFileView extends Component {

  constructor(props) {
    super(props);

    this.file = this.props.file;
  }

  onFileClick(event) {
    event.stopPropagation();
    BrowserToTheraphosaCallsEventBus.publish(this.file);
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

    this.fileImage = React.createElement('svg', { width: '24px', height: '24px', dangerouslySetInnerHTML: htmlObj });
    
    this.fileName = React.createElement(
      'span', { style: {color: '#d4d4d4'} }, 
        this.file.name
    );
    
    this.fileNamedImage = React.createElement(
      'div', { style: { display: 'flex', position: 'relative', left: this.props.level * 20 + 'px', marginTop: '3px' } }, 
        this.fileImage, 
        this.fileName
    );
    
    this.fileWrapper = React.createElement(
      'div', { onClick: this.onFileClick.bind(this) }, 
        this.fileNamedImage
    );

    return this.fileWrapper;
  }

}

BrowserFileView.propTypes = {
  file: PropTypes.object.isRequired
};

export {BrowserFileView}
