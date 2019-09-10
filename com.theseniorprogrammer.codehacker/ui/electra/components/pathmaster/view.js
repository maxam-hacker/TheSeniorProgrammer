import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
  },
  input: {
    display: 'none',
  },
}));

export default function PathMasterView() {
  const classes = useStyles();

  const clickHandle = function(event) {
        console.log(event);
        var input = document.getElementById("inPath");
        input.onchange = function() {
            console.log(input.text);
        };
  };

  return React.createElement('div', { className: classes.root },
        React.createElement(Grid, { container: true, spacing: 1 },
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(Paper, { className: classes.paper}, 'xs=12')
            ),
            React.createElement(Grid, { item: true, xs: 6 },
                React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),
            React.createElement(Grid, { item: true, xs: 6 },
                React.createElement(Paper, { className: classes.paper}, 'xs=6')
            ),
            React.createElement(Grid, { item: true, xs: 6 },
                React.createElement(Button, { variant: 'contained', className: classes.button }, 'new'),
                React.createElement(Button, { variant: 'contained', className: classes.button }, 'clear')
            ),
            React.createElement(Grid, { item: true, xs: 6 },
                React.createElement('input', { id: 'inPath', className: classes.input, id: 'text-button-file', multiple: true, type: 'file' }),
                React.createElement('label', { htmlFor: 'text-button-file' },
                        React.createElement(Button, { variant: 'contained', component: 'span', className: classes.button }, 'save')
                )
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
  */
}