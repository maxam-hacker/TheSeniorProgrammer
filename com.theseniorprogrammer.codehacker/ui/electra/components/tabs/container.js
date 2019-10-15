import React, {Component} from 'react';
import {PhosaTab} from './tab'

class PhosaTabsContainer extends Component {

    constructor(props) {
      super(props);
    }

    render() {

        var tab0 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab1 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab2 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab3 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab4 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab5 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab6 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab7 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab8 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab9 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab10 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab11 = React.createElement(PhosaTab, {header: 'Terraphosa'});
        var tab12 = React.createElement(PhosaTab, {header: 'Terraphosa'});

        var tabsContainer = React.createElement('div', {className: 'tab-container'}, 
          tab0, tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8, tab9, tab10, tab11, tab12);

        return tabsContainer;
    }
}

export {PhosaTabsContainer}
