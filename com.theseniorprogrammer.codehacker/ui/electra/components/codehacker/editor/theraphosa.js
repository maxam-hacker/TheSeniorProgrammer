import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Phosa from '../../../../theraphosa/theraphosa';
import PhosaTheme from '../../../../theraphosa/theme/monokai.js';
import {Mode} from '../../../../theraphosa/mode/javascript.js';
import {BrowserToTheraphosaCallsEventBus} from '../eventbus.js';
import {CallToTheraphosaEventBus, MethodToTheraphosaEventBus, BindToTheraphosaEventBus} from '../eventbus'
import {Googler} from '../../../connectors/googledriver';
import {VirtualRenderer} from '../../../../theraphosa/virtual_renderer';
import {OpenBubbleCommander} from '../../../../theraphosa/paths/eventbus';
import {Bubbler} from '../../../../theraphosa/paths/bubbler';


class Theraphosa extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    this.bubbles = React.createElement('div', { id: 'bubbles' + this.props.id });
    this.editor = React.createElement('div', { id: 'editor' + this.props.id });
    this.container = React.createElement(
      'div', {},
        this.bubbles,
        this.editor 
    );

    return this.container;
  }

  componentDidMount() {
    
    var element = document.getElementById('editor' + this.props.id);

    this.phosaEditor = Phosa.edit(element);
    this.phosaEditor.setTheme(PhosaTheme);
    this.phosaEditor.getSession().setMode(new Mode());
    
    Bubbler.setEditor(this.phosaEditor).setContainer(document.getElementById('bubbles' + this.props.id));
    this.phosaEditor.renderer.bubbler = Bubbler;

    OpenBubbleCommander.subscribe(args => {
      Bubbler.openFor(args);
    });

    this.FileAndFolderClick = function(browserFile) {
        this.browserFile = browserFile;
        Googler.downloadFile(browserFile.originalObject.id, text => {
          this.phosaEditor.setCurrentFile(browserFile.fullName);
          this.phosaEditor.setValueWithTag(text.toString(), { file: browserFile.fullName, deltaX: 0, deltaY: 0 });
        });
    };

    this.MethodSelector = function(callback) {
      var selectedText = this.phosaEditor.getSelectedText();
      var selectedRange = this.phosaEditor.getSelectionRange();
      callback(this.browserFile, selectedText, selectedRange);
    };

    this.CallSelector = function(callback) {
      var selectedText = this.phosaEditor.getSelectedText();
      var selectedRange = this.phosaEditor.getSelectionRange();
      callback(this.browserFile, selectedText, selectedRange);
    };

    this.PathFormer = function(linkedPathMasterCall) {
      this.phosaEditor.pathsRegistry.ingestLinkedPathMasterCall(linkedPathMasterCall);
    };

    // Event, when a user clicks on a browser file
    BrowserToTheraphosaCallsEventBus.subscribe(this.FileAndFolderClick.bind(this));

    // Events, when a user clicks on call, method, bind buttons of path maser panel.
    CallToTheraphosaEventBus.subscribe(this.CallSelector.bind(this));
    MethodToTheraphosaEventBus.subscribe(this.MethodSelector.bind(this));
    BindToTheraphosaEventBus.subscribe(this.PathFormer.bind(this));
  }
}

Theraphosa.propTypes = {
  id: PropTypes.string
};

export {Theraphosa}
