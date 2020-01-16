import React, {Component} from 'react';
import {SeniorContent} from './content';
import {SeniorLeftMenu} from './leftmenu';
import {senior} from './styles/common-styles';
import {Googler} from './gdriver';


class Senior extends Component {

    render() {

        this.pagesWrapper = React.createElement(SeniorContent, {});
        this.leftMenu = React.createElement(SeniorLeftMenu, {});

        this.mainWrapper = React.createElement(
            'div', {style: senior}, 
                this.leftMenu, 
                this.pagesWrapper
        );

        return this.mainWrapper;
    }
}

export {Senior}
