import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CallToTheraphosaEventBus, MethodToTheraphosaEventBus} from '../eventbus';
import {ingestCall, ingestMethod, ingestPath} from '../../paths';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
    background: lightBlue[500],
    width: '90px',
    height: '27px'
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function PathMasterView() {

  const [callInvisible, setCallInvisible] = React.useState(true);
  const [methodInvisible, setMethodInvisible] = React.useState(true);

  const classes = useStyles();

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

  const onCallClick = function(event) {
      const selectedHandler = function(pathToFile, selectedText, selectedRange) {
        setCallFile(pathToFile);
        setCallStartRow(selectedRange.start.row);
        setCallEndRow(selectedRange.end.row);
        setCallStartColumn(selectedRange.start.column);
        setCallEndColumn(selectedRange.end.column);
        setCallText(selectedText);
      };
      CallToTheraphosaEventBus.publish(selectedHandler);
      setCallInvisible(false);
  };

  const onMethodClick = function(event) {
      const selectedHandler = function(pathToFile, selectedText, selectedRange) {
        setMethodFile(pathToFile);
        setMethodStartRow(selectedRange.start.row);
        setMethodEndRow(selectedRange.end.row);
        setMethodStartColumn(selectedRange.start.column);
        setMethodEndColumn(selectedRange.end.column);
        setMethodText(selectedText);
      };
      MethodToTheraphosaEventBus.publish(selectedHandler);
      setMethodInvisible(false);
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

    var path = ingestPath(callFile, call, method);

    call.setPath(path);

    setCallInvisible(true);
    setMethodInvisible(true);
  };

  return React.createElement('div', { className: classes.root },
        React.createElement(Grid, { container: true, spacing: 1 },
            React.createElement(Grid, { container: true, xs: 5, direction: 'row', justify: 'flex-end' },
                React.createElement(Badge, { color: 'primary', variant: 'dot', invisible: callInvisible, anchorOrigin: { vertical: 'bottom', horizontal: 'left' } }),
                React.createElement(Button, { variant: 'contained', className: classes.button, onClick: onCallClick, size: 'small' }, 
                    'call'
                ),
            ),
            React.createElement(Grid, { container: true, xs: 2, direction: 'row', justify: 'center' },
                React.createElement(Button, { variant: 'contained', className: classes.button, onClick: onBindClick, size: 'small' }, 
                    'bind'
                ),
            ),
            React.createElement(Grid, { container: true, xs: 5, direction: 'row', justify: 'flex-start' },
                React.createElement(Badge, { color: 'primary', variant: 'dot', invisible: methodInvisible, anchorOrigin: { vertical: 'bottom', horizontal: 'left' } }),
                React.createElement(Button, { variant: 'text', className: classes.button, onClick: onMethodClick, size: 'small' }, 
                    'Method'
                ),
            )
        )
  )
}