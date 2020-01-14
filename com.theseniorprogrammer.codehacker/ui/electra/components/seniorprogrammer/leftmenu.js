import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {seniorLeftMenu} from './styles/common-styles';


class SeniorLeftMenu extends Component {

    render() {

        this.mainItem = React.createElement(LeftMenuLogoAndName);
        this.mainLink= React.createElement(Link, {to: '/main', style: { textDecoration: 'none' }}, 
                this.mainItem);

        this.splitter1 = React.createElement(LeftMenuVerticalSplitterLine);

        this.loginItem = React.createElement(LeftMenuItem, {content: 'LOG IN'});
        this.loginLink= React.createElement(Link, {to: '/login', style: { textDecoration: 'none' }}, 
                this.loginItem);

        this.splitter2 = React.createElement(LeftMenuVerticalSplitterLine);

        this.topicsItem = React.createElement(LeftMenuItem, {content: 'TOPICS'});
        this.topicsLink = React.createElement(Link, {to: '/topics', style: { textDecoration: 'none' }}, 
                this.topicsItem);

        this.pluginsItem = React.createElement(LeftMenuItem, {content: 'PLUGINS'});
        this.pluginsLink = React.createElement(Link, {to: '/plugins', style: { textDecoration: 'none' }}, 
                this.pluginsItem);

        this.splitter3 = React.createElement(LeftMenuVerticalSplitter3Line);

        this.contactsItem = React.createElement(LeftMenuContactsItem, {content: 'CONTACT US'});
        this.contactsLink = React.createElement(Link, {to: '/contacts', style: { textDecoration: 'none' }}, 
                this.contactsItem);
        
        this.theMenu = React.createElement(
            'div', {style: seniorLeftMenu}, 
                this.mainLink,
                this.splitter1,
                this.loginLink,
                this.splitter2,
                this.topicsLink,
                this.pluginsLink,
                this.splitter3,
                this.contactsLink);

        return this.theMenu;
    }
}

class LeftMenuLogoAndName extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        this.logoPath = React.createElement('path', { className: 'senior-logo-lines', 
        d: 
        'M45,3 \
        A27,27 0 0,0 45,57 \
        M45,3 \
        A27,27 0 0,1 45,57 \
        M45,3 \
        L45, 17 \
        A47,25 0 0,1 45,56 \
        L45, 40 \
        A47,25 0 0,1 45,3 \
        '});
        this.logo = React.createElement('svg', {className: 'senior-logo'}, this.logoPath);

        this.title = React.createElement('span', {className: 'senior-title'}, 'TheSeniorProgrammer');

        this.wrapper = React.createElement('div', {className: 'senior-logo-title-wrapper'}, 
            this.logo,
            this.title);

        return this.wrapper;
    }
}

class LeftMenuVerticalSplitterLine extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        this.line = React.createElement('path', {
        d: 
        'M10,0 \
        L243, 0 \
        '});
        this.wrapper = React.createElement('svg', { className: 'senior-splitter-lines' }, this.line);

        return this.wrapper;
    }
}

class LeftMenuVerticalSplitter3Line extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        this.line = React.createElement('path', {
        d: 
        'M10,0 \
        L243, 0 \
        '});
        this.wrapper = React.createElement('svg', { className: 'senior-left-menu-splitter3' }, this.line);

        return this.wrapper;
    }
}


class LeftMenuItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        var htmlObj = {__html: 
            '<svg ' +
              'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
                'version="1.1" baseProfile="full" ' +
                'width="24" height="24" ' +
                'viewBox="0 0 24.00 24.00" ' +
                'enable-background="new 0 0 24.00 24.00" ' +
              'xml:space="preserve">' +
              '<path d="M0 0h24v24H0z" fill="none"></path>' +
            '</svg>'
        };
      
        this.image = React.createElement('svg', { width: '24px', height: '24px', dangerouslySetInnerHTML: htmlObj });

        this.content = React.createElement('span', {style: {paddingLeft: '0px', paddingTop: '0px'}}, 
                this.props.content);

        this.menuItem = React.createElement('div', {className: 'senior-left-menu-topic-link'}, 
                //this.image, 
                this.content);

        return this.menuItem;
    }
}

class LeftMenuContactsItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        var htmlObj = {__html: 
            '<svg ' +
              'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
                'version="1.1" baseProfile="full" ' +
                'width="24" height="24" ' +
                'viewBox="0 0 24.00 24.00" ' +
                'enable-background="new 0 0 24.00 24.00" ' +
              'xml:space="preserve">' +
              '<path d="M0 0h24v24H0z" fill="none"></path>' +
            '</svg>'
        };
      
        this.image = React.createElement('svg', { width: '24px', height: '24px', dangerouslySetInnerHTML: htmlObj });

        this.content = React.createElement('span', {style: {paddingLeft: '0px', paddingTop: '0px'}}, 
                this.props.content);

        this.menuItem = React.createElement('div', {className: 'senior-left-menu-contacts-link'}, 
                //this.image, 
                this.content);

        return this.menuItem;
    }
}

export {SeniorLeftMenu}
