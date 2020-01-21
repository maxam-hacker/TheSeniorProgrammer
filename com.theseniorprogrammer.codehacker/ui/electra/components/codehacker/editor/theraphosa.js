import fs from 'fs';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Phosa from '../../../../theraphosa/theraphosa';
import PhosaTheme from '../../../../theraphosa/theme/monokai.js';
import {Mode} from '../../../../theraphosa/mode/javascript.js';
import {BrowserToTheraphosaCallsEventBus, BrowserToTheraphosaMethodsEventBus} from '../eventbus.js';
import {CallToTheraphosaEventBus, MethodToTheraphosaEventBus, BindToTheraphosaEventBus} from '../eventbus'
import {Googler} from '../../../connectors/googledriver';
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

    this.FileAndFolderClick = function(browserFile) {
        this.browserFile = browserFile;
        Googler.downloadFile(browserFile.originalObject.id, text => {
          this.phosaEditor.setCurrentFile(browserFile.name);
          this.phosaEditor.setValueWithTag(text.toString(), { path: browserFile.name, deltaX: 0, deltaY: 0 });
        });
    };

    this.MethodCreator = function(callback) {
      var selectedText = this.phosaEditor.getSelectedText();
      var selectedRange = this.phosaEditor.getSelectionRange();
      callback(this.browserFile, selectedText, selectedRange);
    };

    this.CallCreator = function(callback) {
      var selectedText = this.phosaEditor.getSelectedText();
      var selectedRange = this.phosaEditor.getSelectionRange();
      callback(this.browserFile, selectedText, selectedRange);
    };

    this.CallAndMethodBinder = function(callback) {
      var selectedText = this.phosaEditor.getSelectedText();
      var selectedRange = this.phosaEditor.getSelectionRange();
      callback(this.browserFile, selectedText, selectedRange);
    };

    // Event, when a user clicks on a browser file
    BrowserToTheraphosaCallsEventBus.subscribe(this.FileAndFolderClick.bind(this));

    // Events, when a user clicks on call, method, bind buttons of path maser panel.
    CallToTheraphosaEventBus.subscribe(this.CallCreator.bind(this));
    MethodToTheraphosaEventBus.subscribe(this.MethodCreator.bind(this));
    BindToTheraphosaEventBus.subscribe(this.CallAndMethodBinder.bind(this));
  }
}

Theraphosa.propTypes = {
  id: PropTypes.string
};

export {Theraphosa}
