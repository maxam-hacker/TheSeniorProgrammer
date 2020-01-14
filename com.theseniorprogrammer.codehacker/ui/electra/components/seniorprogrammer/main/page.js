import React, {Component} from 'react';
import {seniorPageWrapper} from '../styles/common-styles';
import {mainPageHeader} from '../styles/main-page-style';

class MainPage extends Component {

    render() {

        this.header = React.createElement('div', {style: mainPageHeader}, 'What\'s new in TheSeniorProgrammer');

        this.pageWrapper = React.createElement('div', {style: seniorPageWrapper}, 
            this.header,
        );

        return this.pageWrapper;
    }
}

export {MainPage}