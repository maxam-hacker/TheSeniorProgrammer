import React, {Component} from 'react';
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

    render() {
        return React.createElement(VerticalSplitter, {},
                    React.createElement(Browser, { path: './', type: 'calls' }),
                    React.createElement(Theraphosa, { path: './', id: '_calls', type: 'calls' })
        );
    }
}

export {Electra}
