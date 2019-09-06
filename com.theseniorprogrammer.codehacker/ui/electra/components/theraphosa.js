import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Phosa from '../../theraphosa/theraphosa'
import PhosaTheme from '../../theraphosa/theme/monokai.js'
import {Mode} from '../../theraphosa/mode/javascript.js'
import {BrowserToTheraphosaEventBus} from './eventbus.js'


class Theraphosa extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement('div', { id: 'editor' });
  }

  componentDidMount() {
    var element = document.getElementById('editor');
    this.phosaEditor = Phosa.edit(element);
    this.phosaEditor.setTheme(PhosaTheme);
    this.phosaEditor.getSession().setMode(new Mode());

    this.FileAndFolderClick = function(data) {
        console.log('browser - to - theraphosa: ' + data);
        this.phosaEditor.setValue(data);
    };
    BrowserToTheraphosaEventBus.subscribe(this.FileAndFolderClick.bind(this));
  }
}

Theraphosa.propTypes = {
  path: PropTypes.string
};

export {Theraphosa}
