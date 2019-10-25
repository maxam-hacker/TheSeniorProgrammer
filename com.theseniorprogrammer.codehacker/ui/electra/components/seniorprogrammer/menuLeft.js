import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class SeniorLeftMenu extends Component {

    render() {

        this.topicsItem = React.createElement(SeniorLeftMenuTopics, {content: 'Topics'});
        this.topicsLink = React.createElement(Link, {to: '/topics'}, this.topicsItem);
        
        this.theMenu = React.createElement('div', {className: 'senior-menu-left'}, this.topicsLink);

        return this.theMenu;
    }
}


class SeniorLeftMenuTopics extends Component {

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
              '<path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" stroke="lime"></path>' +
            '</svg>'
        };
      
        this.image = React.createElement('svg', { width: '24px', height: '24px', dangerouslySetInnerHTML: htmlObj });
        this.content = React.createElement('span', {style: {paddingLeft: '10px', paddingTop: '6px'}}, this.props.content)
        this.menuItem = React.createElement('div', {className: 'magaz-menu-codehacks-item'}, this.image, this.content);

        return this.menuItem;
    }
}


export {SeniorLeftMenu}
