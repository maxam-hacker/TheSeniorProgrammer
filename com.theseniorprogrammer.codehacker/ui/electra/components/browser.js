import React, {Component} from 'react'
import PropTypes from 'prop-types'
import fs from 'fs'

class Browser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dir: fs.readdirSync('./')
    };
    
  }

  render() {
    return React.createElement(

      'ul', {},

      this.state.dir.map(file => {
        var stat = fs.statSync(file);
        if (stat.isFile())
          return React.createElement('li', {}, file);
        if (stat.isDirectory())
          return React.createElement('li', {}, 
            file,
            React.createElement('ul', {}, file));
      })

    );
  }
}

export {Browser}
