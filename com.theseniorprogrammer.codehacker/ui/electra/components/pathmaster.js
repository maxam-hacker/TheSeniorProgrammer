import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class PathMaster extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement('form', {},
                React.createElement(FormControl, {},
                        //React.createElement(InputLabel, {}, 'Call file:'),
                        React.createElement(Select, {},
                                React.createElement(MenuItem, {}, 'Call name:'),
                                React.createElement(MenuItem, {}, 'Call name:'),
                                React.createElement(MenuItem, {}, 'Call name:')
                        )
                ),
                React.createElement(FormControl, {},
                        //React.createElement(InputLabel, {}, 'Call file:'),
                        React.createElement(Select, {},
                                React.createElement(MenuItem, {}, 'Call name:'),
                                React.createElement(MenuItem, {}, 'Call name:'),
                                React.createElement(MenuItem, {}, 'Call name:')
                        )
                )
        );
    }
}

export {PathMaster}