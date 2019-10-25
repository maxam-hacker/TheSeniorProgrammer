import React, {Component} from 'react';
import {ElectraHeader} from './electraHeader';
import {ElectraLeftMenu} from './electraLeftMenu';
import {ElectraRightMenu} from './electraRightMenu';
import {ElectraContent} from './electraContent';
import {ElectraFooter} from './electraFooter';
import {Senior} from './seniorprogrammer/senior';
import { BrowserRouter } from 'react-router-dom';

class Electra extends Component {

    render() {

        this.electraHeader = React.createElement(ElectraHeader, {});
        this.electraLeftMenu = React.createElement(ElectraLeftMenu, {});
        this.electraRightMenu = React.createElement(ElectraRightMenu, {});
        this.electraContent = React.createElement(ElectraContent, {});
        this.electraFooter = React.createElement(ElectraFooter, {});
        this.TheCodeHacker = React.createElement('div', { className: 'electra' },
                    this.electraHeader,
                    this.electraLeftMenu,
                    this.electraContent,
                    this.electraRightMenu,
                    this.electraFooter
        );
        //return this.TheCodeHacker;

        this.TheSenior = React.createElement(BrowserRouter, {},
                                                    React.createElement(Senior, {className: 'senior'})
        );
        return this.TheSenior;
    }
}

export {Electra}
