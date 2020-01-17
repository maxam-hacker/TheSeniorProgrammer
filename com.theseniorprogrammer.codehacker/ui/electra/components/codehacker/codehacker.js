import React, {Component} from 'react';
import {CodeHackerHeader} from './header';
import {CodeHackerLeftMenu} from './leftmenu';
import {CodeHackerRightMenu} from './rightmenu';
import {CodeHackerContent} from './content';
import {CodeHackerFooter} from './footer';

class CodeHacker extends Component {

    constructor(props) {
        super(props);
        this.topic = props.match.params.topic;
        this.content = props.match.params.content;
        this.src = props.match.params.src;
        console.log(this.topic, this.content, this.src);
    }

    render() {

        this.header = React.createElement(CodeHackerHeader, {});
        this.leftMenu = React.createElement(CodeHackerLeftMenu, {});
        this.rightMenu = React.createElement(CodeHackerRightMenu, {});
        this.content = React.createElement(CodeHackerContent, {topic: this.topic, content: this.content, src: this.src});
        this.footer = React.createElement(CodeHackerFooter, {});

        this.TheCodeHacker = React.createElement(
            'div', { className: 'codehacker'},
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