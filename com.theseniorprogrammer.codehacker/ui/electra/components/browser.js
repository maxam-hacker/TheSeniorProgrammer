import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Browser extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      'ul', {},
      React.createElement('li', {}, 'test0.txt'),
      React.createElement('li', {}, 'test1.txt')
    );
  }
}

export {Browser}
