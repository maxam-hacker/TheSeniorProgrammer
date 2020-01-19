import React, {Component, useState} from 'react';
import {CallToTheraphosaEventBus, MethodToTheraphosaEventBus} from '../eventbus';
import {ingestCall, ingestMethod, ingestPath, initPaths} from '../../../paths';


export default function PathMasterView(props) {

  const [callInvisible, setCallInvisible] = React.useState(true);
  const [methodInvisible, setMethodInvisible] = React.useState(true);

  const [callFile, setCallFile] = useState('');
  const [callStartRow, setCallStartRow] = useState(0);
  const [callEndRow, setCallEndRow] = useState(0);
  const [callStartColumn, setCallStartColumn] = useState(0);
  const [callEndColumn, setCallEndColumn] = useState(0);
  const [callText, setCallText] = useState('');

  const [methodFile, setMethodFile] = useState('');
  const [methodStartRow, setMethodStartRow] = useState(0);
  const [methodEndRow, setMethodEndRow] = useState(0);
  const [methodStartColumn, setMethodStartColumn] = useState(0);
  const [methodEndColumn, setMethodEndColumn] = useState(0);
  const [methodText, setMethodText] = useState('');

  const [isReady, setIsReady] = React.useState(false);

  if (!isReady) {
    setIsReady(true);
    initPaths(props);
  }

  const onCallClick = function(event) {
      const selectedHandler = function(pathToFile, selectedText, selectedRange) {
        setCallFile(pathToFile);
        setCallStartRow(selectedRange.start.row);
        setCallEndRow(selectedRange.end.row);
        setCallStartColumn(selectedRange.start.column);
        setCallEndColumn(selectedRange.end.column);
        setCallText(selectedText);
        setCallInvisible(false);
      };
      CallToTheraphosaEventBus.publish(selectedHandler);
  };

  var callRef = React.createRef();

  const onCallEnter = function(event) {
    callRef.current.style.stroke = '#2b3ff7de';
    callRef.current.style.fill = '#2b3ff7de';
  };

  const onCallLeave = function(event) {
    callRef.current.style.stroke = '#2b40f7';
    callRef.current.style.fill = '#2b40f7';
  };

  var methodRef = React.createRef();

  const onMethodEnter = function(event) {
    methodRef.current.style.stroke = '#2b3ff7de';
    methodRef.current.style.fill = '#2b3ff7de';
  };

  const onMethodLeave = function(event) {
    methodRef.current.style.stroke = '#2b40f7';
    methodRef.current.style.fill = '#2b40f7';
  };

  var bindRef = React.createRef();

  const onBindEnter = function(event) {
    bindRef.current.style.stroke = '#2b3ff7de';
    bindRef.current.style.fill = '#2b3ff7de';
  };

  const onBindLeave = function(event) {
    bindRef.current.style.stroke = '#2b40f7';
    bindRef.current.style.fill = '#2b40f7';
  };

  const onMethodClick = function(event) {
      const selectedHandler = function(pathToFile, selectedText, selectedRange) {
        setMethodFile(pathToFile);
        setMethodStartRow(selectedRange.start.row);
        setMethodEndRow(selectedRange.end.row);
        setMethodStartColumn(selectedRange.start.column);
        setMethodEndColumn(selectedRange.end.column);
        setMethodText(selectedText);
        setMethodInvisible(false);
      };
      MethodToTheraphosaEventBus.publish(selectedHandler);
  };

  const onBindClick = function(event) {

    var call = ingestCall(
        callFile, 
        callText, 
        {line: callStartRow, column: callStartColumn}, 
        {line: callEndRow, column: callEndColumn});

    var method = ingestMethod(
        methodFile, 
        methodText, 
        {line: methodStartRow, column: methodEndColumn}, 
        {line: methodEndRow, column: methodEndColumn});

    call.setMethod(method);

    ingestPath(callFile, call, method, props);

    setCallInvisible(true);
    setMethodInvisible(true);
  };

  var callBorderPath = React.createElement('path', { className: 'button-border-line', ref: callRef,
    onClick: onCallClick, onMouseEnter: onCallEnter, onMouseLeave: onCallLeave,
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
    onClick: onCallClick, onMouseEnter: onCallEnter, onMouseLeave: onCallLeave,
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
    onClick: onCallClick, onMouseEnter: onCallEnter, onMouseLeave: onCallLeave,
    d: '\
    M12, 10 \
    A3, 3, 0 0,1 12 16 \
    A3, 3, 0 0,1 12 10 \
    '
  });
  var callBindInvisiblePoint = React.createElement('path', { className: 'button-image-invisible',
    onClick: onCallClick, onMouseEnter: onCallEnter, onMouseLeave: onCallLeave,
    d: '\
    M0, 0 \
    A4, 4, 0 0,1 0 8 \
    A4, 4, 0 0,1 0 0 \
    '
  });
  var callSvg = null;
  if (callInvisible)
      callSvg = React.createElement('svg', {className: 'button-svg'}, callBorderPath, callSym, callPoint);
  else
      callSvg = React.createElement('svg', {className: 'button-svg'}, callBorderPath, callSym, callPoint, callBindInvisiblePoint);
  var callButton = React.createElement('div', {className: 'button-wrapper'}, callSvg);

  var methodBorderPath = React.createElement('path', { className: 'button-border-line', ref: methodRef,
    onClick: onMethodClick, onMouseEnter: onMethodEnter, onMouseLeave: onMethodLeave,
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
    onClick: onMethodClick, onMouseEnter: onMethodEnter, onMouseLeave: onMethodLeave,
    d: '\
    M8,  14 L30, 14 \
    M14, 18 L30, 18 \
    M14, 22 L30, 22 \
    M14, 26 L30, 26 \
    '
  });
  var methodBindInvisiblePoint = React.createElement('path', { className: 'button-image-invisible',
    onClick: onMethodClick, onMouseEnter: onMethodEnter, onMouseLeave: onMethodLeave,
    d: '\
    M0, 0 \
    A4, 4, 0 0,1 0 8 \
    A4, 4, 0 0,1 0 0 \
    '
  });
  var methodSvg = null;
  if (methodInvisible)
      methodSvg = React.createElement('svg', {className: 'button-svg'}, methodBorderPath, methodSym);
  else
      methodSvg = React.createElement('svg', {className: 'button-svg'}, methodBorderPath, methodSym, methodBindInvisiblePoint);
  var methodButton = React.createElement('div', {className: 'button-wrapper'}, methodSvg);

  var linkBorderPath = React.createElement('path', { className: 'button-border-line', ref: bindRef,
    onClick: onBindClick, onMouseEnter: onBindEnter, onMouseLeave: onBindLeave,
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
    onClick: onBindClick, onMouseEnter: onBindEnter, onMouseLeave: onBindLeave,
    d: '\
    M22, 10 \
    A10, 10, 0 0,1 22 30 \
    M18, 10 \
    A10, 10, 0 0,0 18 30 \
    '
  });
  var linkPoint0 = React.createElement('path', { className: 'button-image-filled',
    onClick: onBindClick, onMouseEnter: onBindEnter, onMouseLeave: onBindLeave,
    d: '\
    M22, 10 \
    A3, 3, 0 0,1 28 13 \
    A3, 3, 0 0,1 22 10 \
    '
  });
  var linkPoint1 = React.createElement('path', { className: 'button-image-filled',
    onClick: onBindClick, onMouseEnter: onBindEnter, onMouseLeave: onBindLeave,
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