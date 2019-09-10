import fs from 'fs';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Phosa from '../../../theraphosa/theraphosa';
import PhosaTheme from '../../../theraphosa/theme/monokai.js';
import {Mode} from '../../../theraphosa/mode/javascript.js';
import {BrowserToTheraphosaCallsEventBus, BrowserToTheraphosaMethodsEventBus} from '../eventbus.js';
import {ThePathWeb} from '../../paths'


class Theraphosa extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement('div', { id: 'editor' + this.props.id });
  }

  componentDidMount() {
    var element = document.getElementById('editor' + this.props.id);
    this.phosaEditor = Phosa.edit(element);
    this.phosaEditor.setTheme(PhosaTheme);
    this.phosaEditor.getSession().setMode(new Mode());

    this.FileAndFolderClick = function(data) {
        var text = fs.readFileSync(data);
        this.phosaEditor.setValue(text.toString());
    };
    if (this.props.type === 'calls')
      BrowserToTheraphosaCallsEventBus.subscribe(this.FileAndFolderClick.bind(this));
    else if (this.props.type === 'methods')
      BrowserToTheraphosaMethodsEventBus.subscribe(this.FileAndFolderClick.bind(this));
  }
}

Theraphosa.propTypes = {
  id: PropTypes.string,
  path: PropTypes.string,
  type: PropTypes.string
};

export {Theraphosa}
