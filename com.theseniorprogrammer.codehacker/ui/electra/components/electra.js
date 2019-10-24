import React, {Component} from 'react';
import {ElectraHeader} from './electra-header';
import {ElectraLeftMenu} from './electra-left-menu';
import {ElectraRightMenu} from './electra-right-menu';
import {ElectraContent} from './electra-content';
import {ElectraFooter} from './electra-footer';
import {Magaz} from './seniorprogrammer/magaz'

class Electra extends Component {

    render() {

        this.electraHeader = React.createElement(ElectraHeader, {});
        this.electraLeftMenu = React.createElement(ElectraLeftMenu, {});
        this.electraRightMenu = React.createElement(ElectraRightMenu, {});
        this.electraContent = React.createElement(ElectraContent, {});
        this.electraFooter = React.createElement(ElectraFooter, {});
        this.codeHacker = React.createElement('div', { className: 'electra' },
                    this.electraHeader,
                    this.electraLeftMenu,
                    this.electraContent,
                    this.electraRightMenu,
                    this.electraFooter
        );
        return this.codeHacker;

        //this.Magaz = React.createElement(Magaz, {className: 'magaz'});
        //return this.Magaz;
    }
}

export {Electra}
