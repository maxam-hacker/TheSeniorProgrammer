import React, {Component} from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import {Browser} from './browser';

class Electra extends Component {

    render() {
        return React.createElement(SplitterLayout, {}, 
            React.createElement(Browser, {}),
            "Hello world"
        );
    }
}

export {Electra}
