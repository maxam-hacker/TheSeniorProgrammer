import React, {Component} from 'react';
import {topicsPageHeader} from '../styles/topics-page-style';

class TopicsPageHeader extends Component {

    render() {

        this.title = React.createElement('span', {}, 'Main Topics');
        
        this.topicsHeader= React.createElement(
            'div', {style: topicsPageHeader}, 
                this.title);

        return this.topicsHeader;
    }
}

export {TopicsPageHeader}
