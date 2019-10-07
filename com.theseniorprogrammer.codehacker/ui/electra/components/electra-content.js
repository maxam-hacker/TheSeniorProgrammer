import React, {Component} from 'react';
import {Browser} from './browser/browser';
import {Theraphosa} from './editor/theraphosa'
import {VerticalSplitter} from './vsplitter'


class ElectraContent extends Component {

    render() {
        
        this.callsBrowser = React.createElement(Browser, { className: 'call-method-browser', path: './', type: 'calls' });
        this.methodsBrowser = React.createElement(Browser, { className: 'call-method-browser', path: './', type: 'calls' });
        this.callsPhosa = React.createElement(Theraphosa, { path: './', id: '_calls', type: 'calls' });

        this.callsBrowserSplitter = React.createElement(
                                        VerticalSplitter, {}, 
                                            this.callsBrowser, 
                                            this.callsPhosa
                                            /*React.createElement('div', {},
                                                React.createElement(VerticalSplitter, {},
                                                    this.callsPhosa,
                                                    this.methodsBrowser
                                                )
                                            )*/
                                    );

        this.theContent = React.createElement('div', {className: 'electra-content'}, this.callsBrowserSplitter);

        return this.theContent;
    }
}

export {ElectraContent}