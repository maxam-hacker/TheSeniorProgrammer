import React, {Component} from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import {Browser} from './browser';
import {Theraphosa} from './theraphosa'
import {PathMaster} from './pathmaster'
import PathMasterView from './pathmaster/view'

class Electra extends Component {

    render() {
        return React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 80, vertical: true }, 
            React.createElement(PathMasterView, { path: '.' }),
            React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 84}, 
                    React.createElement(Browser, { path: './' }),
                    React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 60 },
                        React.createElement(Theraphosa, { path: './', id: '_calls' }),
                        React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 66 },
                            React.createElement(Browser, { path: './' }),
                            React.createElement(Theraphosa, { path: './', id: '_methods' }),
                        )
                    )
            )
        )};

    /*
    render() {
        return React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 80 }, 
            React.createElement(Browser, { path: './' }),
            React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 80, vertical: true }, 
                    React.createElement(PathMasterView, { path: '.' }),
                    React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 50 },
                        React.createElement(Theraphosa, { path: './', id: '_calls' }),
                        React.createElement(Theraphosa, { path: './', id: '_methods' }),
                    )
            )
        );
    }
    */
}

export {Electra}
