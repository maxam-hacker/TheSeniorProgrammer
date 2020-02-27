import React, {Component} from 'react';
import {CallToTheraphosaEventBus, MethodToTheraphosaEventBus, BindToTheraphosaEventBus} from '../eventbus';
import {PathMasterCall} from './callmodel';
import {PathMasterMethod} from './methodmodel';
import {Googler} from '../../../connectors/googledriver';


export default class PathMasterView extends Component {

  constructor(props) {
    super(props);
    this.pathFolderDescriptor = props.pathFolderDescriptor;

    this.currentCall = null;
    this.currentMethod = null;
    this.calls = [];
    this.methods = [];

    this.state = {
      callInvisible: true,
      methodInvisible: true
    };

    this.onCallClick = this.onCallClick.bind(this);
    this.onMethodClick = this.onMethodClick.bind(this);
    this.onBindClick = this.onBindClick.bind(this);
    this.getSelectedCall = this.getSelectedCall.bind(this);
    this.getSelectedMethod = this.getSelectedMethod.bind(this);

    Googler.listFiles(
      this.pathFolderDescriptor,
      driveFiles => {
        driveFiles.forEach(driveFile => {
          Googler.downloadFile(
            driveFile.id, 
            savedLinkedPathMasterCall => {
              BindToTheraphosaEventBus.publish(savedLinkedPathMasterCall);
              this.calls.push(savedLinkedPathMasterCall);
              this.methods.push(savedLinkedPathMasterCall.method);
            },
            error => {
              console.log("Download path file error:");
              console.log(error);
            }
          );
        });
      }
    );
  }

  getSelectedCall(file, text, range) {
    this.currentCall = new PathMasterCall();
    this.currentCall
      .setBrowserFile(file)
      .setText(text)
      .setLineStartAndEnd(range.start.row, range.end.row)
      .setColumnStartAndEnd(range.start.column, range.end.column)
    this.setState({callInvisible: false, methodInvisible: this.state.methodInvisible});
  };

  getSelectedMethod(file, text, range) {
    this.currentMethod = new PathMasterMethod();
    this.currentMethod
      .setBrowserFile(file)
      .setText(text)
      .setLineStartAndEnd(range.start.row, range.end.row)
      .setColumnStartAndEnd(range.start.column, range.end.column)
    this.setState({callInvisible: this.state.callInvisible, methodInvisible: false});
  };

  onCallClick(event) {
    CallToTheraphosaEventBus.publish(this.getSelectedCall);
  };

  onMethodClick(event) {
    MethodToTheraphosaEventBus.publish(this.getSelectedMethod);
  };

  onBindClick(event) {

    this.currentCall.setMethod(this.currentMethod);

    this.calls.push(this.currentCall);
    this.methods.push(this.currentMethod);

    Googler.createFile(
      this.currentCall.browserFile.name, 
      JSON.stringify(this.currentCall), 
      this.pathFolderDescriptor
    );

    BindToTheraphosaEventBus.publish(this.currentCall);
    this.currentCall = null;
    this.currentMethod = null;

    this.setState({callInvisible: true, methodInvisible: true});
  };

  render () {

    var callRef = React.createRef();
    var methodRef = React.createRef();
    var bindRef = React.createRef();

    const onCallEnter = function(event) {
      callRef.current.style.stroke = '#2b3ff7de';
      callRef.current.style.fill = '#2b3ff7de';
    };

    const onCallLeave = function(event) {
      callRef.current.style.stroke = '#2b40f7';
      callRef.current.style.fill = '#2b40f7';
    };

    const onMethodEnter = function(event) {
      methodRef.current.style.stroke = '#2b3ff7de';
      methodRef.current.style.fill = '#2b3ff7de';
    };

    const onMethodLeave = function(event) {
      methodRef.current.style.stroke = '#2b40f7';
      methodRef.current.style.fill = '#2b40f7';
    };

    const onBindEnter = function(event) {
      bindRef.current.style.stroke = '#2b3ff7de';
      bindRef.current.style.fill = '#2b3ff7de';
    };

    const onBindLeave = function(event) {
      bindRef.current.style.stroke = '#2b40f7';
      bindRef.current.style.fill = '#2b40f7';
    };

    var callBorderPath = React.createElement('path', { className: 'button-border-line', ref: callRef,
      onClick: this.onCallClick, onMouseEnter: onCallEnter, onMouseLeave: onCallLeave,
      d: '\
      M2, 10 \
      A7, 7, 0 0,1 10 2 \
      L30, 2 \
      A7, 7, 0 0,1 38 10 \
      L38, 30 \
      A7, 7, 0 0,1 30 38 \
      L10, 38 \
      A7, 7, 0 0,1 2 30 \
      L2, 10 \
      '
    });
    var callSym = React.createElement('path', { className: 'button-image-line',
      onClick: this.onCallClick, onMouseEnter: onCallEnter, onMouseLeave: onCallLeave,
      d: '\
      M12, 10 \
      L12, 27 \
      L31, 27 \
      L22, 24 \
      L31, 27 \
      L22, 30 \
      '
    });
    var callPoint = React.createElement('path', { className: 'button-image-filled',
      onClick: this.onCallClick, onMouseEnter: onCallEnter, onMouseLeave: onCallLeave,
      d: '\
      M12, 10 \
      A3, 3, 0 0,1 12 16 \
      A3, 3, 0 0,1 12 10 \
      '
    });
    var callBindInvisiblePoint = React.createElement('path', { className: 'button-image-invisible',
      onClick: this.onCallClick, onMouseEnter: onCallEnter, onMouseLeave: onCallLeave,
      d: '\
      M0, 0 \
      A4, 4, 0 0,1 0 8 \
      A4, 4, 0 0,1 0 0 \
      '
    });
    var callSvg = null;
    if (this.state.callInvisible)
        callSvg = React.createElement('svg', {className: 'button-svg'}, callBorderPath, callSym, callPoint);
    else
        callSvg = React.createElement('svg', {className: 'button-svg'}, callBorderPath, callSym, callPoint, callBindInvisiblePoint);
    var callButton = React.createElement('div', {className: 'button-wrapper'}, callSvg);

    var methodBorderPath = React.createElement('path', { className: 'button-border-line', ref: methodRef,
      onClick: this.onMethodClick, onMouseEnter: onMethodEnter, onMouseLeave: onMethodLeave,
      d: '\
      M2, 10 \
      A7, 7, 0 0,1 10 2 \
      L30, 2 \
      A7, 7, 0 0,1 38 10 \
      L38, 30 \
      A7, 7, 0 0,1 30 38 \
      L10, 38 \
      A7, 7, 0 0,1 2 30 \
      L2, 10 \
      '
    });
    var methodSym = React.createElement('path', { className: 'button-image-line',
      onClick: this.onMethodClick, onMouseEnter: onMethodEnter, onMouseLeave: onMethodLeave,
      d: '\
      M8,  14 L30, 14 \
      M14, 18 L30, 18 \
      M14, 22 L30, 22 \
      M14, 26 L30, 26 \
      '
    });
    var methodBindInvisiblePoint = React.createElement('path', { className: 'button-image-invisible',
      onClick: this.onMethodClick, onMouseEnter: onMethodEnter, onMouseLeave: onMethodLeave,
      d: '\
      M0, 0 \
      A4, 4, 0 0,1 0 8 \
      A4, 4, 0 0,1 0 0 \
      '
    });
    var methodSvg = null;
    if (this.state.methodInvisible)
        methodSvg = React.createElement('svg', {className: 'button-svg'}, methodBorderPath, methodSym);
    else
        methodSvg = React.createElement('svg', {className: 'button-svg'}, methodBorderPath, methodSym, methodBindInvisiblePoint);
    var methodButton = React.createElement('div', {className: 'button-wrapper'}, methodSvg);

    var linkBorderPath = React.createElement('path', { className: 'button-border-line', ref: bindRef,
      onClick: this.onBindClick, onMouseEnter: onBindEnter, onMouseLeave: onBindLeave,
      d: '\
      M2, 10 \
      A7, 7, 0 0,1 10 2 \
      L30, 2 \
      A7, 7, 0 0,1 38 10 \
      L38, 30 \
      A7, 7, 0 0,1 30 38 \
      L10, 38 \
      A7, 7, 0 0,1 2 30 \
      L2, 10 \
      '
    });
    var linkSym = React.createElement('path', { className: 'button-image-line',
      onClick: this.onBindClick, onMouseEnter: onBindEnter, onMouseLeave: onBindLeave,
      d: '\
      M22, 10 \
      A10, 10, 0 0,1 22 30 \
      M18, 10 \
      A10, 10, 0 0,0 18 30 \
      '
    });
    var linkPoint0 = React.createElement('path', { className: 'button-image-filled',
      onClick: this.onBindClick, onMouseEnter: onBindEnter, onMouseLeave: onBindLeave,
      d: '\
      M22, 10 \
      A3, 3, 0 0,1 28 13 \
      A3, 3, 0 0,1 22 10 \
      '
    });
    var linkPoint1 = React.createElement('path', { className: 'button-image-filled',
      onClick: this.onBindClick, onMouseEnter: onBindEnter, onMouseLeave: onBindLeave,
      d: '\
      M18, 30 \
      A3, 3, 0 0,1 12 27 \
      A3, 3, 0 0,1 18 30 \
      '
    });
    var linkSvg = React.createElement('svg', {className: 'button-svg'}, linkBorderPath, linkSym, linkPoint0, linkPoint1);
    var linkButton = React.createElement('div', {className: 'button-wrapper'}, linkSvg);

    var buttonsPanel = React.createElement('div', {className: 'browser-buttons-wrapper'}, callButton, methodButton, linkButton);

    return buttonsPanel;
  }
}