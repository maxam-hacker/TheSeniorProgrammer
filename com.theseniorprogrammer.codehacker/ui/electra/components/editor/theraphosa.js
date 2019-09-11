import fs from 'fs';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Phosa from '../../../theraphosa/theraphosa';
import PhosaTheme from '../../../theraphosa/theme/monokai.js';
import {Mode} from '../../../theraphosa/mode/javascript.js';
import {BrowserToTheraphosaCallsEventBus, BrowserToTheraphosaMethodsEventBus} from '../eventbus.js';
import {CallToTheraphosaEventBus, MethodToTheraphosaEventBus} from '../eventbus'
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
    this.pathToFile = '';

    this.FileAndFolderClick = function(pathToFile) {
        this.pathToFile = pathToFile;
        var text = fs.readFileSync(pathToFile);
        this.phosaEditor.setValue(text.toString());
    };

    this.MethodCreator = function(callback) {
      var selectedText = this.phosaEditor.getSelectedText();
      var selectedRange = this.phosaEditor.getSelectionRange();
      callback(this.pathToFile, selectedText, selectedRange);
    };

    this.CallCreator = function(callback) {
      var selectedText = this.phosaEditor.getSelectedText();
      var selectedRange = this.phosaEditor.getSelectionRange();
      callback(this.pathToFile, selectedText, selectedRange);
    };

    if (this.props.type === 'calls') {
      BrowserToTheraphosaCallsEventBus.subscribe(this.FileAndFolderClick.bind(this));
      CallToTheraphosaEventBus.subscribe(this.CallCreator.bind(this));
    } else if (this.props.type === 'methods') {
      BrowserToTheraphosaMethodsEventBus.subscribe(this.FileAndFolderClick.bind(this));
      MethodToTheraphosaEventBus.subscribe(this.MethodCreator.bind(this));
    }
  }
}

Theraphosa.propTypes = {
  id: PropTypes.string,
  path: PropTypes.string,
  type: PropTypes.string
};

export {Theraphosa}
