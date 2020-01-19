import fs from 'fs';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Phosa from '../../../../theraphosa/theraphosa';
import PhosaTheme from '../../../../theraphosa/theme/monokai.js';
import {Mode} from '../../../../theraphosa/mode/javascript.js';
import {BrowserToTheraphosaCallsEventBus, BrowserToTheraphosaMethodsEventBus} from '../eventbus.js';
import {CallToTheraphosaEventBus, MethodToTheraphosaEventBus} from '../eventbus'
import {Googler} from '../../seniorprogrammer/gdriver';
import {setCallRegistry} from '../../../paths'


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
    setCallRegistry(this.phosaEditor.callsRegistry);
    this.pathToFile = '';

    this.FileAndFolderClick = function(event) {
        this.pathToFile = event.file.name;
        Googler.downloadFile(event.file.id, text => {
          this.phosaEditor.setCurrentFile(event.file.name);
          this.phosaEditor.setValueWithTag(text.toString(), { path: event.file.name, deltaX: 0, deltaY: 0 });
        });
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

    BrowserToTheraphosaCallsEventBus.subscribe(this.FileAndFolderClick.bind(this));
    CallToTheraphosaEventBus.subscribe(this.CallCreator.bind(this));
    MethodToTheraphosaEventBus.subscribe(this.MethodCreator.bind(this));
  }
}

Theraphosa.propTypes = {
  rootFolderDescriptor: PropTypes.string
};

export {Theraphosa}
