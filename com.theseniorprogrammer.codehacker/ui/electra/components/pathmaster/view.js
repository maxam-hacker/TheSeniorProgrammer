import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CallToTheraphosaEventBus, MethodToTheraphosaEventBus} from '../eventbus'

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
    width: 90
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

  const classes = useStyles();

  const [callFile, setCallFile] = useState('');
  const [methodFile, setMethodFile] = useState('');

  const onCallClick = function(event) {
      event.preventDefault();
      const selectedHandler = function(pathToFile, selectedText, selectedRange) {
        if (pathToFile === '' && selectedText === '')
          return;
        setCallFile(pathToFile);
      };
      CallToTheraphosaEventBus.publish(selectedHandler);
  };

  const onMethodClick = function(event) {
      event.preventDefault();
      const selectedHandler = function(pathToFile, selectedText, selectedRange) {
        if (pathToFile === '' && selectedText === '')
          return;
        setMethodFile(pathToFile);
      };
      MethodToTheraphosaEventBus.publish(selectedHandler);
  };

  return React.createElement('div', { className: classes.root },
        React.createElement(Grid, { container: true, spacing: 1 },
            React.createElement(Grid, { container: true, xs: 6, direction: 'row', justify: 'flex-start' },
                React.createElement(TextField, { value: callFile, className: classes.textField, margin: 'normal', variant: 'outlined'})
            ),
            React.createElement(Grid, { container: true, xs: 6, direction: 'row', justify: 'flex-start' },
                React.createElement(TextField, { value: methodFile, className: classes.textField, margin: 'normal', variant: 'outlined'})
            ),

            React.createElement(Grid, { item: true, xs: 2 },
              React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),
            React.createElement(Grid, { item: true, xs: 1 },
                React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),
            React.createElement(Grid, { item: true, xs: 1 },
              React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),
            React.createElement(Grid, { item: true, xs: 1 },
              React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),
            React.createElement(Grid, { item: true, xs: 1 },
              React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),

            React.createElement(Grid, { item: true, xs: 2 },
              React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),
            React.createElement(Grid, { item: true, xs: 1 },
                React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),
            React.createElement(Grid, { item: true, xs: 1 },
              React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),
            React.createElement(Grid, { item: true, xs: 1 },
                React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),
            React.createElement(Grid, { item: true, xs: 1 },
              React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),

            React.createElement(Grid, { container: true, xs: 5, direction: 'row', justify: 'flex-end' },
                 React.createElement(Button, { variant: 'contained', className: classes.button, onClick: onCallClick }, 'call'),
            ),
            React.createElement(Grid, { container: true, xs: 2, direction: 'row', justify: 'center' },
              React.createElement(Button, { variant: 'contained', className: classes.button }, 'bind'),
            ),
            React.createElement(Grid, { container: true, xs: 5, direction: 'row', justify: 'flex-start' },
              React.createElement(Button, { variant: 'contained', className: classes.button, onClick: onMethodClick }, 'method'),
            )
        )
  )

  /*
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );

  React.createElement(Grid, { item: true, xs: 6 },
                React.createElement('input', { id: 'inPath', className: classes.input, id: 'text-button-file', multiple: true, type: 'file' }),
                React.createElement('label', { htmlFor: 'text-button-file' },
                        React.createElement(Button, { variant: 'contained', component: 'span', className: classes.button }, 'save')
                )
            )
  */
}