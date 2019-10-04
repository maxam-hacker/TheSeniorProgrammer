import React, {Component} from 'react';
import {ElectraHeader} from './electra-header';
import {ElectraLeftMenu} from './electra-left-menu';
import {ElectraContent} from './electra-content';
import {ElectraFooter} from './electra-footer';


import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import {Browser} from './browser/browser';
import {Theraphosa} from './editor/theraphosa'
import {PathMaster} from './pathmaster'
import PathMasterView from './pathmaster/view'
import {VerticalSplitter} from './vsplitter'

class Electra extends Component {

    /*
    render() {
        return React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 80, vertical: true }, 
            React.createElement(PathMasterView, { path: '.' }),
            React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 84}, 
                    React.createElement(Browser, { path: './', type: 'calls' }),
                    React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 60 },
                        React.createElement(Theraphosa, { path: './', id: '_calls', type: 'calls' }),
                        React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 66 },
                            React.createElement(Browser, { path: './', type: 'methods' }),
                            React.createElement(Theraphosa, { path: './', id: '_methods', type: 'methods' }),
                        )
                    )
            )
        )};
    */

    /*
    render() {
        return React.createElement('div', { className: 'electra' }, 
                    React.createElement('div', { className: 'electra-header' }), 
                    React.createElement('div', { className: 'electra-content' },
                        React.createElement(VerticalSplitter, {},
                                    React.createElement(Browser, { path: './', type: 'calls' }),
                                    React.createElement(Theraphosa, { path: './', id: '_calls', type: 'calls' })
                        )
                    ),
                    React.createElement('div', { className: 'electra-footer' })
        );
    }
    */

    render() {
        this.electraHeader = React.createElement(ElectraHeader, {});
        this.electraLeftMenu = React.createElement(ElectraLeftMenu, {});
        this.electraContent = React.createElement(ElectraContent, {});
        this.electraFooter = React.createElement(ElectraFooter, {});

        return React.createElement('div', { className: 'electra' },
                    this.electraHeader,
                    this.electraLeftMenu,
                    this.electraContent,
                    this.electraFooter
        );
    }
}

export {Electra}
