import React, {Component} from 'react';
import {seniorPageWrapper} from '../styles/common-styles';
import {mainPageHeader} from '../styles/main-page-style';

class AboutPage extends Component {

    render() {

        this.header = React.createElement('div', {style: mainPageHeader}, 'About');

        this.pageWrapper = React.createElement('div', {style: seniorPageWrapper}, 
            this.header,
        );

        return this.pageWrapper;
    }
}

export {AboutPage}