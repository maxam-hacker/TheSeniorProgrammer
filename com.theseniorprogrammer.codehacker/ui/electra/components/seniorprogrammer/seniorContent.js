import React, {Component} from 'react';
import {SeniorTopicsPage} from './topics/topicsPage'


class SeniorContent extends Component {

    render() {

        this.topicsPage = React.createElement(SeniorTopicsPage, {});

        this.content = React.createElement('div', {className: 'senior-content'}, this.topicsPage);

        return this.content;
    }
}

export {SeniorContent}
