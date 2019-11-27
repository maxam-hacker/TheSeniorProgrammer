import React, {Component} from 'react';
import {Senior} from './seniorprogrammer/senior';
import { BrowserRouter } from 'react-router-dom';

class Electra extends Component {

    render() {

        this.TheSenior = React.createElement(BrowserRouter, {},
            React.createElement(Senior, {className: 'senior'})
        );
        return this.TheSenior;
    }
}

export {Electra}
