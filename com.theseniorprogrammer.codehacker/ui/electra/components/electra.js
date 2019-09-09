import React, {Component} from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import {Browser} from './browser';
import {Theraphosa} from './theraphosa'
import {PathMaster} from './pathmaster'

class Electra extends Component {

    render() {
        return React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 80 }, 
            React.createElement(Browser, { path: './' }),
            React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 80, vertical: true }, 
                    React.createElement(PathMaster, { }),
                    React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 50 },
                        React.createElement(Theraphosa, { path: './', id: '_calls' }),
                        React.createElement(Theraphosa, { path: './', id: '_methods' }),
                    )
            )
        );
    }
}

export {Electra}
