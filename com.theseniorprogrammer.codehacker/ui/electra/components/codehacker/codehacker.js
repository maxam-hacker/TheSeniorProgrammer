import React, {Component} from 'react';
import {ElectraHeader} from '../electraHeader';
import {ElectraLeftMenu} from '../electraLeftMenu';
import {ElectraRightMenu} from '../electraRightMenu';
import {ElectraContent} from '../electraContent';
import {ElectraFooter} from '../electraFooter';

class CodeHacker extends Component {

    constructor(props) {
        super(props);
    }

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
        return this.TheCodeHacker;
    }
}

export {CodeHacker}