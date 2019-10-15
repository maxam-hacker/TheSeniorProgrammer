import React, {Component} from 'react';
import {Browser} from './browser/browser';
import {Theraphosa} from './editor/theraphosa'
import {VerticalSplitter} from './vsplitter'
import {PhosaTabsContainer} from './tabs/container'
import PathMasterLine from './pathmaster/line'


class ElectraContent extends Component {

    render() {
        
        this.callsBrowser = React.createElement(Browser, { path: './', type: 'calls' });
        this.methodsBrowser = React.createElement(Browser, { path: './', type: 'calls' });
        this.callsPhosa = React.createElement(Theraphosa, { path: './', id: '_calls', type: 'calls' });

        this.callsBrowserSplitter = React.createElement(
                                        VerticalSplitter, {}, 
                                            this.callsBrowser, 
                                            React.createElement('div', {style: {marginTop: '1px'}},
                                                React.createElement(PathMasterLine, {}),
                                                this.callsPhosa
                                            )
                                    );

        this.theContent = React.createElement('div', {className: 'electra-content'}, this.callsBrowserSplitter);

        return this.theContent;
    }
}

export {ElectraContent}