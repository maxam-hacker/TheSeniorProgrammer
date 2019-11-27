import React, {Component} from 'react';
import {CodeHackerHeader} from './header';
import {CodeHackerLeftMenu} from './leftmenu';
import {CodeHackerRightMenu} from './rightmenu';
import {CodeHackerContent} from './content';
import {CodeHackerFooter} from './footer';

class CodeHacker extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {

        this.header = React.createElement(CodeHackerHeader, {});
        this.leftMenu = React.createElement(CodeHackerLeftMenu, {});
        this.rightMenu = React.createElement(CodeHackerRightMenu, {});
        this.content = React.createElement(CodeHackerContent, {});
        this.footer = React.createElement(CodeHackerFooter, {});

        this.TheCodeHacker = React.createElement('div', { className: 'codehacker' },
            this.header,
            this.leftMenu,
            this.content,
            this.rightMenu,
            this.footer
        );
        return this.TheCodeHacker;
    }
}

export {CodeHacker}