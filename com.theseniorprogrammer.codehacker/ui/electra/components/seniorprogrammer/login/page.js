import React, {Component} from 'react';
import {seniorPageWrapper} from '../styles/common-styles';
import {mainPageHeader} from '../styles/main-page-style';

class LoginPage extends Component {

    render() {

        this.header = React.createElement('div', {style: mainPageHeader}, 'Login');

        this.pageWrapper = React.createElement('div', {style: seniorPageWrapper}, 
            this.header,
        );

        return this.pageWrapper;
    }
}

export {LoginPage}