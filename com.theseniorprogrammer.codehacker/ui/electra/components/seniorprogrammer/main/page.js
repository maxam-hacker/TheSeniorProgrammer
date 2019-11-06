import React, {Component} from 'react';
import {TopicsPageHeader} from '../topics/header';

class MainPage extends Component {

    render() {

        this.header = React.createElement(TopicsPageHeader, {});

        this.pageWrapper = React.createElement('div', {className: 'senior-topics-page'}, 
                                this.header,
        );

        return this.pageWrapper;
    }
}

export {MainPage}